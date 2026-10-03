/**
 * Tela de partículas ondulante en WebGL puro (sin dependencias).
 * Inspirada en el hero de https://www.godseye.world/pricing, con motor y estética propios:
 * una grilla de 512×512 puntos movida por ondas que se cruzan (tres frentes planos, un anillo
 * que se expande y una deformación del dominio), coloreada por altura (valles → crestas),
 * con desenfoque de profundidad, destellos sueltos, revelado radial al cargar y viñeta.
 *
 * @typedef {Object} OpcionesOndas
 * @property {number} [resolucion=512]       Lado de la grilla (resolucion² partículas).
 * @property {number} [escala=10]            Mitad del ancho del plano (unidades del mundo).
 * @property {number} [velocidad=1]          Multiplicador del tiempo (1 = ciclo de 20 s).
 * @property {number} [escalaRuido=0.7]      Frecuencia de las ondas.
 * @property {number} [intensidad=0.62]      Altura de las ondas.
 * @property {string} [colorBajo='#a983f5']  Color de los valles.
 * @property {string} [colorAlto='#fff0f8']  Color de las crestas.
 * @property {number} [foco=3.2]             Distancia a la cámara que queda nítida.
 * @property {number} [apertura=1.79]        Cuánto se desenfocan los puntos fuera del foco.
 * @property {number} [tamano=10]            Tamaño base de los puntos.
 * @property {number} [opacidad=0.8]         Opacidad general.
 * @property {number} [vinetaOscuridad=1.5]  Ancho del degradé de la viñeta.
 * @property {number} [vinetaInicio=0.4]     Dónde empieza a oscurecer la viñeta.
 */

// Ondas que se cruzan: tres frentes planos en distintas direcciones, un anillo que se expande
// desde un punto descentrado y una deformación del dominio que curva las crestas. Los tiempos
// usan multiplicadores enteros, así el movimiento se repite exacto cada ciclo.
const RUIDO = `
float ruidoPeriodico(vec3 p, float t) {
  vec2 xz = p.xz;
  // Deformación del dominio: las crestas dejan de ser rectas y se ondulan.
  xz += 0.35 * vec2(sin(xz.y * 1.9 + t), cos(xz.x * 1.6 - t));
  float n = 0.0;
  n += sin(dot(xz, vec2(0.95, 0.31)) * 2.3 - t);
  n += sin(dot(xz, vec2(-0.48, 0.88)) * 3.1 + 2.0 * t) * 0.55;
  n += sin(dot(xz, vec2(0.6, -0.8)) * 1.4 + 3.0 * t) * 0.45;
  n += sin(length(xz - vec2(1.8, -1.2)) * 3.6 - 2.0 * t) * 0.35;
  return n * 0.2;
}`;

const VERTICE = `
attribute vec2 aPos;
uniform mat4 uVista;
uniform mat4 uProyeccion;
uniform float uTiempoRuido;
uniform float uEscalaRuido;
uniform float uIntensidad;
uniform float uFoco;
uniform float uApertura;
uniform float uTamano;
varying float vDistancia;
varying vec3 vPos;
varying vec3 vInicial;
${RUIDO}
void main() {
  vec3 inicial = vec3(aPos.x, 0.0, aPos.y);
  vec3 q = inicial * uEscalaRuido;
  vec3 p = inicial + vec3(
    ruidoPeriodico(q, uTiempoRuido),
    ruidoPeriodico(q + vec3(50.0, 0.0, 0.0), uTiempoRuido + 2.094),
    ruidoPeriodico(q + vec3(0.0, 50.0, 0.0), uTiempoRuido + 4.188)
  ) * uIntensidad;
  vec4 mv = uVista * vec4(p, 1.0);
  gl_Position = uProyeccion * mv;
  vDistancia = abs(uFoco + mv.z);
  vPos = p;
  vInicial = inicial;
  gl_PointSize = max(vDistancia * uApertura * uTamano, 3.0);
}`;

const FRAGMENTO = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
uniform float uTiempo;
uniform float uOpacidad;
uniform float uRevelado;
uniform float uProgreso;
uniform float uDestellos;
uniform vec2 uRes;
uniform float uVinetaOscuridad;
uniform float uVinetaInicio;
uniform vec3 uColorBajo;
uniform vec3 uColorAlto;
uniform float uIntensidad;
varying float vDistancia;
varying vec3 vPos;
varying vec3 vInicial;
${RUIDO}

