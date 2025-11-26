import styles from './styles.module.css'
import { useLocation } from 'react-router-dom'
import Sidebar from '../Sidebar'
import Topbar from '../Sidebar/Topbar'
import { useEffect, useState } from 'react'

interface Props {
  theme: 'light' | 'dark'
  setTheme: (value: 'light' | 'dark') => void
  mediaQuery: number
}

const Layout = ({ theme, setTheme, mediaQuery }: Props) => {

  const [openSidebar, setOpenSidebar] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth <= mediaQuery)

  const loc = useLocation()
  const path = loc.pathname.split('/').slice(1)

  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth <= mediaQuery)
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [mediaQuery])

  const open = () => setOpenSidebar(true)
  const close = () => setOpenSidebar(false)

  return (
    <div className={styles.container}>
      <Sidebar
        path={path}
        theme={theme}
        setTheme={setTheme}
        isMobile={isMobile}
        open={openSidebar}
        closeSidebar={close}
      />

      {isMobile && <Topbar theme={theme} setTheme={setTheme} onMenuClick={open} />}

      {isMobile && openSidebar && <div className={styles.overlay} onClick={close} />}
    </div>
  )
}

export default Layout
