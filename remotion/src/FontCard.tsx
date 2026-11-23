import React from 'react';
import {AbsoluteFill} from 'remotion';
import {loadFonts} from './fonts';
import {FONT, C} from './theme';
// brief 6.2 Bangla shaping test card
loadFonts();
const T = 'ক্ত ন্ত স্ট ন্ট ন্ন ক্য র্থ দ্ধ প্র র্য সিদ্ধান্ত পার্থক্য সম্পন্ন প্রক্রিয়া কুরিয়ারও ব্যবহার কানেক্ট সঙ্গে অসন্তুষ্ট চ্যাটবট ি ী ে ৈ ো ৌ';
export const FontCard: React.FC = () => (
  <AbsoluteFill style={{background: '#0B0F1A', color: '#fff', padding: 50, gap: 30, display: 'flex', flexDirection: 'column'}}>
    <div style={{fontFamily: FONT.bnHero, fontWeight: 800, fontSize: 90, color: C.blue, lineHeight: 1.2}}>{T}</div>
    <div style={{fontFamily: FONT.bnSup, fontWeight: 300, fontSize: 64, lineHeight: 1.3}}>{T}</div>
    <div style={{fontFamily: FONT.lat, fontWeight: 900, fontSize: 120, color: C.cyan}}>SetuChat AI</div>
  </AbsoluteFill>
);
