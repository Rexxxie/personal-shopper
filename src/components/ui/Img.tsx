import { motion, useScroll, useTransform } from 'motion/react'
import { useRef, useState } from 'react'
import { P, PSet, PBlur, type PhotoKey } from '@/data/images'
import { cn } from '@/lib/utils'
import { EASE } from '@/lib/motion'

interface ImgProps {
  photo: PhotoKey
  alt: string
  w?: number
  h?: number
  className?: string
  imgClassName?: string
  /** Wrapper clips; the image scales down into place as it enters view. */
  reveal?: boolean
  /** Vertical drift as the page scrolls past. 0 = off. */
  parallax?: number
  priority?: boolean
  rounded?: string
  sizes?: string
}

/**
 * Every photo on the site goes through here so they all share the same
 * blur-up load, scale reveal and optional parallax. Consistency in how
 * imagery arrives is most of what makes a site feel considered.
 */
export function Img({
  photo,
  alt,
  w = 1000,
  h = 1250,
  className,
  imgClassName,
  reveal = true,
  parallax = 0,
  priority = false,
  rounded = 'rounded-3xl',
  sizes,
}: ImgProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [loaded, setLoaded] = useState(false)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [`-${parallax}%`, `${parallax}%`])

  return (
    <div ref={ref} className={cn('relative overflow-hidden bg-cream-300', rounded, className)}>
      {/* Blurred placeholder holds the layout and colour while the real file streams */}
      <img
        src={PBlur(photo)}
        alt=""
        aria-hidden
        className={cn(
          'absolute inset-0 h-full w-full scale-110 object-cover blur-xl transition-opacity duration-700',
          loaded ? 'opacity-0' : 'opacity-100',
        )}
      />

      {/*
        Two layers on purpose: the outer div owns the scroll-linked drift, the
        inner img owns the entrance scale. Putting both on one element makes the
        motion value and the variant fight over `transform`.
      */}
      <motion.div
        style={parallax ? { y } : undefined}
        className={cn('relative h-full w-full', parallax > 0 && 'scale-[1.18]')}
      >
        <motion.img
          src={P(photo, w, h)}
          {...PSet(photo, w, h)}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          fetchPriority={priority ? 'high' : 'auto'}
          // An explicit `sizes` from the call site wins over the derived one.
          sizes={sizes}
          onLoad={() => setLoaded(true)}
          className={cn('h-full w-full object-cover', imgClassName)}
          initial={reveal ? { scale: 1.22, opacity: 0 } : false}
          whileInView={reveal ? { scale: 1, opacity: 1 } : undefined}
          viewport={{ once: true, margin: '-8%' }}
          transition={{ duration: 1.3, ease: EASE }}
        />
      </motion.div>
    </div>
  )
}
