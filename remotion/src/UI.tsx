import React from 'react';
import {Easing, interpolate, random} from 'remotion';
import {C, FONT} from './theme';
// UI-1..UI-8 (brief 6): dark glass, 1px border, 24px radius, backdrop blur, 4-8deg tilt, 6-10px float.
const cl = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
const pop = (t: number) => interpolate(t, [0, 5, 8, 10], [0, 1.12, 0.96, 1], cl);
const ease = Easing.bezier(0.16, 1, 0.3, 1);
export type UIProps = {k: string; from: number; x: number; y: number; wf: number[]; to: number};
const glass: React.CSSProperties = {background: C.glass, border: `1px solid ${C.border}`, borderRadius: 24,
  backdropFilter: 'blur(20px)', boxShadow: '0 20px 60px rgba(0,0,0,0.45)', color: C.white, fontFamily: FONT.bnSup};
const lat: React.CSSProperties = {fontFamily: FONT.lat};

const Check: React.FC<{on: number}> = ({on}) => <span style={{display: 'inline-flex', width: 34, height: 34, borderRadius: 17,
  border: `2px solid ${C.cyan}`, alignItems: 'center', justifyContent: 'center', marginRight: 14, transform: `scale(${pop(on)})`,
  background: on >= 0 ? 'rgba(20,244,246,0.15)' : 'transparent'}}>
  {on >= 0 ? <svg width="20" height="20" viewBox="0 0 20 20"><path d="M3 10 L8 15 L17 5" stroke={C.cyan} strokeWidth="3" fill="none"
    strokeLinecap="round" strokeDasharray="22" strokeDashoffset={22 - Math.min(22, on * 4)} /></svg> : null}</span>;

const Cursor: React.FC<{x: number; y: number; click: number}> = ({x, y, click}) => <div style={{position: 'absolute', left: x, top: y}}>
  {click >= 0 && click < 10 ? <div style={{position: 'absolute', left: -20, top: -20, width: 40, height: 40, borderRadius: 20,
    border: `3px solid ${C.cyan}`, transform: `scale(${1 + click * 0.15})`, opacity: 1 - click / 10}} /> : null}
  <svg width="38" height="46" viewBox="0 0 38 46"><path d="M2 2 L2 38 L12 29 L19 44 L25 41 L18 27 L32 27 Z" fill={C.white} stroke="#0B0F1A" strokeWidth="2" /></svg></div>;

const Dots: React.FC<{t: number}> = ({t}) => <div style={{display: 'flex', gap: 8, padding: '18px 24px', background: '#2A2F3A', borderRadius: 26, width: 'fit-content'}}>
  {[0, 1, 2].map((i) => <div key={i} style={{width: 12, height: 12, borderRadius: 6, background: C.white,
    opacity: 0.35 + 0.65 * Math.max(0, Math.sin((t - i * 4) / 4))}} />)}</div>;

const Ring: React.FC<{p: number; size?: number}> = ({p, size = 64}) => {
  const r = size / 2 - 5, c = 2 * Math.PI * r;
  return <svg width={size} height={size}><circle cx={size / 2} cy={size / 2} r={r} stroke="rgba(255,255,255,0.15)" strokeWidth="5" fill="none" />
    <circle cx={size / 2} cy={size / 2} r={r} stroke={C.cyan} strokeWidth="5" fill="none" strokeLinecap="round" strokeDasharray={c}
      strokeDashoffset={c * (1 - p)} transform={`rotate(-90 ${size / 2} ${size / 2})`} /></svg>;
};
// hand-drawn curved arrow, trim-path in 10 frames
export const Arrow: React.FC<{t: number; d: string; w?: number; h?: number}> = ({t, d, w = 300, h = 260}) => {
  const p = interpolate(t, [0, 10], [0, 1], {...cl, easing: ease});
  return <svg width={w} height={h} style={{overflow: 'visible'}}><path d={d} stroke={C.white} strokeWidth="4" fill="none" strokeLinecap="round"
    strokeLinejoin="round" pathLength={1} strokeDasharray="1" strokeDashoffset={1 - p} /></svg>;
};

