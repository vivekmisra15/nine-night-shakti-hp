// Night 6's illustrations, by beat id.

import type { ComponentType } from 'react';
import type { VisualProps } from '../types';
import { BornOfLight } from './BornOfLight';
import { DumbledoresArmy, RoomDimmed } from './DumbledoresArmy';
import { GodsGoForHelp, HeavenLost } from './HeavenLost';
import { Katyayani } from './Katyayani';
import { Opening } from './Opening';
import { Closing, Reflection } from './Reflection';
import { SideBySide } from './SideBySide';
import { TheBattle } from './TheBattle';
import { Theme } from './Theme';
import { Today } from './Today';
import { ChessDimmed, ThroughTheTrapdoor } from './Trapdoor';
import { WhatIsThis } from './WhatIsThis';

export const day6Illustrations: Record<string, ComponentType<VisualProps>> = {
  'n6-b1': Opening,
  'n6-b2': HeavenLost,
  'n6-b3': GodsGoForHelp,
  'n6-b4': BornOfLight,
  'n6-b5': WhatIsThis,
  'n6-b6': TheBattle,
  'n6-b7': Katyayani,
  'n6-b8': Theme,
  'n6-b9': DumbledoresArmy,
  'n6-b10': RoomDimmed,
  'n6-b11': ThroughTheTrapdoor,
  'n6-b12': ChessDimmed,
  'n6-b13': SideBySide,
  'n6-b14': Today,
  'n6-b15': Reflection,
  'n6-closing': Closing, // the closing after Finish
};
