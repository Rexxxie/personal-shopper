import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, ShoppingBasket, X, Phone } from 'lucide-react'
import { BRAND, NAV } from '@/data/brand'
import { useList } from '@/store/list'
import { useScrollLock } from '@/lib/useLenis'
import { cn } from '@/lib/utils'
import { EASE, spring } from '@/lib/motion'
import { Logo } from './Logo'
import { ButtonLink } from '@/components/ui/Button'

export function Navbar() {
  const { scrollY } = useScroll()
  const [solid, setSolid] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { count, setOpen } = useList()
  const { pathname } = useLocation()

  useScrollLock(menuOpen)
  useEffect(() => setMenuOpen(false), [pathname])

  // Solid past the fold; auto-hide when scrolling down so the page breathes.
  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0
    setSolid(y > 40)
    setHidden(y > 420 && y > prev && !menuOpen)
  })

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: hidden ? -110 : 0 }}
        transition={spring}
        className="fixed inset-x-0 top-0 z-50"
      >
        <motion.div
          animate={{
            backgroundColor: solid ? 'rgba(255,251,244,0.82)' : 'rgba(255,251,244,0)',
            borderColor: solid ? 'rgba(6,48,28,0.09)' : 'rgba(6,48,28,0)',
            backdropFilter: solid ? 'blur(18px) saturate(1.6)' : 'blur(0px)',
          }}
          transition={{ duration: 0.4, ease: EASE }}
          className="border-b"
        >
          <nav className="container-x flex h-[4.6rem] items-center justify-between gap-4">
            {/* The mobile panel sits behind this bar, so everything in it has to
                flip to light while the menu is open or it reads dark-on-dark. */}
            <Logo dark={menuOpen} />

            {/* ---- desktop links ---- */}
            <ul className="hidden items-center gap-1 lg:flex">
              {NAV.map((item) => {
                const active = pathname === item.to
                return (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      className={cn(
                        'group relative block rounded-full px-4 py-2 text-[0.86rem] font-semibold transition-colors',
                        active ? 'text-brand-900' : 'text-ink-600 hover:text-brand-900',
                      )}
                    >
                      {active && (
                        <motion.span
                          layoutId="nav-pill"
                          className="absolute inset-0 rounded-full bg-brand-900/7"
                          transition={spring}
                        />
                      )}
                      <span className="relative">{item.label}</span>
                      <span className="absolute inset-x-4 bottom-1 h-px origin-left scale-x-0 bg-accent-500 transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100" />
                    </Link>
                  </li>
                )
              })}
            </ul>

            {/* ---- actions ---- */}
            <div className="flex items-center gap-2">
              <a
                href={BRAND.phoneHref}
                className="hidden h-11 w-11 items-center justify-center rounded-full text-brand-900 ring-1 ring-inset ring-brand-900/12 transition-colors hover:bg-brand-900/6 xl:inline-flex"
                aria-label="Call us"
              >
                <Phone className="h-4 w-4" />
              </a>

              <ListButton count={count} onClick={() => setOpen(true)} dark={menuOpen} />

              <div className="hidden sm:block">
                <ButtonLink to="/shop" size="sm" variant="primary" className="!px-5">
                  Send a list
                </ButtonLink>
              </div>

              <button
                onClick={() => setMenuOpen((v) => !v)}
                className={cn(
                  'relative inline-flex h-11 w-11 items-center justify-center rounded-full ring-1 ring-inset transition-colors lg:hidden',
                  menuOpen
                    ? 'text-cream-100 ring-cream-100/25 hover:bg-cream-100/10'
                    : 'text-brand-900 ring-brand-900/12 hover:bg-brand-900/6',
                )}
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={menuOpen}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {menuOpen ? (
                    <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                      <X className="h-5 w-5" />
                    </motion.span>
                  ) : (
                    <motion.span key="m" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                      <Menu className="h-5 w-5" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </nav>
        </motion.div>
      </motion.header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  )
}

/* ------------------------------------------------------------------------ */

function ListButton({ count, onClick, dark }: { count: number; onClick: () => void; dark?: boolean }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'relative inline-flex h-11 items-center gap-2 rounded-full px-4 transition-colors',
        dark
          ? 'bg-cream-100/10 text-cream-100 hover:bg-cream-100/20'
          : 'bg-brand-900/6 text-brand-900 hover:bg-brand-900/11',
      )}
      aria-label={`Open your list — ${count} item${count === 1 ? '' : 's'}`}
    >
      <ShoppingBasket className="h-[1.05rem] w-[1.05rem]" />
      <span className="hidden text-[0.82rem] font-semibold sm:inline">List</span>
      <AnimatePresence>
        {count > 0 && (
          <motion.span
            key={count}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 520, damping: 20 }}
            className="absolute -right-1 -top-1 flex h-[1.35rem] min-w-[1.35rem] items-center justify-center rounded-full bg-accent-500 px-1 text-[0.68rem] font-bold text-brand-950 shadow-sm"
          >
            {count > 99 ? '99+' : count}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  )
}

/* ------------------------------------------------------------------------ */

function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-40 lg:hidden"
          initial="hidden"
          animate="show"
          exit="hidden"
          variants={{ hidden: {}, show: {} }}
        >
          {/* Panel wipes down from the top edge */}
          <motion.div
            className="grain absolute inset-0 bg-brand-950"
            variants={{
              hidden: { clipPath: 'inset(0 0 100% 0)' },
              show: { clipPath: 'inset(0 0 0% 0)' },
            }}
            transition={{ duration: 0.65, ease: EASE }}
          />

          <div className="relative flex h-full flex-col justify-between pb-10 pt-[5.4rem]">
            <motion.ul
              className="container-x flex flex-col"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: 0.22 } } }}
            >
              {NAV.map((item) => (
                <motion.li
                  key={item.to}
                  variants={{
                    hidden: { y: 34, opacity: 0 },
                    show: { y: 0, opacity: 1, transition: { duration: 0.6, ease: EASE } },
                  }}
                  className="overflow-hidden border-b border-cream-100/10"
                >
                  <Link
                    to={item.to}
                    onClick={onClose}
                    className="group flex items-center justify-between py-5 font-display text-[1.9rem] font-semibold tracking-[-0.035em] text-cream-100"
                  >
                    {item.label}
                    <span className="text-cream-100/25 transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </Link>
                </motion.li>
              ))}
            </motion.ul>

            <motion.div
              className="container-x space-y-5"
              variants={{
                hidden: { opacity: 0, y: 24 },
                show: { opacity: 1, y: 0, transition: { delay: 0.5, duration: 0.6, ease: EASE } },
              }}
            >
              <ButtonLink to="/shop" variant="accent" size="lg" full onClick={onClose}>
                Send your market list
              </ButtonLink>
              <div className="flex flex-col gap-1 text-[0.82rem] text-cream-100/55">
                <a href={BRAND.phoneHref} className="font-semibold text-cream-100">
                  {BRAND.phone}
                </a>
                <span>{BRAND.hours}</span>
                <span>{BRAND.address}</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
