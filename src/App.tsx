import { AnimatePresence, motion } from 'motion/react'
import { Suspense, lazy, useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Cursor, Preloader, ScrollProgress, SupportFab } from '@/components/layout/Chrome'
import { ListDrawer } from '@/components/list/ListDrawer'
import { ListProvider } from '@/store/list'
import { useLenis, scrollTop } from '@/lib/useLenis'
import { pageVariants } from '@/lib/motion'
import Home from '@/pages/Home'

// Everything past the landing page is split out — the hero should paint fast.
const Shop = lazy(() => import('@/pages/Shop'))
const HowItWorks = lazy(() => import('@/pages/HowItWorks'))
const Pricing = lazy(() => import('@/pages/Pricing'))
const ForOffices = lazy(() => import('@/pages/ForOffices'))
const BecomeShopper = lazy(() => import('@/pages/BecomeShopper'))
const About = lazy(() => import('@/pages/About'))
const Contact = lazy(() => import('@/pages/Contact'))
const Checkout = lazy(() => import('@/pages/Checkout'))
const Track = lazy(() => import('@/pages/Track'))
const Legal = lazy(() => import('@/pages/Legal'))
const NotFound = lazy(() => import('@/pages/NotFound'))

/** Wraps each route so pages cross-fade instead of snapping. */
function Page({ children }: { children: React.ReactNode }) {
  return (
    <motion.main variants={pageVariants} initial="hidden" animate="show" exit="exit">
      {children}
    </motion.main>
  )
}

function RouteFallback() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1.1, repeat: Infinity, ease: 'linear' }}
        className="h-8 w-8 rounded-full border-2 border-brand-900/12 border-t-brand-600"
        aria-label="Loading"
      />
    </div>
  )
}

function AnimatedRoutes() {
  const location = useLocation()

  // New page = back to the top, but skip it for in-page anchors.
  useEffect(() => {
    if (!location.hash) scrollTop(true)
  }, [location.pathname, location.hash])

  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<RouteFallback />}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Page><Home /></Page>} />
          <Route path="/shop" element={<Page><Shop /></Page>} />
          <Route path="/how-it-works" element={<Page><HowItWorks /></Page>} />
          <Route path="/pricing" element={<Page><Pricing /></Page>} />
          <Route path="/for-offices" element={<Page><ForOffices /></Page>} />
          <Route path="/become-a-shopper" element={<Page><BecomeShopper /></Page>} />
          <Route path="/about" element={<Page><About /></Page>} />
          <Route path="/contact" element={<Page><Contact /></Page>} />
          <Route path="/checkout" element={<Page><Checkout /></Page>} />
          <Route path="/track" element={<Page><Track /></Page>} />
          <Route path="/terms" element={<Page><Legal kind="terms" /></Page>} />
          <Route path="/privacy" element={<Page><Legal kind="privacy" /></Page>} />
          <Route path="*" element={<Page><NotFound /></Page>} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  )
}

export default function App() {
  useLenis()

  return (
    <ListProvider>
      <Preloader />
      <Cursor />
      <ScrollProgress />
      <Navbar />
      <ListDrawer />
      <SupportFab />
      <AnimatedRoutes />
      <Footer />
    </ListProvider>
  )
}
