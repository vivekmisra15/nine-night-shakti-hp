// Night 3's illustrations, by beat id (and 'n3-closing' for the closing).

import type { ComponentType } from 'react';
import type { VisualProps } from '../types';
import { Bridegroom } from './Bridegroom';
import { MollysDuel, SmokeSettling } from './MollysDuel';
import { BellThatProtects, MoonBell, ShouldShivaChange } from './MoonBell';
import { DoorwayFrozen, NevilleStands } from './Neville';
import { Opening } from './Opening';
import { MenasAnger, ShivaAsHeIs, WhatWouldYouDo } from './Procession';
import { Closing, Reflection, SideBySide, Today } from './Reflection';
import { SavesDudley } from './SavesDudley';
import { Theme } from './Theme';

export const day3Illustrations: Record<string, ComponentType<VisualProps>> = {
  'n3-b1': Opening,
  'n3-b2': Bridegroom,
  'n3-b3': ShivaAsHeIs,
  'n3-b4': WhatWouldYouDo,
  'n3-b5': MenasAnger,
  'n3-b6': MoonBell,
  'n3-b7': ShouldShivaChange,
  'n3-b8': BellThatProtects,
  'n3-b9': Theme,
  'n3-b10': NevilleStands,
  'n3-b11': DoorwayFrozen,
  'n3-b12': MollysDuel,
  'n3-b12g': SavesDudley, // the gentle alternative to Molly's duel
  'n3-b13': SmokeSettling,
  'n3-b14': SideBySide,
  'n3-b15': Today,
  'n3-b16': Reflection,
  'n3-closing': Closing, // the closing after Finish
};
