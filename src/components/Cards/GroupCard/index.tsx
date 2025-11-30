import { Link } from 'react-router-dom'
import type { Group } from '../../../types/models'
import ProfileImage from '../../ProfileImage'
import Tag from '../../Tag'
import styles from './styles.module.css'
import { parseGen } from '../../../utils/StringUtils'

interface Props {
    group?: Group
    loading?: boolean
}

const GroupCard = ({ loading = false, group }: Props) => {

    if (loading || group === undefined) return (
        <div className={styles.skeletonCard}>
            <div className={styles.skelHeader}>
                <div className={styles.skelPfp}></div>
                <div className={styles.skelHeader}></div>
            </div>
            <div className={styles.skelTagRow}>
                <div className={styles.skelTag}></div>
                <div className={styles.skelTag}></div>
                <div className={styles.skelTag}></div>
            </div>
        </div>
    )

    return (
        <Link to={`/groups/${group.id}`} className={styles.card} >
            <div className={styles.header} >
                <ProfileImage name={group.name} colors={group.colors} />
                <h3>{group.name}</h3>
            </div>
            <div className={styles.tags}>
                <Tag text={group.gender} type='filled' />
                <Tag text={parseGen(group.generation)} />
                <Tag text={group.company.name} />
            </div>
        </Link>
    )

}

export default GroupCard
