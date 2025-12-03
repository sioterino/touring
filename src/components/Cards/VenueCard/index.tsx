import { Link } from "react-router-dom"
import styles from "./styles.module.css"
import type { Venue } from "../../../types/models"
import { MapPin, Users, Calendar } from "lucide-react"
import Tag from "../../Tag"

interface Props {
  venue?: Venue
  loading?: boolean
}

const VenueCard = ({ loading = false, venue }: Props) => {
  if (loading || !venue)
    return (
      <div className={styles.skeletonCard}>
        <div className={styles.skelImage}></div>
        <div className={styles.skelContent}>
          <div className={styles.skelTitle}></div>
          <div className={styles.skelTagRow}>
            <div className={styles.skelTag}></div>
            <div className={styles.skelTag}></div>
            <div className={styles.skelTag}></div>
          </div>
        </div>
      </div>
    )

  return (
    <Link to={`/venues/${venue.id}`} className={styles.card}>
      <div className={styles.imageContainer}>
        <MapPin className={ styles.mappin } />
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{venue.name}</h3>
        <div className={styles.tags}>
            <Tag text={ venue.city.country.continent.name } />
            <Tag text={ venue.city.country.name } />
            <Tag text={ venue.city.name } />
        </div>
        <div className={styles.info}>
          <span><Users />{venue.groups} Groups</span>
          <span><Calendar />{venue.shows} shows</span>
        </div>
      </div>
    </Link>
  )
}

export default VenueCard
