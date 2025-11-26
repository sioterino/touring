import styles from './styles.module.css'
import SidebarButton from './SidebarButton'
import { LayoutDashboard, Users, Calendar, Building2, MapPin, Ticket } from 'lucide-react'
import ThemeButton from './ThemeButton'

interface Props {
    path: string[]
    theme: 'light' | 'dark'
  setTheme: (value: 'light' | 'dark') => void
}

const Sidebar = ({ path = [''], theme, setTheme }: Props) => {

    return (
        <div className={styles.sidebar}>

            <div className={styles.logo}>
                <Ticket />
                <p>Touring K-POP</p>
            </div>

            <div className={styles.hyperlinks}>
                <SidebarButton active={ path.includes('') ? true : false } label='Dashboard' path='/' icon={<LayoutDashboard />} />
                <SidebarButton active={ path.includes('groups') ? true : false } label='Groups' path='/groups' icon={<Users />} />
                <SidebarButton active={ path.includes('tours') ? true : false } label='Tours' path='/tours' icon={<Calendar />} />
                <SidebarButton active={ path.includes('companies') ? true : false } label='Companies' path='/companies' icon={<Building2 />} />
                <SidebarButton active={ path.includes('venues') ? true : false } label='Venues' path='/venues' icon={<MapPin />} />
            </div>

            <div className={styles.footer}>
                <ThemeButton theme={theme} setTheme={setTheme} />
                <div className={styles.info}>
                    <p>K-Pop Touring Data</p>
                    <p>Analytics Dashboard</p>
                </div>
            </div>
        </div>
    )

}

export default Sidebar