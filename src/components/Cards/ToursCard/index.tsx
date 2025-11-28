import Tag from '../../Tag'
import { formatPrettyDate } from '../../utils/DateUtils'
import { formatNumber, formatPercentage, formatUSD } from '../../utils/NumberUtils'
import styles from './styles.module.css'

interface Props {
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

const TourCard = ({ name, level, continents, start, end, total, reported, attendance, box, sold, price }: Props) => {

    return (
        <div className={styles.tourCard}>
            
            <div className={styles.header}>
                <h3>{name}</h3>
                <div className={styles.tags}>
                    <Tag text={`${level} Tour`} type='filled' />
                    { continents.slice(0, 2).map((c, i) => (<Tag text={c} key={i} />)) }
                    { continents.length > 2 && <Tag text='...' /> }
                </div>
            </div>

            <table>
                <tbody>
                    <tr><td>Begin Date</td><td>{formatPrettyDate(start)}</td></tr>
                    <tr><td>End Date</td><td>{formatPrettyDate(end)}</td></tr>
                    <tr><td>Shows</td><td>{`${reported}/${total}`}</td></tr>
                    <tr><td>Attendance</td><td>{`${formatNumber(attendance)} (${formatPercentage(sold)})`}</td></tr>
                    <tr><td>Box Socre</td><td>{formatUSD(box)}</td></tr>
                    <tr><td>Avg Price</td><td>{formatUSD(price)}</td></tr>
                </tbody>
            </table>
        </div>
    )

}

export default TourCard