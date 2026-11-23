import {continueRender, delayRender, staticFile} from 'remotion';
// brief 5: real web fonts with HarfBuzz shaping (Chromium). Fonts from assets/fonts via public/fonts symlink.
const faces: [string, string, string][] = [
  ['Anek Bangla', 'fonts/AnekBangla-VF.ttf', '100 800'],
  ['Noto Sans Bengali', 'fonts/NotoSansBengali-VF.ttf', '100 900'],
  ['Hind Siliguri', 'fonts/HindSiliguri-Light.ttf', '300'],
  ['Hind Siliguri', 'fonts/HindSiliguri-Bold.ttf', '700'],
  ['Inter Tight', 'fonts/InterTight-VF.ttf', '100 900'],
];
let started = false;
export const loadFonts = () => {
  if (started || typeof document === 'undefined') return;
  started = true;
  const h = delayRender('fonts', {timeoutInMilliseconds: 180000});
  Promise.all(faces.map(([fam, file, weight]) => {
    const f = new FontFace(fam, `url(${staticFile(file)})`, {weight});
    return f.load().then((ff) => (document as any).fonts.add(ff));
  })).then(() => continueRender(h)).catch((e) => { console.error(e); continueRender(h); });
};
