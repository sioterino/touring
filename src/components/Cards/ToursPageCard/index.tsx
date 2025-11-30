import { Calendar, MapPin } from 'lucide-react'
import type { Tour } from '../../../types/models'
import ProfileImage from '../../ProfileImage'
import styles from './styles.module.css'
import { formatPrettyDate } from '../../../utils/DateUtils'
import { Link } from 'react-router-dom'

interface Props {
    loading?: boolean
    tour?: Tour
}

const ToursPageCard = ({ loading, tour }: Props) => {
    
    if (loading || tour === undefined) return (
        <div className={styles.skelCard}>
            <div className={styles.header}>
                <span className={styles.skelPfp}></span>
                <div className={styles.profile}>
                    <span className={styles.skelHeading}></span>
                    <span className={styles.skelGroup}></span>
                </div>
            </div>

            <div className={styles.info}>
                <span>
                    <span className={styles.skelIcon}></span>
                    <span className={styles.skelDate}></span>
                </span>
                <span>
                    <span className={styles.skelIcon}></span>
                    <span className={styles.skelTour}></span>
                </span>
            </div>
        </div>
    )

    return (
        <Link to={`/tours/${tour.id}`} className={styles.card}>
            <div className={styles.header}>
                <ProfileImage name={tour.group.name} colors={tour.group.colors} />
                <div className={styles.profile}>
                    <h3>{tour.name}</h3>
                    <p>{tour.group.name}</p>
                </div>
            </div>

            <div className={styles.info}>
                <span>
                    <Calendar className={styles.icon} />
                    { formatPrettyDate(tour.begin) }
                </span>
                <span>
                    <MapPin className={styles.icon} />
                    { tour.tour } Tour
                </span>
            </div>
        </Link>
    )
}

export default ToursPageCard