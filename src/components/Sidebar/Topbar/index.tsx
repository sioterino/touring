import { Menu } from 'lucide-react'
import ThemeButton from '../ThemeButton'
import styles from './styles.module.css'

interface Props {
  theme: 'light' | 'dark'
  setTheme: (value: 'light' | 'dark') => void
  onMenuClick: () => void
}

const Topbar = ({ theme, setTheme, onMenuClick }: Props) => {

    return (
        <div className={styles.topbar}>

            <div className={styles.logo}>
                <Menu className={styles.menuIcon} onClick={onMenuClick} />
                <p>Encore</p>
            </div>

            <ThemeButton theme={theme} setTheme={setTheme} hideLabel={true}/>
        </div>
    )
}

export default Topbar
