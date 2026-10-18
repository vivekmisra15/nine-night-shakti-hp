// Night 1's illustrations, by beat id.

import type { ComponentType } from 'react';
import type { VisualProps } from '../types';
import { DaughterOfTheMountain } from './DaughterOfTheMountain';
import { DaughterWhoChose } from './DaughterWhoChose';
import { FathersHouse } from './FathersHouse';
import { FourLamps } from './FourLamps';
import { DinnerFrozen, MargesDinner } from './MargesDinner';
import { Opening } from './Opening';
import { Closing, Reflection } from './Reflection';
import { SacrificeWithoutShiva } from './SacrificeWithoutShiva';
import { ShivasGrief } from './ShivasGrief';
import { ShouldSatiGo } from './ShouldSatiGo';
import { SideBySide } from './SideBySide';
import { Theme } from './Theme';
import { PathsFrozen, TheSorting } from './TheSorting';
import { Today } from './Today';

export const day1Illustrations: Record<string, ComponentType<VisualProps>> = {
  'n1-b1': Opening,
  'n1-b2': DaughterWhoChose,
  'n1-b3': SacrificeWithoutShiva,
  'n1-b4': ShouldSatiGo,
  'n1-b5': FathersHouse,
  'n1-b6': ShivasGrief,
  'n1-b7': FourLamps,
  'n1-b8': DaughterOfTheMountain,
  'n1-b9': Theme,
  'n1-b10': MargesDinner,
  'n1-b11': DinnerFrozen,
  'n1-b12': TheSorting,
  'n1-b13': PathsFrozen,
  'n1-b14': SideBySide,
  'n1-b15': Today,
  'n1-b16': Reflection,
  'n1-closing': Closing, // the closing after Finish
};
