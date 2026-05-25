import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

const VERT = /* glsl */ `
  attribute vec2 position;
  void main() { gl_Position = vec4(position, 0.0, 1.0); }
`;

// Domain-warped fractal noise → slow flowing field. Monochrome base lifted
// toward the indigo accent in the warped valleys. Pointer nudges the field.
const FRAG = /* glsl */ `
  precision highp float;
  uniform float uTime;
  uniform vec2  uResolution;
  uniform vec2  uMouse;
  uniform vec3  uColorA; // base
  uniform vec3  uColorB; // accent
  uniform float uIntensity;

  vec2 hash(vec2 p) {
    p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
    return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(dot(hash(i + vec2(0.0, 0.0)), f - vec2(0.0, 0.0)),
          dot(hash(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0)), u.x),
      mix(dot(hash(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0)),
          dot(hash(i + vec2(1.0, 1.0)), f - vec2(1.0, 1.0)), u.x), u.y);
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 5; i++) {
      v += a * noise(p);
      p *= 2.0;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / uResolution.xy;
    vec2 p = uv;
    p.x *= uResolution.x / uResolution.y;

    float t = uTime * 0.04;
    vec2 m = (uMouse - 0.5) * 0.35;

    // Domain warp.
    vec2 q = vec2(fbm(p + t + m), fbm(p + vec2(5.2, 1.3) - t));
    vec2 r = vec2(fbm(p + 1.7 * q + vec2(8.3, 2.8)),
                  fbm(p + 1.7 * q + vec2(1.4, 9.2)));
    float f = fbm(p + 1.6 * r);

    float field = smoothstep(-0.4, 0.9, f);
    vec3 col = mix(uColorA, uColorB, field * uIntensity);

    // Vignette so edges sink back; keeps text legible.
    float vig = smoothstep(1.25, 0.25, length(uv - 0.5));
    col = mix(uColorA, col, 0.35 + 0.65 * vig);

    gl_FragColor = vec4(col, 1.0);
  }
`;

function hexToRgb(hex) {
  const h = hex.replace('#', '').trim();
  const v = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
  const n = parseInt(v, 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}

function readColors() {
  const s = getComputedStyle(document.documentElement);
  return {
    a: hexToRgb(s.getPropertyValue('--shader-a') || '#181a20'),
    b: hexToRgb(s.getPropertyValue('--shader-b') || '#5d7cf5'),
  };
}

/**
 * Fullscreen WebGL flow-field backdrop. Pointer-reactive, DPR-capped, paused
 * when offscreen or the tab is hidden. Falls back to a static CSS gradient on
 * reduced motion, coarse pointers, or when WebGL/ogl is unavailable.
 *
 * Intended to sit absolutely positioned behind hero content (with a scrim).
 * `intensity` (0..1) scales how far the field pushes toward the accent.
 */
export function ShaderField({ className = '', intensity = 1 }) {
  const reduce = useReducedMotion();
  const canvasRef = useRef(null);
  const [fallback, setFallback] = useState(reduce);

  useEffect(() => {
    if (reduce) {
      setFallback(true);
      return undefined;
    }
    if (window.matchMedia('(pointer: coarse)').matches) {
      setFallback(true);
      return undefined;
    }

    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    let renderer, program, mesh, gl;
    let raf = 0;
    let running = true;
    let disposed = false;
    const mouse = [0.5, 0.5];
    const targetMouse = [0.5, 0.5];

    const onPointer = (e) => {
      targetMouse[0] = e.clientX / window.innerWidth;
      targetMouse[1] = 1 - e.clientY / window.innerHeight;
    };

    const onResize = () => {
      if (!renderer) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      renderer.dpr = dpr;
      renderer.setSize(canvas.clientWidth, canvas.clientHeight);
      program.uniforms.uResolution.value = [
        canvas.width,
        canvas.height,
      ];
    };

    // ogl is code-split so it stays out of the initial bundle.
    import('ogl')
      .then((mod) => {
        if (disposed) return;
        const { Renderer, Program, Mesh, Triangle } = mod;
        renderer = new Renderer({
          canvas,
          alpha: false,
          antialias: false,
          dpr: Math.min(window.devicePixelRatio || 1, 1.5),
        });
        gl = renderer.gl;
        const { a, b } = readColors();
        const geometry = new Triangle(gl);
        program = new Program(gl, {
          vertex: VERT,
          fragment: FRAG,
          uniforms: {
            uTime: { value: 0 },
            uResolution: { value: [1, 1] },
            uMouse: { value: [0.5, 0.5] },
            uColorA: { value: a },
            uColorB: { value: b },
            uIntensity: { value: intensity },
          },
        });
        mesh = new Mesh(gl, { geometry, program });
        onResize();

        const render = (t) => {
          if (!running) {
            raf = requestAnimationFrame(render);
            return;
          }
          mouse[0] += (targetMouse[0] - mouse[0]) * 0.05;
          mouse[1] += (targetMouse[1] - mouse[1]) * 0.05;
          program.uniforms.uMouse.value = mouse;
          program.uniforms.uTime.value = t * 0.001;
          renderer.render({ scene: mesh });
          raf = requestAnimationFrame(render);
        };
        raf = requestAnimationFrame(render);
      })
      .catch(() => setFallback(true));

    window.addEventListener('pointermove', onPointer, { passive: true });
    window.addEventListener('resize', onResize);

    const onVisibility = () => { running = !document.hidden; };
    document.addEventListener('visibilitychange', onVisibility);

    const io = new IntersectionObserver(
      ([entry]) => { running = entry.isIntersecting && !document.hidden; },
      { threshold: 0 }
    );
    io.observe(canvas);

    return () => {
      disposed = true;
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onPointer);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibility);
      io.disconnect();
      const ext = gl?.getExtension('WEBGL_lose_context');
      ext?.loseContext();
    };
  }, [reduce, intensity]);

  // Theme palette is read on mount; parent remounts via key={theme} on toggle.

  if (fallback) {
    return (
      <div
        aria-hidden
        className={className}
        style={{
          background:
            'radial-gradient(120% 90% at 70% 15%, var(--shader-b) -40%, transparent 55%), var(--shader-a)',
          opacity: 0.6,
        }}
      />
    );
  }

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={className}
      style={{ width: '100%', height: '100%', display: 'block' }}
    />
  );
}
