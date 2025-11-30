import type { Group } from '../../../types/models'
import ProfileImage from '../../ProfileImage'
import Tag from '../../Tag'
import { parseGen } from '../../../utils/StringUtils'
import styles from './styles.module.css'

interface Props {
    loading?: boolean
    group?: Group | null
}

const ArtistProfile = ({ loading, group = null}: Props) => {

    if (loading || !group) return (
        <span className={styles.heading}>
            <span className={styles.skelPfp}></span>
            <span className={styles.desc}>
                <span className={styles.skelHeading}></span>
                <div className={styles.skelTags}>
                    { Array.from({ length: 3 }).map((_, i) => <Tag key={i} type='loading' text='' /> ) }
                </div>
            </span>
        </span>
    )

    return (
        <div className={styles.heading}>
            <div className={styles.pfp}>
                <ProfileImage name={group.name} colors={group.colors} size={90} font={32} />
            </div>
            <div className={styles.desc}>
                <h1>{group.name}</h1>
                <div className={styles.tags}>
                    <Tag text={group.gender} type='filled' />
                    <Tag text={parseGen(group.generation)} />
                    { group.company.parent_company && <Tag text={Array.isArray(group.company.parent_company) ? group.company.parent_company[0].name : group.company.parent_company.name} /> }
                    <Tag text={group.company.name} />
                </div>
            </div>
        </div>
    )

}

export default ArtistProfile