// Brillo por partícula entre 0.7 y 2: casi todas titilan suave y unas pocas destellan.
float destello(vec3 semilla, float t) {
  float h = fract(sin(semilla.x * 127.1 + semilla.y * 311.7 + semilla.z * 74.7) * 43758.5453);
  float s = sin(t + h * 6.28318) * 0.5 + sin(t * 1.7 + h * 12.56636) * 0.3 + sin(t * 0.8 + h * 18.84954) * 0.2;
  float h2 = fract(sin(semilla.x * 113.5 + semilla.y * 271.9 + semilla.z * 97.3) * 37849.3241);
  if (sin(h2 * 6.28318) * 0.7 + sin(h2 * 12.56636) * 0.3 < 0.3) s *= 0.05;
  float n = (s + 1.0) * 0.5;
  return 0.7 + mix(n, pow(n, 4.0), n * n) * 1.3;
}

void main() {
  if (length(2.0 * gl_PointCoord - 1.0) > 0.5) discard;

  // Revelado desde el centro con borde irregular.
  float umbral = uRevelado + ruidoPeriodico(vInicial * 4.0, 0.0) * 0.3;
  float mascara = 1.0 - smoothstep(umbral - 0.2, umbral + 0.1, length(vPos.xz));

  float brillo = destello(vInicial, uTiempo);
  float alfa = (1.04 - clamp(vDistancia, 0.0, 1.0)) * smoothstep(-0.5, 0.25, vPos.y)
    * uOpacidad * mascara * uProgreso * brillo;
  alfa = mix(alfa, brillo - 1.1, uDestellos);

  // Color por altura: valles en colorBajo, crestas en colorAlto.
  float altura = clamp(vPos.y / max(uIntensidad, 0.001) * 1.6 + 0.5, 0.0, 1.0);
  vec3 color = mix(uColorBajo, uColorAlto, smoothstep(0.0, 1.0, altura));

  // Viñeta: con fondo negro y mezcla lineal, oscurecer cada punto equivale a una pasada de post-proceso.
  vec2 uv = gl_FragCoord.xy / uRes * 2.0 - 1.0;
  float vineta = 1.0 - smoothstep(uVinetaInicio, uVinetaInicio + uVinetaOscuridad, dot(uv, uv));

  gl_FragColor = vec4(color * vineta, clamp(alfa, 0.0, 1.0));
}`;

function hexARgb(hex) {
  const n = parseInt(hex.replace('#', ''), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) => v / 255);
}

function compilar(gl, tipo, fuente) {
  const shader = gl.createShader(tipo);
  gl.shaderSource(shader, fuente);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(shader));
  return shader;
}

/** Matriz de vista (column-major) de una cámara en `ojo` mirando al origen. */
function mirarAlOrigen([ex, ey, ez]) {
  const largo = Math.hypot(ex, ey, ez);
  const f = [-ex / largo, -ey / largo, -ez / largo];
  // s = f × (0, 1, 0)
  let s = [-f[2], 0, f[0]];
  const ls = Math.hypot(...s);
  s = s.map((v) => v / ls);
  const u = [s[1] * f[2] - s[2] * f[1], s[2] * f[0] - s[0] * f[2], s[0] * f[1] - s[1] * f[0]];
  const punto = (a) => a[0] * ex + a[1] * ey + a[2] * ez;
  return new Float32Array([
    s[0], u[0], -f[0], 0,
    s[1], u[1], -f[1], 0,
    s[2], u[2], -f[2], 0,
    -punto(s), -punto(u), punto(f), 1,
  ]);
}

function perspectiva(fov, aspecto, cerca, lejos) {
  const f = 1 / Math.tan(fov / 2);
  const r = 1 / (cerca - lejos);
  return new Float32Array([f / aspecto, 0, 0, 0, 0, f, 0, 0, 0, 0, (lejos + cerca) * r, -1, 0, 0, 2 * lejos * cerca * r, 0]);
}

/**
 * Dibuja la tela de partículas animada en el canvas.
 * @param {HTMLCanvasElement} canvas
 * @param {OpcionesOndas} [opciones]
 * @returns {{ detener: () => void, destellos: (activo: boolean) => void }}
 *   `detener` libera todo; `destellos(true)` deja solo los puntos que brillan (ej. al pasar el
 *   mouse por un botón).
 */
export function iniciarOndas(canvas, opciones = {}) {
  const gl = canvas.getContext('webgl', { antialias: false, alpha: false, premultipliedAlpha: false });
  if (!gl) return { detener: () => {}, destellos: () => {} };

  const {
    resolucion = 512,
    escala = 10,
    velocidad = 1,
    escalaRuido = 0.7,
    intensidad = 0.62,
    colorBajo = '#a983f5',
    colorAlto = '#fff0f8',
    foco = 3.2,
    apertura = 1.79,
    tamano = 10,
    opacidad = 0.8,
    vinetaOscuridad = 1.5,
    vinetaInicio = 0.4,
  } = opciones;

  // --- Grilla en el plano XZ ---
  const n = Math.max(2, Math.round(resolucion));
  const posiciones = new Float32Array(n * n * 2);
  for (let i = 0; i < n * n; i++) {
    posiciones[i * 2] = ((i % n) / (n - 1) - 0.5) * 2 * escala;
    posiciones[i * 2 + 1] = (Math.floor(i / n) / (n - 1) - 0.5) * 2 * escala;
  }
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, posiciones, gl.STATIC_DRAW);

  // --- Programa ---
  const programa = gl.createProgram();
  gl.attachShader(programa, compilar(gl, gl.VERTEX_SHADER, VERTICE));
  gl.attachShader(programa, compilar(gl, gl.FRAGMENT_SHADER, FRAGMENTO));
  gl.linkProgram(programa);
  gl.useProgram(programa);
  const aPos = gl.getAttribLocation(programa, 'aPos');
  gl.enableVertexAttribArray(aPos);
  gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);
  const u = Object.fromEntries(
    [
      'uVista', 'uProyeccion', 'uTiempoRuido', 'uEscalaRuido', 'uIntensidad', 'uFoco', 'uApertura', 'uTamano',
      'uTiempo', 'uOpacidad', 'uRevelado', 'uProgreso', 'uDestellos', 'uRes', 'uVinetaOscuridad', 'uVinetaInicio',
      'uColorBajo', 'uColorAlto',
    ].map((nombre) => [nombre, gl.getUniformLocation(programa, nombre)]),
  );

  // Cámara fija, FOV 45, más baja y desde el otro lado del plano: se ven las ondas venir de frente.
  const fov = (45 * Math.PI) / 180;
  gl.uniformMatrix4fv(u.uVista, false, mirarAlOrigen([-1.45, 1.85, -1.95]));
  gl.uniform3fv(u.uColorBajo, hexARgb(colorBajo));
  gl.uniform3fv(u.uColorAlto, hexARgb(colorAlto));
  gl.uniform1f(u.uEscalaRuido, escalaRuido);
  gl.uniform1f(u.uIntensidad, intensidad);
  gl.uniform1f(u.uFoco, foco);
  gl.uniform1f(u.uApertura, apertura);
  gl.uniform1f(u.uTamano, tamano);
  gl.uniform1f(u.uOpacidad, opacidad);
  gl.uniform1f(u.uVinetaOscuridad, vinetaOscuridad);
  gl.uniform1f(u.uVinetaInicio, vinetaInicio);

  gl.disable(gl.DEPTH_TEST);
  gl.enable(gl.BLEND);
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
  gl.clearColor(0, 0, 0, 1);

  // --- Tamaño ---
  const redimensionar = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.max(1, Math.round(canvas.clientWidth * dpr));
    canvas.height = Math.max(1, Math.round(canvas.clientHeight * dpr));
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.uniformMatrix4fv(u.uProyeccion, false, perspectiva(fov, canvas.width / canvas.height, 0.01, 300));
    gl.uniform2f(u.uRes, canvas.width, canvas.height);
  };
  redimensionar();
  const observador = new ResizeObserver(redimensionar);
  observador.observe(canvas);

  const movimientoReducido = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let destellosObjetivo = 0;
  let destellosActual = 0;
  let anterior = performance.now();
  let tiempo = 0;
  let raf = 0;

  const dibujar = (ahora) => {
    const dt = Math.min(0.05, Math.max(0, (ahora - anterior) / 1000));
    anterior = ahora;
    if (!movimientoReducido) tiempo += dt;

    // Revelado de 3.5 s con salida cúbica (sin animación si se pidió menos movimiento).
    const avance = movimientoReducido ? 1 : Math.min(tiempo / 3.5, 1);
    const suave = 1 - Math.pow(1 - avance, 3);
    // Transición suave hacia/desde el modo destellos (más rápida al entrar que al salir).
    const tau = destellosObjetivo ? 0.35 : 0.2;
    destellosActual += (destellosObjetivo - destellosActual) * (1 - Math.exp(-dt / (tau / 3)));

    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.uniform1f(u.uTiempo, tiempo);
    gl.uniform1f(u.uTiempoRuido, tiempo * velocidad * ((2 * Math.PI) / 20));
    gl.uniform1f(u.uRevelado, 4 * suave);
    gl.uniform1f(u.uProgreso, suave);
    gl.uniform1f(u.uDestellos, destellosActual);
    gl.drawArrays(gl.POINTS, 0, n * n);

    raf = requestAnimationFrame(dibujar);
  };
  raf = requestAnimationFrame(dibujar);

  return {
    detener() {
      cancelAnimationFrame(raf);
      observador.disconnect();
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    },
    destellos(activo) {
      destellosObjetivo = activo ? 1 : 0;
    },
  };
}
