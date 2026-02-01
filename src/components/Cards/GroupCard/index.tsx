import { Link } from "react-router-dom"
import styles from "./styles.module.css"
import type { Group } from "../../../types/models"
import { parseGen } from "../../../utils/StringUtils"
import ProfileImage from "../../ProfileImage"
import { ArrowUp, Building2, Calendar, Circle, CircleOff, Mars, Users, Venus } from "lucide-react"
import Tag from "../../Tag"
import { formatNumber } from "../../../utils/NumberUtils"

interface Props {
  group?: Group
  loading?: boolean
  page?: 'group' | 'venue'
  nights?: number
  attendance?: number
}

const GroupCard = ({ loading = false, group, page = 'group', nights, attendance }: Props) => {

  if (loading || group === undefined)
    return (
      <div className={styles.skeletonCard}>
        <div className={styles.skelImage}></div>
        <div className={styles.skelContent}>
          <div className={styles.skelTitle}></div>
          <div className={styles.skelSubtitle}></div>
          <div className={styles.skelTagRow}>
            <div className={styles.skelTag}></div>
            <div className={styles.skelTag}></div>
          </div>
        </div>
      </div>
    )

  return (
    <Link to={`/groups/${group.id}`} className={`${styles.card} ${ page === 'venue' && styles.venueTouring }`}>
      <div className={styles.imageContainer}>
        <ProfileImage name={group.name} colors={group.colors} size={80} font={20}/>
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{group.name}</h3>
        <p className={styles.company}><Building2 className={styles.icon} />{group.company.name}</p>
        <div className={styles.tags}>
        {
          page === 'group'
          ? <>
              <Tag type="filled" text={ group.gender } icon={
                group.gender === 'female' ? <Venus className={styles.icon} />
                : group.gender === 'male' ? <Mars className={styles.icon} />
                    : <Circle className={styles.icon} />              
              }  />
              
              <Tag text={ parseGen(group.generation) } icon={ <ArrowUp/> }  />
            </>
            : attendance === 0 && nights === 0 ? <Tag text='Not reported' icon={<CircleOff />} />
              : <>
                <Tag icon={<Calendar />} text={`${nights} ${ nights !== 1 ? 'nights' : 'night' }`} />
                <Tag icon={<Users />} text={`${formatNumber(attendance!)} attendance`} />
              </>
          }
          </div>
        
      </div>
    </Link>
  )
}

export default GroupCard