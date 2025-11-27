import Tag from '../../Tag'
import { formatArrayOfDates } from '../../utils/DateUtils'
import styles from './styles.module.css'

interface Props {
    tour: string,
    dates: string[]
    venue: string
    continent: string
    country: string
    city: string
    attendance: string
    box: string
    sold: string
}

const ShowCards = ({ tour, dates, venue, continent, country, city, attendance, box, sold }: Props) => {

    return (
        <div className={styles.showCards}>
            <div className={styles.info}>
                <h3>{tour}</h3>
                <p>{formatArrayOfDates(dates)}</p>
                <div className={styles.tags}>
                    <Tag text={continent} type='filled' />
                    <Tag text={country} />
                    { city !== country && <Tag text={city} /> }
                </div>
            </div>
            <div className={styles.report}>

            </div>
        </div>
    )

}

export default ShowCards