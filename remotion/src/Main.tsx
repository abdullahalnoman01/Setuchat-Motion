import React from 'react';
import {AbsoluteFill, Audio, Img, OffthreadVideo, interpolate, random, staticFile, useCurrentFrame, Easing} from 'remotion';
import data from '../../data/shots.json';
import {C, GRAD, FONT, FRAMING, ORIGIN_Y, SAFE, W, H} from './theme';
import {KLine, Line} from './Text';
import {UIOverlay} from './UI';
import {loadFonts} from './fonts';
loadFonts();
// Layer stack (brief 11.4): graded bg -> UI -> BEHIND text (L:'b') -> person (matte) -> FRONT text -> persistent -> fx.
// Media in remotion/public/media (symlinks made by scripts/08_link_media.sh): graded.mp4, person.mov (alpha), audio.wav
type Shot = {id: string; from: number; to: number; fr: {name: string; ox: number; from: number}[]; lines: Line[];
  ui: any[]; fx?: string[]; ctx?: [string, string]; desat?: number; cta?: number};
const shots = (data as any).shots as Shot[];
const cl = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

const camFor = (s: Shot, f: number) => {
  let cur = s.fr[0];
  for (const r of s.fr) if (f >= r.from) cur = r;
  const sc = FRAMING[cur.name] ?? 1;
  const t = f - cur.from;
  // subtle push (brief 3.5 camera language): +2% over the framing, hard cut between framings
  const drift = 1 + Math.min(t, 90) * 0.00022;
  let whip = 0;
  if (s.fx?.includes('WHIP0') && f - s.from < 6) whip = (6 - (f - s.from)) * 60;
  return {sc: sc * drift, ox: cur.ox + whip, blur: whip ? whip / 18 : 0};
};

const Plate: React.FC<{src: string; cam: {sc: number; ox: number; blur: number}; filt: string; transparent?: boolean}> = ({src, cam, filt, transparent}) =>
  <AbsoluteFill style={{transform: `translateX(${cam.ox}px) scale(${cam.sc})`, transformOrigin: `${W / 2}px ${ORIGIN_Y}px`,
    filter: `${filt} ${cam.blur ? `blur(${cam.blur}px)` : ''}`}}>
    <OffthreadVideo src={staticFile(src)} muted transparent={transparent} style={{width: W, height: H}} />
  </AbsoluteFill>;

const Glitch: React.FC<{f: number; seed: number; n?: number}> = ({f, seed, n = 14}) =>
  <AbsoluteFill>{Array.from({length: n}, (_, k) => {
    const r = (q: number) => random(`${seed}-${f}-${k}-${q}`);
    const w = 40 + r(1) * 260, h = 20 + r(2) * 120;
    return <div key={k} style={{position: 'absolute', left: r(3) * W, top: r(4) * H, width: w, height: h,
      background: r(5) > 0.5 ? C.cyan : C.blue, opacity: 0.85, mixBlendMode: 'screen'}} />;
  })}</AbsoluteFill>;

const Persistent: React.FC<{f: number; s: Shot}> = ({f, s}) => {
  if (s.cta) return null;
  const small: React.CSSProperties = {position: 'absolute', color: 'rgba(255,255,255,0.7)', fontSize: 21, fontFamily: FONT.lat, fontWeight: 400};
  return <>
    <div style={{...small, left: SAFE.side + 20, bottom: SAFE.bottom}}>*In partnership with SetuChat</div>
    <Img src={staticFile('logo.png')} style={{position: 'absolute', right: SAFE.side + 20, bottom: SAFE.bottom - 8, height: 40, opacity: 0.85}} />
    {s.ctx ? <div style={{...small, fontFamily: FONT.bnSup, left: 0, right: 0, textAlign: 'center',
      ...(s.ctx[0] === 'top' ? {top: 150} : {bottom: SAFE.bottom + 44})}}>{s.ctx[1]}</div> : null}
  </>;
};

const EndCard: React.FC<{f: number; s: Shot}> = ({f, s}) => {
  const sc = s.lines.find((l) => l.text === 'SetuChat');
  const st = sc ? sc.words[0].f + 10 : s.from + 30;
  const t = f - st;
  if (t < 0) return null;
  const p = interpolate(t, [0, 5, 8, 10], [0, 1.12, 0.96, 1], cl);
  const sweep = interpolate(t, [4, 18], [-40, 140], cl);
  return <div style={{position: 'absolute', left: W / 2 - 170, top: 1180, width: 340, height: 340, transform: `scale(${p})`}}>
    <Img src={staticFile('logo.png')} style={{width: 340, height: 340, objectFit: 'contain', filter: t === 3 ? 'hue-rotate(20deg) saturate(2)' : undefined,
      transform: t === 3 ? 'translateX(8px)' : undefined}} />
    <div style={{position: 'absolute', inset: 0, background: `linear-gradient(100deg, transparent ${sweep - 20}%, rgba(20,244,246,0.55) ${sweep}%, transparent ${sweep + 20}%)`,
      mixBlendMode: 'screen', WebkitMaskImage: `url(${staticFile('logo.png')})`, WebkitMaskSize: 'contain', WebkitMaskRepeat: 'no-repeat', WebkitMaskPosition: 'center'}} />
  </div>;
};

export const Main: React.FC<{matte: boolean}> = ({matte}) => {
  const f = useCurrentFrame();
  const s = shots.find((x) => f >= x.from && f < x.to) ?? shots[shots.length - 1];
  const cam = camFor(s, f);
  const filt = s.desat ? `grayscale(${s.desat === 2 ? 0.85 : 0.55}) brightness(${s.desat === 2 ? 0.8 : 0.9})` : '';
  const lines = s.lines.map((L, i) => ({...L, exit: L.exit ?? s.to - 5 + Math.min(i, 2) * 0}));
  const behind = lines.filter((L) => L.L === 'b'), front = lines.filter((L) => L.L !== 'b');
  // without a matte, behind words render in front (layer order still correct for all other elements)
  const lt = f - s.from;
  const glitchIn = s.fx?.includes('I0') && lt < 3;
  const glitchEnd = s.fx?.includes('I_END') && f >= s.to - 2;
  return <AbsoluteFill style={{background: '#05070d', overflow: 'hidden'}}>
    <Plate src="media/graded.mp4" cam={cam} filt={filt} />
    {s.ui.map((u, k) => <UIOverlay key={k} u={{...u, to: u.to ?? Math.min(s.to, u.from + 90)}} frame={f} />)}
    {behind.map((L, k) => <KLine key={'b' + k} L={L} frame={f} shotTo={s.to} />)}
    {matte ? <Plate src="media/person.mov" cam={cam} filt={filt} transparent /> : null}
    {front.map((L, k) => <KLine key={'f' + k} L={L} frame={f} shotTo={s.to} />)}
    {s.cta ? <EndCard f={f} s={s} /> : null}
    <Persistent f={f} s={s} />
    {glitchIn || glitchEnd ? <Glitch f={f} seed={s.from} /> : null}
    <Audio src={staticFile('media/audio.wav')} />
  </AbsoluteFill>;
};
export {GRAD};
