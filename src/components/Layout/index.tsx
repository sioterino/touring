import styles from './styles.module.css'
import { useLocation } from 'react-router-dom'
import Sidebar from '../Sidebar'

interface Props {
  theme: 'light' | 'dark'
  setTheme: (value: 'light' | 'dark') => void
}

const Layout = ({ theme, setTheme }: Props) => {
    
  const loc = useLocation()
  const path = loc.pathname.split('/').slice(1)

  return (
    <div className={styles.container}>
      <Sidebar path={path} theme={theme} setTheme={setTheme} />
    </div>
  )
}

export default Layout
