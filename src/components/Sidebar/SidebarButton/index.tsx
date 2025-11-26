import { Link } from 'react-router-dom'

import styles from './styles.module.css'

interface Props {
    label: string
    path: string
    icon: React.ReactNode
}

const SidebarButton = ({ label, path, icon }: Props) => {

    return <li className={styles.hyperlink}>
        <Link to={path}>
            {icon}
            {label}
        </Link>
    </li>

}

export default SidebarButton