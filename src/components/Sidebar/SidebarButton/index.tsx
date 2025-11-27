import { Link } from 'react-router-dom'
import styles from './styles.module.css'

interface Props {
    label: string
    path: string
    icon: React.ReactNode
    active?: boolean
    onClick?: () => void   // <--- added
}

const SidebarButton = ({ label, path, icon, active = false, onClick }: Props) => {
    return (
        <li 
            className={`${styles.hyperlink} ${active ? styles.active : ''}`}
            onClick={onClick}   // <--- triggers closeSidebar
        >
            <Link to={path}>
                {icon}
                {label}
            </Link>
        </li>
    )
}

export default SidebarButton
