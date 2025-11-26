import { Link } from 'react-router-dom'
import type { Group } from '../../../types/models'
import ProfileImage from '../../ProfileImage'
import Tag from '../../Tag'
import styles from './styles.module.css'

interface Props {
    group: Group
}

const GroupCard = ({ group }: Props) => {

    return (
        <Link to={`/groups/${group.id}`} className={styles.card}>
            <div className={styles.header} >
                <ProfileImage name={group.name} colors={group.colors} />
                <h3>{group.name}</h3>
            </div>
            <div className={styles.tags}>
                <Tag text={group.gender} type='filled' />
                <Tag text={`Gen ${group.generation.toString()}`} />
                <Tag text={group.company.name} />
            </div>
        </Link>
    )

}

export default GroupCard
