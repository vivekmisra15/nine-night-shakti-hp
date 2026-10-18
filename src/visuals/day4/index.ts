// Night 4's illustrations, by beat id.

import type { ComponentType } from 'react';
import type { VisualProps } from '../types';
import { BeforeAnything } from './BeforeAnything';
import { HowMuch, WhatComesFirst } from './Choices';
import { ChristmasJumper, JumperWindow } from './ChristmasJumper';
import { GourdAndEgg } from './GourdAndEgg';
import { HagridsCake, HutFire } from './HagridsCake';
import { Opening } from './Opening';
import { Closing, Reflection } from './Reflection';
import { SideBySide } from './SideBySide';
import { SunDwelling } from './SunDwelling';
import { Theme } from './Theme';
import { Today } from './Today';

export const day4Illustrations: Record<string, ComponentType<VisualProps>> = {
  'n4-b1': Opening,
  'n4-b2': BeforeAnything,
  'n4-b3': WhatComesFirst,
  'n4-b4': SunDwelling,
  'n4-b5': HowMuch,
  'n4-b6': GourdAndEgg,
  'n4-b7': Theme,
  'n4-b8': HagridsCake,
  'n4-b9': HutFire,
  'n4-b10': ChristmasJumper,
  'n4-b11': JumperWindow,
  'n4-b12': SideBySide,
  'n4-b13': Today,
  'n4-b14': Reflection,
  'n4-closing': Closing, // the closing after Finish
};
