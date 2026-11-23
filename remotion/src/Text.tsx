import React from 'react';
import {Easing, interpolate, random} from 'remotion';
import {C, GRAD, FONT, isLatin} from './theme';
// Kinetic typography: presets A-J (brief 3.4), styles sup/B/C/W/G/H (brief 3.1, 4).
const expo = Easing.bezier(0.16, 1, 0.3, 1);
const backOut = Easing.bezier(0.34, 1.4, 0.64, 1);
const cl = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

export type Word = {i: number; text: string; f: number; fe: number};
export type Line = {text: string; style: string; preset: string; x: number; y: number; size: number; words: Word[];
  al?: string; L?: string; d?: number; w?: number; rot?: number; impact?: number; exit?: number; strikeF?: number;
  graphemes?: string[]; shake?: number; rgb?: number; wob?: number; split?: number};

const heavy = (s: string) => s !== 'sup';
export const styleFor = (L: Line, txt: string): React.CSSProperties => {
  const lat = isLatin(txt);
  const base: React.CSSProperties = {
    fontFamily: lat ? FONT.lat : heavy(L.style) ? FONT.bnHero : FONT.bnSup,
    fontWeight: L.w ?? (heavy(L.style) ? (lat ? 900 : 800) : (lat ? 400 : 300)),
    letterSpacing: lat ? (heavy(L.style) ? '-0.045em' : '-0.02em') : 0,
    color: C.white,
    textShadow: '0 0 30px rgba(0,0,0,0.32)',
  };
  switch (L.style) {
    case 'B': return {...base, color: C.blue, textShadow: `0 0 12px rgba(20,244,246,0.18), 0 2px 0 ${C.blueHi}33, 0 0 40px rgba(0,0,0,0.35)`};
    case 'C': return {...base, color: C.cyan, textShadow: '0 0 14px rgba(20,244,246,0.25), 0 0 40px rgba(0,0,0,0.35)'};
    case 'W': return base;
    case 'G': return {...base, backgroundImage: GRAD, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent',
      textShadow: 'none', filter: 'drop-shadow(0 0 14px rgba(20,244,246,0.25))'};
    case 'H': return {...base, textShadow: Array.from({length: 12}, (_, k) => `${k + 1}px ${(k + 1) * 1.4}px 0 ${k < 6 ? C.blue : '#2448c8'}`).join(',') + `, 0 0 40px rgba(20,244,246,0.35)`};
    default: return base;
  }
};

// per-word entry transform for preset p at local frame t
const entry = (p: string, t: number, d: number, seed: number) => {
  let tx = 0, ty = 0, sx = 1, sc = 1, op = 1, blur = 0, rx = 0, rz = 0, smear = 0;
  if (p === 'A' || p === 'D' || p === 'G' || p === '' || p === 'E') {
    const k = expo(Math.min(1, Math.max(0, t / 7)));
    tx = (1 - k) * 200 * (d || (seed > 0.5 ? 1 : -1));
    sx = 1.6 - 0.6 * k; op = interpolate(t, [0, 2], [0, 1], cl); smear = (1 - k) * 80;
  } else if (p === 'B' || p === 'H') {
    sc = interpolate(t, [0, 5, 8, 10], [0, 1.12, 0.96, 1], cl); op = interpolate(t, [0, 3], [0, 1], cl);
  } else if (p === 'C') {
    const k = backOut(Math.min(1, Math.max(0, t / 9)));
    rx = 90 * (1 - k); op = interpolate(t, [0, 3], [0, 1], cl);
  }
  if (t < 0) op = 0;
  return {tx, ty, sx, sc, op, blur, rx, rz, smear};
};

const Smear: React.FC<{amt: number; dir: number; children: React.ReactNode; st: React.CSSProperties}> = ({amt, dir, children, st}) => {
  // directional motion blur approximation: trailing ghost copies (no CSS directional blur)
  if (amt < 2) return null;
  return <>{[0.25, 0.5, 0.75, 1].map((q) => (
    <span key={q} style={{...st, position: 'absolute', left: 0, top: 0, opacity: 0.22 * (1 - q * 0.6),
      transform: `translateX(${q * amt * dir}px)`, filter: `blur(${4 + q * 6}px)`}}>{children}</span>))}</>;
};

