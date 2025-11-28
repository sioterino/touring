import { MapPin } from 'lucide-react'
import Tag from '../../Tag'
import { formatArrayOfDates } from '../../utils/DateUtils'
import styles from './styles.module.css'
import { formatNumber, formatPercentage, formatUSD } from '../../utils/NumberUtils'

interface Props {
    tour: string,
    dates: string[]
    venue: string
    continent: string
    country: string
    city: string
    attendance: number
    box: number
    sold: number
    shows: number
}

const ShowCards = ({ tour, dates, venue, continent, country, city, attendance, box, sold, shows }: Props) => {

    return (
        <div className={styles.showCards}>
            <div className={styles.info}>
                <h3>{tour}</h3>
                <p className={styles.showDate}>{formatArrayOfDates(dates)}</p>
                <div className={styles.venue}>
                    <MapPin />
                    <p>{venue}</p>
                </div>
                <div className={styles.tags}>
                    <Tag text={continent} type='filled' />
                    <Tag text={country} />
                    { city !== country && <Tag text={city} /> }
                </div>
            </div>
            <div className={styles.report}>

                <p>{formatUSD(box)}</p>
                <p>{`${formatNumber(attendance)} (${formatPercentage(sold)})`}</p>
                <p>{`${formatUSD(box / attendance)} per ticket`}</p>
                <p>{shows} {shows === 1 ? 'show' : 'shows'}</p>

            </div>
        </div>
    )

}

export default ShowCards