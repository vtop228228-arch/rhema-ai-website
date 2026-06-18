'use client';

import { useEffect, useRef } from 'react';

const VS = `
  attribute vec4 aVertexPosition;
  void main() {
    gl_Position = aVertexPosition;
  }
`;

// Адаптировано под Rhema AI: #090909 фон + оранжевые (#FF6A00) плазма-линии
const FS = `
  precision highp float;
  uniform vec2 iResolution;
  uniform float iTime;

  const float overallSpeed     = 0.12;
  const float gridSmoothWidth  = 0.015;
  const float axisWidth        = 0.05;
  const float majorLineWidth   = 0.025;
  const float minorLineWidth   = 0.0125;
  const float majorLineFreq    = 5.0;
  const float minorLineFreq    = 1.0;
  const float scale            = 5.0;

  const vec4  lineColor        = vec4(1.0, 0.416, 0.0, 0.55);
  const float minLineWidth     = 0.006;
  const float maxLineWidth     = 0.09;
  const float lineSpeed        = 1.0  * overallSpeed;
  const float lineAmplitude    = 0.9;
  const float lineFrequency    = 0.2;
  const float warpSpeed        = 0.2  * overallSpeed;
  const float warpFrequency    = 0.5;
  const float warpAmplitude    = 1.0;
  const float offsetFrequency  = 0.5;
  const float offsetSpeed      = 1.33 * overallSpeed;
  const float minOffsetSpread  = 0.6;
  const float maxOffsetSpread  = 2.0;
  const int   linesPerGroup    = 14;

  #define drawCircle(pos, radius, coord) \
    smoothstep(radius + gridSmoothWidth, radius, length(coord - (pos)))
  #define drawSmoothLine(pos, hw, t) \
    smoothstep(hw, 0.0, abs(pos - (t)))
  #define drawCrispLine(pos, hw, t) \
    smoothstep(hw + gridSmoothWidth, hw, abs(pos - (t)))
  #define drawPeriodicLine(freq, w, t) \
    drawCrispLine(freq / 2.0, w, abs(mod(t, freq) - (freq) / 2.0))

  float random(float t) {
    return (cos(t) + cos(t * 1.3 + 1.3) + cos(t * 1.4 + 1.4)) / 3.0;
  }

  float getPlasmaY(float x, float hFade, float offset) {
    return random(x * lineFrequency + iTime * lineSpeed) * hFade * lineAmplitude + offset;
  }

  void main() {
    vec2 uv    = gl_FragCoord.xy / iResolution.xy;
    vec2 space = (gl_FragCoord.xy - iResolution.xy * 0.5) / iResolution.x * 2.0 * scale;

    float hFade = 1.0 - (cos(uv.x * 6.2832) * 0.5 + 0.5);
    float vFade = 1.0 - (cos(uv.y * 6.2832) * 0.5 + 0.5);

    space.y += random(space.x * warpFrequency + iTime * warpSpeed) * warpAmplitude * (0.5 + hFade);
    space.x += random(space.y * warpFrequency + iTime * warpSpeed + 2.0) * warpAmplitude * hFade;

    vec4 lines = vec4(0.0);

    for (int l = 0; l < linesPerGroup; l++) {
      float ni           = float(l) / float(linesPerGroup);
      float offsetTime   = iTime * offsetSpeed;
      float offsetPos    = float(l) + space.x * offsetFrequency;
      float rand         = random(offsetPos + offsetTime) * 0.5 + 0.5;
      float halfWidth    = mix(minLineWidth, maxLineWidth, rand * hFade) * 0.5;
      float offset       = random(offsetPos + offsetTime * (1.0 + ni))
                           * mix(minOffsetSpread, maxOffsetSpread, hFade);
      float linePos      = getPlasmaY(space.x, hFade, offset);
      float line         = drawSmoothLine(linePos, halfWidth, space.y) * 0.5
                         + drawCrispLine(linePos, halfWidth * 0.15, space.y);

      float cx           = mod(float(l) + iTime * lineSpeed, 25.0) - 12.0;
      vec2  cp           = vec2(cx, getPlasmaY(cx, hFade, offset));
      float circle       = drawCircle(cp, 0.01, space) * 4.0;

      lines += (line + circle) * lineColor * rand;
    }

    lines *= vFade;
    gl_FragColor = vec4(lines.rgb, lines.a);
  }
`;

function loadShader(gl: WebGLRenderingContext, type: number, source: string): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function initProgram(gl: WebGLRenderingContext): WebGLProgram | null {
  const vs = loadShader(gl, gl.VERTEX_SHADER, VS);
  const fs = loadShader(gl, gl.FRAGMENT_SHADER, FS);
  if (!vs || !fs) return null;
  const prog = gl.createProgram();
  if (!prog) return null;
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return null;
  return prog;
}

export default function ShaderBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const isMobile = window.innerWidth < 768;
    // Opacity controlled via CSS class .shader-bg (globals.css)

    const gl = canvas.getContext('webgl', { alpha: true, premultipliedAlpha: false });
    if (!gl) return;

    const program = initProgram(gl);
    if (!program) return;

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW,
    );

    const posLoc = gl.getAttribLocation(program, 'aVertexPosition');
    const resLoc = gl.getUniformLocation(program, 'iResolution');
    const timeLoc = gl.getUniformLocation(program, 'iTime');

    const resize = () => {
      // Mobile: 0.75x resolution (sharp enough, saves GPU)
      const scale = isMobile ? 0.75 : 1;
      canvas.width = window.innerWidth * scale;
      canvas.height = window.innerHeight * scale;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    window.addEventListener('resize', resize);
    resize();

    const start = Date.now();
    let raf: number;
    let frameCount = 0;

    const render = () => {
      frameCount++;
      // Mobile: render every 2nd frame (saves battery)
      if (isMobile && frameCount % 2 !== 0) {
        raf = requestAnimationFrame(render);
        return;
      }
      const t = (Date.now() - start) / 1000;
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(program);
      gl.uniform2f(resLoc, canvas.width, canvas.height);
      gl.uniform1f(timeLoc, t);
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(posLoc);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="shader-bg"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
}
