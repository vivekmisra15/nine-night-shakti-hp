// Night 5's illustrations, by beat id.

import type { ComponentType } from 'react';
import type { VisualProps } from '../types';
import { ClearingStill, Forest } from './Forest';
import { Grimmauld, KitchenStill } from './Grimmauld';
import { LeadTheArmy } from './LeadTheArmy';
import { Messengers } from './Messengers';
import { MotherOfSkanda, TheVel } from './MotherOfSkanda';
import { MothersLap } from './MothersLap';
import { Opening } from './Opening';
import { Closing, Reflection } from './Reflection';
import { SideBySide } from './SideBySide';
import { Saravana, SixMothers } from './SixMothers';
import { OtherTellings, SparkTooHot } from './SparkTooHot';
import { TarakaBoon } from './TarakaBoon';
import { Theme } from './Theme';
import { Today } from './Today';

export const day5Illustrations: Record<string, ComponentType<VisualProps>> = {
  'n5-b1': Opening,
  'n5-b2': TarakaBoon,
  'n5-b3a': SparkTooHot,
  'n5-b3b': OtherTellings,
  'n5-b4a': SixMothers,
  'n5-b4b': Saravana,
  'n5-b5': Messengers,
  'n5-b6': MothersLap,
  'n5-b7': LeadTheArmy,
  'n5-b8a': MotherOfSkanda,
  'n5-b8b': TheVel,
  'n5-b9': Theme,
  'n5-b10': Grimmauld,
  'n5-b11': KitchenStill,
  'n5-b12': Forest,
  'n5-b13': ClearingStill,
  'n5-b14': SideBySide,
  'n5-b15': Today,
  'n5-b16': Reflection,
  'n5-closing': Closing, // the closing after Finish
};
