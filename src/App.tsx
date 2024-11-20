import Spline from '@splinetool/react-spline'
import { AnimatePresence, motion, useScroll } from 'motion/react'
import { useEffect, useState } from 'react'
import './App.css'
import { Architecture } from './components/architecture'
import { Hero } from './components/hero'
import { Solutions } from './components/solutions'
import { Subscribe } from './components/Subscribe'
import { VisionStatement } from './components/vision-statement'
import About from './aboutUs'

function App() {
  const { scrollY } = useScroll()
  const [showSpline, setShowSpline] = useState(false)

  useEffect(() => {
    scrollY.on('change', (latest) => {
      setShowSpline(latest <= window.innerHeight + 3000)
    })
  }, [scrollY])

  return (
    <div className='w-screen'>

      <main className='container'>
        <About />
      </main>
    </div>
  )
}

export default App
