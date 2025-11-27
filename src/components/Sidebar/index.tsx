import styles from './styles.module.css'
import SidebarButton from './SidebarButton'
import { LayoutDashboard, Users, Calendar, Building2, MapPin, Ticket, X, Github, HeartPlus } from 'lucide-react'
import ThemeButton from './ThemeButton'

interface Props {
  path: string[]
  theme: 'light' | 'dark'
  setTheme: (value: 'light' | 'dark') => void
  closeSidebar: () => void
  isMobile: boolean
  open: boolean
}

const Sidebar = ({ path = [''], theme, setTheme, closeSidebar, isMobile, open }: Props) => {
    const className = [ styles.sidebar, isMobile ? styles.mobile : '', isMobile && !open ? styles.closed : '', ].join(' ')

    const buttons = [
        {name: 'Dashboard', path: '/', include: '', icon: <LayoutDashboard />},
        {name: 'Groups', path: '/groups', include: 'groups', icon: <Users />},
        {name: 'Tours', path: '/tours', include: 'tours', icon: <Calendar />},
        {name: 'Companies', path: '/companies', include: 'companies', icon: <Building2 />},
        {name: 'Venues', path: '/venues', include: 'venues', icon: <MapPin />},
    ]

    return (
        <aside className={className}>
            <div className={styles.logo}>
                <Ticket />
                <p>Touring K-POP</p>
                {isMobile && <X className={styles.closeIcon} onClick={closeSidebar} />}
            </div>

            <ul className={styles.hyperlinks}>
                {
                    buttons.map( (btn, key) => {
                    return (
                        <SidebarButton
                            key={key}
                            active={path.includes(btn.include)}
                            label={btn.name}
                            path={btn.path}
                            icon={btn.icon}
                            onClick={isMobile ? closeSidebar : undefined}
                        />
                    )
                } )
                }
            </ul>

            <div className={styles.footer}>
                <ThemeButton theme={theme} setTheme={setTheme} />
                <div className={styles.info}>
                    <div>
                        <p>K-Pop Touring Data</p>
                        <p>Analytics Dashboard</p>
                    </div>
                    <div className={styles.socials}>
                        <a href="http://www.github.com/sioterino/touring" target="_blank" rel="noopener noreferrer">
                            <Github className={styles.socialsButton} />
                        </a>
                        <a href="http://www.ko-fi.com/sioterino" target="_blank" rel="noopener noreferrer">
                            <HeartPlus className={styles.socialsButton} />
                        </a>
                    </div>
                </div>
            </div>
        </aside>
    )
}

export default Sidebar