const Body: React.FC<{k: string; t: number; f: number; wf: number[]}> = ({k, t, f, wf}) => {
  const at = (n: number) => f - (wf[n] ?? 1e9);
  switch (k) {
    case 'UI1': return <div style={{...glass, width: 400, padding: 24, display: 'flex', flexDirection: 'column', gap: 16}}>
      <div style={{...lat, fontSize: 22, opacity: 0.7}}>Messenger · Page</div>
      <div style={{transform: `scale(${pop(at(0))})`, transformOrigin: '0 50%', background: '#2A2F3A', borderRadius: 26, padding: '16px 22px', fontSize: 34, width: 'fit-content'}}>ডেলিভারি চার্জ কত?</div>
      {at(1) >= 0 && at(3) < 0 ? <Dots t={at(1)} /> : null}
      {at(3) >= 0 ? <div style={{alignSelf: 'flex-end', transform: `scale(${pop(at(3))})`, transformOrigin: '100% 50%', background: C.blue, borderRadius: 26, padding: '16px 22px', fontSize: 36, fontWeight: 700}}>১২০ টাকা।</div> : null}
    </div>;
    case 'UI2a': case 'UI2b': case 'UI2c': {
      const n = k === 'UI2a' ? 1 : k === 'UI2b' ? 2 : 3, base = k === 'UI2a' ? 0 : k === 'UI2b' ? 1 : 2;
      const rows = ['Decision', 'Tools', 'Task done'];
      const cy = 110 + (n - 1) * 62;
      const cx = interpolate(t, [0, 14], [380, 60], {...cl, easing: ease});
      return <div style={{...glass, ...lat, width: 430, padding: 26, position: 'relative'}}>
        <div style={{fontSize: 26, fontWeight: 700, marginBottom: 18, color: C.cyan, letterSpacing: '0.02em'}}>SetuChat Agent</div>
        {rows.map((r, i) => <div key={r} style={{display: 'flex', alignItems: 'center', fontSize: 30, height: 62, opacity: i < n ? 1 : 0.35}}>
          <Check on={i < base ? 99 : i < n ? t - 14 : -1} />{r}</div>)}
        <Cursor x={cx} y={cy} click={t - 14} />
      </div>;
    }
    case 'UI3': {
      const y = interpolate(t, [0, 10], [-260, 0], {...cl, easing: ease});
      return <div style={{...glass, width: 800, padding: '22px 28px', display: 'flex', alignItems: 'center', gap: 22, transform: `translateY(${y}px)`}}>
        <div style={{width: 72, height: 72, borderRadius: 20, background: C.blue, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <svg width="40" height="40" viewBox="0 0 24 24"><path d="M3 4h2l2.4 10.5h10.8L21 7H7" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" /><circle cx="9" cy="19" r="1.6" fill="#fff" /><circle cx="17" cy="19" r="1.6" fill="#fff" /></svg></div>
        <div><div style={{fontSize: 26, color: C.cyan, fontWeight: 700}}>নতুন মেসেজ:</div><div style={{fontSize: 36}}>আমি অর্ডার করতে চাই</div></div>
      </div>;
    }
    case 'UI4': return <div style={{position: 'relative'}}>
      <div style={{border: '2px dashed rgba(255,255,255,0.7)', borderRadius: 28, padding: 16}}>
        <div style={{...glass, ...lat, width: 360, padding: 22, display: 'flex', gap: 18, alignItems: 'center'}}>
          <div style={{width: 84, height: 84, borderRadius: 18, background: 'linear-gradient(135deg,#1c2440,#3660F3)'}} />
          <div><div style={{fontSize: 30, fontWeight: 700}}>Stock: 24</div><div style={{fontSize: 26, color: C.cyan}}>✓ In stock</div></div>
        </div></div>
      <div style={{position: 'absolute', left: 300, top: 150}}><Arrow t={at(1)} d="M20 10 C 140 40, 200 140, 170 230 M150 200 L170 232 L200 205" /></div>
    </div>;
    case 'UI5': {
      const fields: [string, string][] = [['নাম', 'রাহিম'], ['ঠিকানা', 'মিরপুর, ঢাকা'], ['ফোন', '01XXXXXXXXX']];
      const typed = (s: string, st: number) => { const ch = Array.from(s); return ch.slice(0, Math.max(0, Math.floor((f - st) / 1.5))).join(''); };
      const proc = at(5) >= 0;
      return <div style={{position: 'absolute', left: 560, top: 300}}><div style={{...glass, width: 460, padding: 26}}>
        {fields.map(([l, v], i) => <div key={l} style={{marginBottom: 14}}><div style={{fontSize: 22, opacity: 0.7}}>{l}</div>
          <div style={{height: 54, borderRadius: 14, background: 'rgba(255,255,255,0.06)', border: `1px solid ${C.border}`, padding: '8px 14px', fontSize: 28, ...lat}}>
            {typed(v, wf[i + 1] ?? 0)}</div></div>)}
        <div style={{...lat, marginTop: 8, height: 60, borderRadius: 16, background: C.blue, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, fontWeight: 700,
          transform: `scale(${at(4) >= 0 && at(4) < 4 ? 0.94 : 1})`}}>Place order</div>
        <Cursor x={interpolate(at(4), [-14, 0], [400, 220], cl)} y={interpolate(at(4), [-14, 0], [440, 420], cl)} click={at(4)} />
      </div>
        {proc ? <div style={{...lat, position: 'absolute', left: 120, top: 560, transform: `scale(${pop(at(5))})`, display: 'flex', alignItems: 'center', gap: 14,
          background: C.cyan, color: '#0B0F1A', borderRadius: 30, padding: '14px 26px', fontSize: 30, fontWeight: 700}}>
          <div style={{transform: `rotate(${at(5) * 14}deg)`, display: 'flex'}}><svg width="30" height="30"><circle cx="15" cy="15" r="11" stroke="#0B0F1A" strokeWidth="4" fill="none" strokeDasharray="50 20" /></svg></div>
          Processing...</div> : null}
      </div>;
    }
    case 'UI6': {
      const x = interpolate(t, [0, 10], [700, 0], {...cl, easing: ease});
      return <div style={{...glass, ...lat, width: 640, padding: '22px 26px', display: 'flex', gap: 20, alignItems: 'center', transform: `translateX(${x}px)`}}>
        <svg width="80" height="56" viewBox="0 0 40 28"><rect x="1" y="4" width="24" height="16" rx="2" fill={C.blue} /><path d="M25 9h7l5 6v5H25z" fill={C.cyan} /><circle cx="9" cy="22" r="3.5" fill="#fff" /><circle cx="31" cy="22" r="3.5" fill="#fff" /></svg>
        <div><div style={{fontSize: 32, fontWeight: 700}}>Courier booked <span style={{color: C.cyan}}>✓</span></div>
          <div style={{fontSize: 24, opacity: 0.75}}>Tracking ID: SC-20481</div></div></div>;
    }
    case 'UI7': {
      const p = interpolate(at(1), [0, 40], [0, 1], cl), joined = at(5) >= 0;
      return <div style={{position: 'relative'}}><div style={{...glass, ...lat, width: 600, padding: 24}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 18}}><Ring p={p} />
          <div style={{fontSize: 28}}>Transferring to human support...</div></div>
        {joined ? <div style={{marginTop: 18, display: 'flex', alignItems: 'center', gap: 14, transform: `scale(${pop(at(5))})`, transformOrigin: '0 50%'}}>
          <div style={{width: 56, height: 56, borderRadius: 28, background: 'linear-gradient(135deg,#3660F3,#14F4F6)'}} />
          <div style={{fontSize: 28, fontWeight: 700}}>Human Agent joined</div></div> : null}
      </div>
        <div style={{position: 'absolute', left: 40, top: 130}}><Arrow t={at(4)} d="M10 0 C 0 80, 40 120, 110 110 M85 95 L112 110 L88 128" /></div></div>;
    }
    case 'UI8': {
      const s = 'Automate replies, orders, courier and support';
      const n = Math.max(0, Math.floor((f - (wf[0] ?? 0)) / 1.2));
      return <div style={{...glass, ...lat, width: 460, padding: 24}}>
        <div style={{fontSize: 20, letterSpacing: '0.18em', opacity: 0.7, marginBottom: 12}}>SETUCHAT</div>
        <div style={{fontSize: 30, minHeight: 120, lineHeight: 1.25}}>{s.slice(0, n)}<span style={{opacity: f % 16 < 8 ? 1 : 0, color: C.cyan}}>|</span></div>
        <div style={{display: 'flex', justifyContent: 'space-between', marginTop: 12}}>
          <div style={{width: 48, height: 48, borderRadius: 24, border: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 30}}>+</div>
          <div style={{width: 48, height: 48, borderRadius: 24, background: C.blue, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <svg width="22" height="22" viewBox="0 0 24 24"><path d="M3 12 L21 3 L14 21 L11 13 Z" fill="#fff" /></svg></div></div></div>;
    }
  }
  return null;
};

export const UIOverlay: React.FC<{u: UIProps; frame: number}> = ({u, frame}) => {
  const t = frame - u.from;
  if (t < 0) return null;
  const et = frame - (u.to - 5);
  if (et >= 5) return null;
  const inK = interpolate(t, [0, 10], [0, 1], {...cl, easing: ease});
  const exOp = et >= 0 ? 1 - et / 5 : 1;
  const float = Math.sin(t / 22) * 8, tilt = (random(u.k) > 0.5 ? 1 : -1) * 6;
  const full = u.k === 'UI5';
  return <div style={{position: 'absolute', left: u.x, top: u.y, opacity: Math.min(inK * 1.5, 1) * exOp,
    filter: `blur(${(1 - inK) * 10 + (et >= 0 ? et * 6 : 0)}px)`,
    transform: full ? `translateY(${(1 - inK) * 80}px)` : `translateY(${(1 - inK) * 80 + float}px) perspective(1200px) rotateY(${tilt}deg) rotateX(3deg)`}}>
    <Body k={u.k} t={t} f={frame} wf={u.wf} />
  </div>;
};