export const KLine: React.FC<{L: Line; frame: number; shotTo: number}> = ({L, frame, shotTo}) => {
  const first = L.words[0].f;
  if (frame < first - 1) return null;
  // exits (preset J): fast 5-frame scale/opacity/blur, or hard cut at shot end
  const ex = L.exit ?? 1e9;
  const et = frame - ex;
  if (et >= 5) return null;
  const exOp = et >= 0 ? 1 - et / 5 : 1, exSc = et >= 0 ? 1 - 0.15 * et / 5 : 1, exBl = et >= 0 ? et * 8 : 0;
  const life = frame - first;
  let posX = L.x;
  // E marquee: slides right->left at ~750 px/s, bleeding both sides
  if (L.preset === 'E') posX = 1150 - life * 25;
  const align = L.al === 'c' ? 'translateX(-50%)' : L.al === 'r' ? 'translateX(-100%)' : '';
  // D arc/bend: cylinder tilt + slow 3-6 deg rotation; rot: slow spin
  const seed = random(L.text);
  const arc = L.preset === 'D' ? `perspective(900px) rotateX(${14 + 0 * seed}deg) rotateZ(${(seed > 0.5 ? -1 : 1) * (4 + life * 0.08)}deg)` : '';
  const rot = L.rot ? `rotateZ(${-6 + life * 0.12}deg)` : '';
  const wob = L.wob ? `rotateZ(${Math.sin(life / 4) * 3}deg)` : '';
  const shake = L.shake && life > 0 && life < 14 ? `translate(${(random(frame) - 0.5) * 14}px, ${(random(frame + 7) - 0.5) * 10}px)` : '';
  const st0 = styleFor(L, L.text);
  const wrap: React.CSSProperties = {position: 'absolute', left: posX, top: L.y, fontSize: L.size, lineHeight: 0.95,
    whiteSpace: 'nowrap', transform: `${align} ${arc} ${rot} ${wob} ${shake} scale(${exSc})`, transformOrigin: '50% 100%',
    opacity: exOp, filter: exBl ? `blur(${exBl}px)` : undefined};
  // F letter-by-letter scatter (grapheme clusters from data, never breaking conjuncts)
  if (L.preset === 'F' && L.graphemes) {
    return <div style={wrap}>{L.graphemes.map((g, k) => {
      const t = frame - (first + k * 3);
      const e = entry('B', t, 0, 0);
      const r = (random(g + k) - 0.5) * 20, jy = (random(k + g) - 0.5) * 80, s2 = 0.85 + random(k * 3 + 1) * 0.3;
      return <span key={k} style={{...styleFor(L, g), display: 'inline-block', opacity: e.op, marginRight: '0.02em',
        transform: `translateY(${jy}px) rotate(${r}deg) scale(${e.sc * s2})`}}>{g}</span>;
    })}</div>;
  }
  return <div style={wrap}>
    {L.words.map((w, k) => {
      const t = frame - w.f;
      const e = entry(L.preset, t, L.d ?? 0, random(w.i));
      const st = styleFor(L, w.text);
      const gap = k < L.words.length - 1 ? '0.22em' : 0;
      // G outline echo: hollow copies drifting away and fading
      const echoes = L.preset === 'G' && t >= 0 ? [1, 2].map((n) => {
        const dr = interpolate(t, [0, 24], [n * 20, n * 60], cl), o = interpolate(t, [0, 6, 30], [0, 0.85 / n, 0], cl);
        return <span key={'e' + n} style={{...st, position: 'absolute', left: 0, top: 0, color: 'transparent', backgroundImage: 'none',
          WebkitTextStroke: `3px ${n === 1 ? C.cyan : C.white}`, textShadow: 'none', filter: 'none', opacity: o,
          transform: `translate(${dr * 0.6}px, ${-dr}px)`}}>{w.text}</span>;
      }) : null;
      const rgb = L.rgb && t >= 0 && t < 10 && frame % 3 !== 0 ? `${-6}px 0 0 ${C.cyan}, 6px 0 0 ${C.blue}` : undefined;
      return <span key={w.i} style={{position: 'relative', display: 'inline-block', marginRight: gap, opacity: e.op,
        transform: `translate(${e.tx}px, ${e.ty}px) perspective(700px) rotateX(${e.rx}deg) scale(${e.sc}) scaleX(${e.sx})`,
        transformOrigin: '50% 90%'}}>
        {echoes}
        <Smear amt={e.smear} dir={-(L.d || 1)} st={st}>{w.text}</Smear>
        <span style={{...st, ...(rgb ? {textShadow: rgb} : {})}}>{w.text}</span>
      </span>;
    })}
    {L.strikeF !== undefined && frame >= L.strikeF ? <div style={{position: 'absolute', left: -10, top: '52%', height: Math.max(6, L.size * 0.07),
      width: `${interpolate(frame - L.strikeF, [0, 6], [0, 104], cl)}%`, background: C.cyan, borderRadius: 4, boxShadow: '0 0 14px rgba(20,244,246,.5)'}} /> : null}
  </div>;
};
