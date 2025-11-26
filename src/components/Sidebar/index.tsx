import styles from './styles.module.css'
import SidebarButton from './SidebarButton'
import { LayoutDashboard, Users, Calendar, Building2, MapPin } from 'lucide-react'

const Sidebar = () => {

    return (
        <div className={styles.sidebar}>
            <SidebarButton label='Dashboard' path='/dashboard' icon={<LayoutDashboard />} />
            <SidebarButton label='Groups' path='/groups' icon={<Users />} />
            <SidebarButton label='Tours' path='/tours' icon={<Calendar />} />
            <SidebarButton label='Companies' path='/companies' icon={<Building2 />} />
            <SidebarButton label='Venues' path='/venues' icon={<MapPin />} />
        </div>
    )

}

export default Sidebar