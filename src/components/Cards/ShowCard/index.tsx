import { Calendar, MapPin, Users } from 'lucide-react'
import Tag from '../../Tag'
import { formatArrayOfDates } from '../../../utils/DateUtils'
import styles from './styles.module.css'
import { formatNumber, formatPercentage, formatUSD } from '../../../utils/NumberUtils'
import TooltipIcon from '../../TooltipIcon'

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
}

const ShowCards = ({ loading, tour = null, dates, venue, country, city, attendance, box, sold, shows }: Props) => {

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
                        <TooltipIcon text='Reported by Touring Data' className={styles.tooltip} />
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

                <div className={styles.card}>
                    <p>Attendance</p>
                    <p>
                        <Users className={styles.icon} />
                        <span>{ attendance ? formatNumber(attendance) : 'Not Reported' }</span>
                    </p>
                </div>

                <div className={styles.card}>
                    <p>Sold</p>
                    <p>{ sold ? formatPercentage(sold) : 'Not Reported' }</p>
                </div>

                <div className={styles.card}>
                    <p>Box Score</p>
                    <p>{ box ? formatUSD(box) : 'Not Reported' }</p>
                </div>

                <div className={styles.card}>
                    <p>Avg Ticket</p>
                    <p>{ box && attendance ? formatUSD(box / attendance) : 'Not Reported' }</p>
                </div>

            </div>

        </div>
    )

}

export default ShowCards