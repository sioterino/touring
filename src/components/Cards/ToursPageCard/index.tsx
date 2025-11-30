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
                <div className={styles.pfp}>
                    <ProfileImage name={tour.name} colors={tour.group.colors} />
                </div>
                <div className={styles.profile}>
                    <h3>{tour.name}</h3>
                    <p>{tour.group.name}</p>
                </div>
            </div>

            <div className={styles.info}>
                <span>
                    <Calendar className={styles.icon} />
                    <p>{ formatPrettyDate(tour.begin) }</p>
                </span>
                <span>
                    <MapPin className={styles.icon} />
                    <p>{ tour.tour } Tour</p>
                </span>
            </div>
        </Link>
    )
}

export default ToursPageCard