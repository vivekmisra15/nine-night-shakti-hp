// Night 7's illustrations, by beat id.

import type { ComponentType } from 'react';
import type { VisualProps } from '../types';
import { BeforeTheGround } from './BeforeTheGround';
import { Boggart, BoggartFrozen } from './Boggart';
import { DarkenedBrow } from './DarkenedBrow';
import { BlowsChoice, Multiplied } from './Multiplied';
import { OneWhoDoesGood } from './OneWhoDoesGood';
import { Opening } from './Opening';
import { AngerChoice, OrderToSeize } from './OrderToSeize';
import { PrincesTale, SecondThink } from './PrincesTale';
import { Closing, Reflection } from './Reflection';
import { SideBySide } from './SideBySide';
import { TheGrim } from './TheGrim';
import { Theme } from './Theme';
import { Today } from './Today';

export const day7Illustrations: Record<string, ComponentType<VisualProps>> = {
  'n7-b1': Opening,
  'n7-b2': OrderToSeize,
  'n7-b3': AngerChoice,
  'n7-b4': DarkenedBrow,
  'n7-b5': Multiplied,
  'n7-b6': BlowsChoice,
  'n7-b7': BeforeTheGround,
  'n7-b8': OneWhoDoesGood,
  'n7-b9': Theme,
  'n7-b10': Boggart,
  'n7-b11': BoggartFrozen,
  'n7-b12': PrincesTale,
  'n7-b12g': TheGrim, // the gentle alternative
  'n7-b13': SecondThink, // the basin, or the warm lamp with the gentle alternative
  'n7-b14': SideBySide,
  'n7-b15': Today,
  'n7-b16': Reflection,
  'n7-closing': Closing, // the closing after Finish
};
