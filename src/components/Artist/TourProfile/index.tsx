import type { Tour } from '../../../types/models'
import ProfileImage from '../../ProfileImage'
import styles from './styles.module.css'
import type { TourResponseDTO } from '../../../types/dtos'
import { CalendarArrowDown, CalendarArrowUp, MapPin } from 'lucide-react'
import { formatPrettyDate } from '../../../utils/DateUtils'
import { Link } from 'react-router-dom'
import Tag from '../../Tag'

interface Props {
    loading?: boolean
    tour?: Tour | TourResponseDTO | null
}

const TourProfile = ({ loading, tour = null}: Props) => {

    if (loading || !tour) return (
        <span className={styles.heading}>
            <span className={styles.skelPfp}></span>

            <span className={styles.desc}>
                <div className={styles.skelInfo}>
                    <span className={styles.skelHeading}></span>
                    <span className={styles.skelGroup}></span>
                </div>
                
                <div className={styles.tags}>
                    <Tag type='loading' text='' />
                    <div className={styles.skelDates}>
                        <Tag type='loading' text='' />
                        <Tag type='loading' text='' />
                    </div>
                </div>
            </span>

        </span>
    )

    return (
        <div className={styles.heading}>
            <div className={styles.pfp}>
                <ProfileImage name={tour.name} colors={tour.group.colors} size={90} font={32} />
            </div>
            <div className={styles.desc}>
                <div>
                    <h1>{tour.name}</h1>
                    <Link className={styles.groupName} to={`/groups/${tour.group.id}`}>{tour.group.name}</Link>
                </div>
                <div className={styles.tags}>
                    <Tag type='filled' text={`${tour.tour} tour`} icon={ <MapPin /> } />
                    <div className={styles.dates}>
                        <Tag text={ formatPrettyDate(tour.begin) } icon={ <CalendarArrowUp /> } />
                        <Tag text={ formatPrettyDate(tour.end) } icon={ <CalendarArrowDown /> } />
                    </div>
                </div>
            </div>
        </div>
    )

}

export default TourProfile
