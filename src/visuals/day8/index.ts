// Night 8's illustrations, by beat id.

import type { ComponentType } from 'react';
import type { VisualProps } from '../types';
import { Gauri, WishesChoice } from './Gauri';
import { GroveOfTapas } from './GroveOfTapas';
import { KitchenFrozen, KreachersTale } from './KreachersTale';
import { Mahagauri } from './Mahagauri';
import { NameThatStung, WhatWouldYouDo } from './NameThatStung';
import { Opening } from './Opening';
import { OtherTellingsA, OtherTellingsB } from './OtherTellings';
import { Closing, Reflection, SideBySide, Theme, Today } from './Reflect';
import { SilverDoe, TentFrozen } from './SilverDoe';

export const day8Illustrations: Record<string, ComponentType<VisualProps>> = {
  'n8-b1': Opening,
  'n8-b2': NameThatStung,
  'n8-b3': WhatWouldYouDo,
  'n8-b4': GroveOfTapas,
  'n8-b5': Gauri,
  'n8-b6': WishesChoice,
  'n8-b7a': OtherTellingsA,
  'n8-b7b': OtherTellingsB,
  'n8-b8': Mahagauri,
  'n8-b9': Theme,
  'n8-b10': KreachersTale,
  'n8-b11': KitchenFrozen,
  'n8-b12': SilverDoe,
  'n8-b13': TentFrozen,
  'n8-b14': SideBySide,
  'n8-b15': Today,
  'n8-b16': Reflection,
  'n8-closing': Closing, // the closing after Finish
};
