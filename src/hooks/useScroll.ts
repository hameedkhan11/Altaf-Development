'use client'

import { useScroll, useTransform } from 'framer-motion'

export function useScrollEffects() {
  const { scrollY } = useScroll()
  const headerOpacity = useTransform(scrollY, [0, 100], [0.8, 0.95])
  const heroY = useTransform(scrollY, [0, 500], [0, -100])

  return { scrollY, headerOpacity, heroY }
}