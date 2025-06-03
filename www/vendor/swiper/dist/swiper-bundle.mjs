/**
 * Swiper 10.2.0
 * Most modern mobile touch slider and framework with hardware accelerated transitions
 * https://swiperjs.com
 *
 * Copyright 2014-2023 Vladimir Kharlampidi
 *
 * Released under the MIT License
 *
 * Released on: August 25, 2023
 */

import { S as Swiper } from './shared/swiper-core.mjs';
import EffectCards from './modules/effect-cards.mjs';

// Swiper Class
const modules = [EffectCards];
Swiper.use(modules);

export { Swiper, Swiper as default };
