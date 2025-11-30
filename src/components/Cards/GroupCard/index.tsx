import { Link } from "react-router-dom"
import styles from "./styles.module.css"
import type { Group } from "../../../types/models"
import { parseGen } from "../../../utils/StringUtils"
import ProfileImage from "../../ProfileImage"
import { ArrowUp, Building2, Circle, Mars, Venus } from "lucide-react"

interface Props {
  group?: Group
  loading?: boolean
}

const GroupCard = ({ loading = false, group }: Props) => {
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
    <Link to={`/groups/${group.id}`} className={styles.card}>
      <div className={styles.imageContainer}>
        <ProfileImage name={group.name} colors={group.colors} size={80} font={20}/>
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{group.name}</h3>
        <p className={styles.company}><Building2 className={styles.icon} />{group.company.name}</p>
        <div className={styles.tags}>
            <span className={styles.type}>
                {
                    group.gender === 'female' ? <Venus className={styles.icon} />
                    : group.gender === 'male' ? <Mars className={styles.icon} />
                        : <Circle className={styles.icon} />
                }
                { group.gender }
            </span>
            <span><ArrowUp className={styles.icon} />{parseGen(group.generation)}</span>
        </div>
      </div>
    </Link>
  )
}

export default GroupCard
