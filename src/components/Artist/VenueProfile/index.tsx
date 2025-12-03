
import styles from './styles.module.css'
import Tag from '../../Tag'
import type { Venue } from '../../../types/models'
import { MapPin } from 'lucide-react'

interface Props {
    loading?: boolean
    venue?: Venue | null
}

const VenueProfile = ({ loading, venue = null }: Props) => {

    if (loading || !venue) return (
        <span className={styles.heading}>
            <span className={styles.skelPfp}></span>

            <span className={styles.desc}>
                <div className={styles.skelInfo}>
                    <span className={styles.skelHeading}></span>
                </div>
                
                <div className={styles.tags}>
                    <Tag type='loading' text='' />
                    <Tag type='loading' text='' />
                </div>
            </span>

        </span>
    )

    return (
        <div className={styles.heading}>
            <div className={styles.pfp}>
                <div className={styles.pfpIcon}>
                    <MapPin className={styles.mappin} />
                </div>
            </div>
            <div className={styles.desc}>
                <h1>{venue.name}</h1>
                <div className={styles.tags}>
                    <p className={styles.place}>
                        <MapPin className={styles.icon} />
                        <span>{venue.city.country.name}, {venue.city.name}</span>
                    </p>
                </div>
            </div>
        </div>
    )

}

export default VenueProfile
