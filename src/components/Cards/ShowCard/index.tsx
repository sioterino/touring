import { Calendar, CircleDollarSign, MapPin, Percent, Ticket, Users } from 'lucide-react'
import Tag from '../../Tag'
import { formatArrayOfDates } from '../../../utils/DateUtils'
import styles from './styles.module.css'
import { formatNumber, formatPercentage, formatUSD } from '../../../utils/NumberUtils'
import TooltipIcon from '../../TooltipIcon'
import type { Show } from '../../../types/models'
import { Link } from 'react-router-dom'

interface Props {
    loading?: boolean
    page?: 'group' | 'tour' | 'venue'
    show?: Show
}

const ShowCards = ({ loading, page = 'group', show }: Props) => {

    if (loading || !show) {
        return (
            <div className={styles.skelContainer}>
                <div className={styles.header}>
                    <div className={styles.headerRight}>
                        <div className={styles.skelTitle}></div>
                        <div className={styles.skelTagRow}>
                            <div className={styles.skelTag}></div>
                            <div className={styles.skelTag}></div>
                        </div>
                    </div>
                    <div className={styles.skelTag}></div>
                </div>

                <div className={styles.date}>
                    <div className={styles.skelIcon}></div>
                    <div className={styles.skelLineShort}></div>
                </div>

                <div className={styles.data}>
                    <div className={styles.cardSkel}>
                        <div className={styles.skelLine}></div>
                        <div className={styles.skelLineShort}></div>
                    </div>
                    <div className={styles.cardSkel}>
                        <div className={styles.skelLine}></div>
                        <div className={styles.skelLineShort}></div>
                    </div>
                    <div className={styles.cardSkel}>
                        <div className={styles.skelLine}></div>
                        <div className={styles.skelLineShort}></div>
                    </div>
                    <div className={styles.cardSkel}>
                        <div className={styles.skelLine}></div>
                        <div className={styles.skelLineShort}></div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className={styles.container}>

            <div className={styles.header}>
                <div className={styles.headerRight}>
                    <div className={styles.heading}>
                        {page !== 'tour' ? <h3>{show.tour.name}</h3> : <Link to={`/venues/${show.venue.id}`}><h3>{show.venue.name}</h3> </Link> }
                        { show.reported && <TooltipIcon text={`Reported by ${show.reported}`} className={styles.tooltip} /> }
                    </div>
                    { page === 'venue' && <Link to={`/groups/${show.group.id}`} className={styles.venue}><Users className={styles.icon} /><p>{show.group.name}</p></Link> }
                    { page !== 'venue' &&
                        <div className={styles.tags}>
                            <Tag text={show.venue.city.country.name} type='filled'/>
                            <Tag text={show.venue.city.name} />
                        </div>
                    }
                    { page !== 'tour' && <Link to={`/venues/${show.venue.id}`} className={styles.venue}><MapPin className={styles.icon} /><p>{show.venue.name}</p></Link> }

                </div>
                <p className={styles.showNights}>{`${show.nights} ${show.nights === 1 ? 'night' : 'nights'}`}</p>
            </div>

            <div className={styles.date}>
                <Calendar className={styles.icon} />
                <p>{ formatArrayOfDates(
                    [ show.day_1, show.day_2, show.day_3, show.day_4, show.day_5 ].filter(Boolean) as string[]
                ) }</p>
            </div>

            <div className={styles.data}>

                <div className={styles.stat}>
                    <div className={styles.label}>
                        <Users className={styles.icon} />
                        <span>Attendance</span>
                    </div>
                    <p className={styles.value}>{show.attendance ? formatNumber(show.attendance) : 'Not Reported'}</p>
                </div>

                <div className={styles.stat}>
                    <div className={styles.label}>
                        <Percent className={styles.icon} />
                        <span>Sold</span>
                    </div>
                    <p className={styles.value}>{show.sold_percentage ? formatPercentage(show.sold_percentage) : 'Not Reported'}</p>
                </div>

                <div className={styles.stat}>
                    <div className={styles.label}>
                        <CircleDollarSign className={styles.icon} />
                        <span>Box Score</span>
                    </div>
                    <p className={styles.value}>{show.box_score ? formatUSD(show.box_score) : 'Not Reported'}</p>
                </div>

                <div className={styles.stat}>
                    <div className={styles.label}>
                        <Ticket className={styles.icon} />
                        <span>Avg Price</span>
                    </div>
                    <p className={styles.value}>{show.attendance && show.box_score ? formatUSD(show.box_score / show.attendance) : 'Not Reported'}</p>
                </div>

            </div>

        </div>
    )

}

export default ShowCards