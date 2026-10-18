// Night 2's illustrations, by beat id.

import type { ComponentType } from 'react';
import type { VisualProps } from '../types';
import { Aparna } from './Aparna';
import { KamasArrow } from './KamasArrow';
import { DoorFaint, Occlumency } from './Occlumency';
import { OhDont } from './OhDont';
import { OneWhoPractises } from './OneWhoPractises';
import { Opening } from './Opening';
import { LakeFaint, PatronusLessons } from './PatronusLessons';
import { Closing, Reflection, SideBySide, Today } from './Reflect';
import { SummoningCharm } from './SummoningCharm';
import { Theme } from './Theme';
import { AnswerTheStranger, TwoTests } from './TwoTests';
import { WhatNow } from './WhatNow';
import { YogiWhoWouldNotWake } from './YogiWhoWouldNotWake';

export const day2Illustrations: Record<string, ComponentType<VisualProps>> = {
  'n2-b1': Opening,
  'n2-b2': YogiWhoWouldNotWake,
  'n2-b3': KamasArrow,
  'n2-b4': WhatNow,
  'n2-b5': OhDont,
  'n2-b6': Aparna,
  'n2-b7': TwoTests,
  'n2-b8': AnswerTheStranger,
  'n2-b9': OneWhoPractises,
  'n2-b10': Theme,
  'n2-b11': PatronusLessons,
  'n2-b12': LakeFaint,
  'n2-b13': Occlumency,
  'n2-b13g': SummoningCharm, // the gentle alternative to Beat 13
  'n2-b14': DoorFaint,
  'n2-b15': SideBySide,
  'n2-b16': Today,
  'n2-b17': Reflection,
  'n2-closing': Closing, // the closing after Finish
};
