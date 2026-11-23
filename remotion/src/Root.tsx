import React from 'react';
import {Composition, getInputProps} from 'remotion';
import {Main} from './Main';
import {FontCard} from './FontCard';
import data from '../../data/shots.json';
export const Root: React.FC = () => {
  const p: any = getInputProps();
  return (<>
    <Composition id="SetuChat" component={Main} width={1080} height={1920} fps={30} durationInFrames={(data as any).frames}
      defaultProps={{matte: !!p.matte}} />
    <Composition id="FontCard" component={FontCard} width={1080} height={1920} fps={30} durationInFrames={1} />
  </>);
};
