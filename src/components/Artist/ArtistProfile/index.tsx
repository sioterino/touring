import type { Group } from '../../../types/models'
import ProfileImage from '../../ProfileImage'
import Tag from '../../Tag'
import { parseGen } from '../../../utils/StringUtils'
import styles from './styles.module.css'
import { formatPrettyDate } from '../../../utils/DateUtils'
import {  ArrowUp, Building2, CalendarArrowUp, Circle, Mars, Venus } from 'lucide-react'

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
                    <span>
                        {
                            group.gender === 'female' ? <Venus />
                            : group.gender === 'male' ? <Mars />
                                : <Circle />
                        }
                        { group.gender }
                    </span>
                    <span><CalendarArrowUp />{formatPrettyDate(group.debut)}</span>
                    <span><ArrowUp />{parseGen(group.generation)}</span>
                    { group.company.parent_company && <span><Building2 />{Array.isArray(group.company.parent_company) ? group.company.parent_company[0].name : group.company.parent_company.name}</span> }
                    <span><Building2 />{group.company.name}</span>
                </div>


            </div>
        </div>
    )

}

export default ArtistProfile
