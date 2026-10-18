// Night 9's illustrations, by beat id.

import type { ComponentType } from 'react';
import type { VisualProps } from '../types';
import { ElderWand, WandOnDesk } from './ElderWand';
import { EightGifts, GiverOfPerfection } from './GiverOfPerfection';
import { HalfOfShivaDevotional, HalfOfShivaPurana } from './HalfOfShiva';
import { Closing, LookBack, Reflection, SideBySide, Today } from './LookBack';
import { MirrorAndStone, MirrorGlass } from './MirrorAndStone';
import { Opening } from './Opening';
import { TenthDayNorthAndBengal, TenthDayRegions, TenthDayVictories } from './TenthDay';
import { Theme } from './Theme';
import { TwoSeekers, WhatTheDeviGave, WhatWouldYouAsk } from './TwoSeekers';

export const day9Illustrations: Record<string, ComponentType<VisualProps>> = {
  'n9-b1': Opening,
  'n9-b2': GiverOfPerfection,
  'n9-b3': EightGifts,
  'n9-b4a': HalfOfShivaDevotional,
  'n9-b4b': HalfOfShivaPurana,
  'n9-b5': TwoSeekers,
  'n9-b6': WhatWouldYouAsk,
  'n9-b7': WhatTheDeviGave,
  'n9-b8a': TenthDayVictories,
  'n9-b8b': TenthDayNorthAndBengal,
  'n9-b8c': TenthDayRegions,
  'n9-b9': Theme,
  'n9-b10': ElderWand,
  'n9-b11': WandOnDesk,
  'n9-b12': MirrorAndStone,
  'n9-b13': MirrorGlass,
  'n9-b14': SideBySide,
  'n9-b15': LookBack,
  'n9-b16': Today,
  'n9-b17': Reflection,
  'n9-closing': Closing, // the closing after Finish
};
