import { Calendar, MapPin, User } from "lucide-react"
import styles from "./styles.module.css"
import { Link } from "react-router-dom"
import type { Tour } from "../../../types/models"
import { formatPrettyDate } from "../../../utils/DateUtils"
import ProfileImage from "../../ProfileImage"

interface Props {
  loading?: boolean
  tour?: Tour
}

const ToursPageCard = ({ loading, tour }: Props) => {
  if (loading || tour === undefined)
    return (
      <div className={styles.skelCard}>
        <div className={styles.skelImage}></div>
        <div className={styles.skelContent}>
          <div className={styles.skelProfile}>
            <span className={styles.skelHeading}></span>
            <div className={styles.skelInfoItem}>
              <span className={styles.skelIcon}></span>
              <span className={styles.skelDate}></span>
            </div>
          </div>
          <div className={styles.skelInfo}>
            <div className={styles.skelInfoItem}>
              <span className={styles.skelIcon}></span>
              <span className={styles.skelDate}></span>
            </div>
            <div className={styles.skelInfoItem}>
              <span className={styles.skelIcon}></span>
              <span className={styles.skelTour}></span>
            </div>
          </div>
        </div>
      </div>
    )

  return (
    <Link to={`/tours/${tour.id}`} className={styles.card}>
      <div className={styles.imageContainer}>
        <ProfileImage name={tour.name} colors={tour.group.colors} size={80} font={20} />
      </div>
      <div className={styles.content}>
        <div className={styles.profile}>
          <h3 className={styles.tourName}>{tour.name}</h3>
          <div className={styles.infoItem}>
            <User className={styles.icon}/>
            <p className={styles.groupName}>{tour.group.name}</p>
          </div>
        </div>
        <div className={styles.info}>
          <div className={styles.infoItem}>
            <Calendar className={styles.icon} />
            <p>{formatPrettyDate(tour.begin)}</p>
          </div>
          <div className={styles.infoItem}>
            <MapPin className={styles.icon} />
            <p>{tour.tour} Tour</p>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default ToursPageCard
