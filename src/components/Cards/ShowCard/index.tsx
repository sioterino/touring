import { Calendar, CircleDollarSign, MapPin, Percent, Ticket, Users } from 'lucide-react'
import Tag from '../../Tag'
import { formatArrayOfDates } from '../../../utils/DateUtils'
import styles from './styles.module.css'
import { formatNumber, formatPercentage, formatUSD } from '../../../utils/NumberUtils'
import TooltipIcon from '../../TooltipIcon'
import type { Reported } from '../../../types/models'

interface Props {
    loading?: boolean
    tour?: string | null
    dates: string[]
    venue: string
    continent: string
    country: string
    city: string
    attendance: number | null
    box: number | null
    sold: number | null
    shows: number
    reported: Reported
}

const ShowCards = ({ loading, tour = null, dates, venue, country, city, attendance, box, sold, shows, reported }: Props) => {

    if (loading) {
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
                        <h3>{ tour? tour : venue }</h3>
                        { reported && <TooltipIcon text={`Reported by ${reported}`} className={styles.tooltip} /> }
                    </div>
                    <div className={styles.tags}>
                        <Tag text={country} type='filled'/>
                        <Tag text={city} />
                    </div>
                    { tour && <div className={styles.venue}><MapPin className={styles.icon} /><p>{venue}</p></div> }
                </div>
                <p className={styles.showNights}>{`${shows} ${shows === 1 ? 'night' : 'nights'}`}</p>
            </div>

            <div className={styles.date}>
                <Calendar className={styles.icon} />
                <p>{ formatArrayOfDates(dates) }</p>
            </div>

            <div className={styles.data}>

                <div className={styles.stat}>
                    <div className={styles.label}>
                        <Users className={styles.icon} />
                        <span>Attendance</span>
                    </div>
                    <p className={styles.value}>{attendance ? formatNumber(attendance) : 'Not Reported'}</p>
                </div>

                <div className={styles.stat}>
                    <div className={styles.label}>
                        <Percent className={styles.icon} />
                        <span>Sold</span>
                    </div>
                    <p className={styles.value}>{sold ? formatPercentage(sold) : 'Not Reported'}</p>
                </div>

                <div className={styles.stat}>
                    <div className={styles.label}>
                        <CircleDollarSign className={styles.icon} />
                        <span>Box Score</span>
                    </div>
                    <p className={styles.value}>{box ? formatUSD(box) : 'Not Reported'}</p>
                </div>

                <div className={styles.stat}>
                    <div className={styles.label}>
                        <Ticket className={styles.icon} />
                        <span>Avg Price</span>
                    </div>
                    <p className={styles.value}>{attendance && box ? formatUSD(box / attendance) : 'Not Reported'}</p>
                </div>

            </div>

        </div>
    )

}

export default ShowCards