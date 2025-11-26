import { Sun, Moon } from 'lucide-react'
import styles from './styles.module.css'

interface Props {
  theme: 'light' | 'dark'
  setTheme: (value: 'light' | 'dark') => void
  hideLabel?: boolean
}

const ThemeButton = ({ theme, setTheme, hideLabel = false }: Props) => {

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  return (
    <div className={styles.theme}>
      <p className={hideLabel ? styles.hideLabel : ''}>Theme</p>
      {theme === "light" ?
        <Moon className={styles.themeIcon} onClick={toggleTheme} /> :
        <Sun className={styles.themeIcon} onClick={toggleTheme} />
      }
    </div>
  )
}

export default ThemeButton
