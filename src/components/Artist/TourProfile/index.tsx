import type { Tour } from '../../../types/models'
import ProfileImage from '../../ProfileImage'
import styles from './styles.module.css'
import type { TourResponseDTO } from '../../../types/dtos'
import { Calendar, MapPin } from 'lucide-react'
import { formatPrettyDate } from '../../../utils/DateUtils'

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
                    <span className={styles.skelType}></span>
                    <div className={styles.skelDates}>
                        <span></span>
                        <span></span>
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
                    <p>{tour.group.name}</p>
                </div>
                <div className={styles.tags}>
                    <span className={styles.type}><MapPin />{`${tour.tour} tour`}</span>
                    <div className={styles.dates}>
                        <span><Calendar />{formatPrettyDate(tour.begin)}</span>
                        <span><Calendar />{formatPrettyDate(tour.end)}</span>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default TourProfile
