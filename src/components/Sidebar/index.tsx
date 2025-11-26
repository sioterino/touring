import styles from './styles.module.css'
import SidebarButton from './SidebarButton'
import { LayoutDashboard, Users, Calendar, Building2, MapPin, Ticket, X } from 'lucide-react'
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

    return (
        <aside className={className}>
            <div className={styles.logo}>
                <Ticket />
                <p>Touring K-POP</p>
                {isMobile && <X className={styles.closeIcon} onClick={closeSidebar} />}
            </div>

            <div className={styles.hyperlinks}>
                <SidebarButton active={path.includes('')} label='Dashboard' path='/' icon={<LayoutDashboard />} />
                <SidebarButton active={path.includes('groups')} label='Groups' path='/groups' icon={<Users />} />
                <SidebarButton active={path.includes('tours')} label='Tours' path='/tours' icon={<Calendar />} />
                <SidebarButton active={path.includes('companies')} label='Companies' path='/companies' icon={<Building2 />} />
                <SidebarButton active={path.includes('venues')} label='Venues' path='/venues' icon={<MapPin />} />
            </div>

            <div className={styles.footer}>
                <ThemeButton theme={theme} setTheme={setTheme} />
                <div className={styles.info}>
                    <p>K-Pop Touring Data</p>
                    <p>Analytics Dashboard</p>
                </div>
            </div>
        </aside>
    )
}

export default Sidebar