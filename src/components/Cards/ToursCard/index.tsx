import { Link } from "react-router-dom"
import { Calendar, Users, Ticket, CircleDollarSign, CalendarArrowDown, CalendarArrowUp } from "lucide-react"
import styles from "./styles.module.css"
import Tag from "../../Tag"
import { formatPrettyDate } from "../../../utils/DateUtils"
import { formatNumber, formatPercentage, formatUSD } from "../../../utils/NumberUtils"

interface Props {
  loading?: boolean
  id: number
  name: string
  level: string
  continents: string[]
  start: string
  end: string
  total: number
  reported: number
  attendance: number
  box: number
  sold: number
  price: number
}

const TourCard = ({ loading, id, name, level, continents, start, end, total, reported, attendance, box, sold, price, }: Props) => {
  if (loading)
    return (
      <div className={styles.loadingCard}>
        <div className={styles.loadingHeader}>
          <div className={styles.loadingTitle} />
          <div className={styles.loadingTags}>
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className={styles.loadingTag} />
            ))}
          </div>
        </div>

        <div className={styles.loadingGrid}>
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className={styles.loadingItem}>
              <div className={styles.loadingLabel} />
              <div className={styles.loadingValue} />
            </div>
          ))}
        </div>
      </div>
    )

  return (
    <Link to={`/tours/${id}`} className={styles.card}>
      {/* Header */}
      <div className={styles.header}>
        <h3 className={styles.title}>{name}</h3>

        <div className={styles.tags}>
          <Tag text={`${level} Tour`} type="filled" />
          {continents
            .sort()
            .slice(0, 2)
            .map((c, i) => (
              <Tag text={c} key={i} />
            ))}
          {continents.length > 2 && <Tag text="..." />}
        </div>
      </div>

      <div className={styles.grid}>
        <div className={styles.stat}>
          <div className={styles.label}>
            <CalendarArrowUp className={styles.icon} />
            <span>Start Date</span>
          </div>
          <p className={styles.value}>{formatPrettyDate(start)}</p>
        </div>

        <div className={styles.stat}>
          <div className={styles.label}>
            <CalendarArrowDown className={styles.icon} />
            <span>End Date</span>
          </div>
          <p className={styles.value}>{formatPrettyDate(end)}</p>
        </div>

        <div className={styles.stat}>
          <div className={styles.label}>
            <Calendar className={styles.icon} />
            <span>Reported Shows</span>
          </div>
          <p className={styles.value}>{`${reported}/${total}`}</p>
        </div>

        <div className={styles.stat}>
          <div className={styles.label}>
            <Users className={styles.icon} />
            <span>Attendance</span>
          </div>
          <p className={styles.value}>
            {formatNumber(attendance)}
            {sold > 0 && <span className={styles.subValue}>({formatPercentage(sold)})</span>}
          </p>
        </div>

        <div className={styles.stat}>
          <div className={styles.label}>
            <CircleDollarSign className={styles.icon} />
            <span>Box Score</span>
          </div>
          <p className={styles.value}>{formatUSD(box)}</p>
        </div>

        <div className={styles.stat}>
          <div className={styles.label}>
            <Ticket className={styles.icon} />
            <span>Avg Price</span>
          </div>
          <p className={styles.value}>{formatUSD(price)}</p>
        </div>
      </div>
    </Link>
  )
}

export default TourCard
