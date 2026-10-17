// Which illustration goes with which beat. A beat without an entry here uses
// the placeholder.

import type { ComponentType } from 'react';
import { DaughterOfTheMountain } from './day1/DaughterOfTheMountain';
import { DaughterWhoChose } from './day1/DaughterWhoChose';
import { FathersHouse } from './day1/FathersHouse';
import { FourLamps } from './day1/FourLamps';
import { DinnerFrozen, MargesDinner } from './day1/MargesDinner';
import { Opening } from './day1/Opening';
import { Reflection } from './day1/Reflection';
import { SacrificeWithoutShiva } from './day1/SacrificeWithoutShiva';
import { ShivasGrief } from './day1/ShivasGrief';
import { ShouldSatiGo } from './day1/ShouldSatiGo';
import { SideBySide } from './day1/SideBySide';
import { Theme } from './day1/Theme';
import { PathsFrozen, TheSorting } from './day1/TheSorting';
import { Today } from './day1/Today';
import { Placeholder } from './Placeholder';
import type { VisualProps } from './types';

const illustrations: Record<string, ComponentType<VisualProps>> = {
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
};

export function illustrationFor(beatId: string): ComponentType<VisualProps> {
  return illustrations[beatId] ?? Placeholder;
}

export type { VisualProps };
