import { Link } from 'react-router-dom'

import styles from './styles.module.css'

interface Props {
    label: string
    path: string
    icon: React.ReactNode
    active?: boolean
}

const SidebarButton = ({ label, path, icon, active = false }: Props) => {

    return (
        <li className={`${styles.hyperlink} ${active ? styles.active : ''}`}>
            <Link to={path}>{ icon }{ label }</Link>
        </li>
    )

}

export default SidebarButton