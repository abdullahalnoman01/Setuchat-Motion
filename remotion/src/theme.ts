// brief 4 + 5. No red anywhere.
export const C = {blue:'#3660F3', cyan:'#14F4F6', white:'#FFFFFF', blueHi:'#5B82FF', glass:'rgba(11,15,26,0.8)', border:'rgba(255,255,255,0.18)'};
export const GRAD = `linear-gradient(90deg, ${C.blue} 0%, ${C.cyan} 100%)`;
export const W = 1080, H = 1920, FPS = 30;
export const FONT = {
  bnHero: '"Anek Bangla", "Noto Sans Bengali", sans-serif',
  bnSup: '"Noto Sans Bengali", "Hind Siliguri", sans-serif',
  lat: '"Inter Tight", "Anek Bangla", sans-serif',
};
// camera framings (brief 3.5): scale, focus (transform-origin) keeps head in upper third
export const FRAMING: Record<string, number> = {WIDE: 1.0, MEDIUM: 1.18, CLOSE: 1.35, PUNCH: 1.45};
export const ORIGIN_Y = 560;
export const SAFE = {bottom: 330, side: 40};
export const isLatin = (s: string) => /[A-Za-z]/.test(s);
