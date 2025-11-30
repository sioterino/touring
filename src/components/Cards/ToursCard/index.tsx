import { Link } from 'react-router-dom'
import Tag from '../../Tag'
import { formatPrettyDate } from '../../../utils/DateUtils'
import { formatNumber, formatPercentage, formatUSD } from '../../../utils/NumberUtils'
import styles from './styles.module.css'

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

const TourCard = ({ loading, id, name, level, continents, start, end, total, reported, attendance, box, sold, price }: Props) => {

    if (loading) return (
        <div className={styles.skelCard}>
            <div className={styles.header}>
                <span className={styles.skelHeading}></span>
                <div className={styles.tags}>{Array.from({ length: 3 }).map((_, i) => <Tag key={i} text='' type='loading' /> ) }</div>
            </div>

            <table>
                <tbody>
                    <tr><td></td><td></td></tr>
                    <tr><td></td><td></td></tr>
                    <tr><td></td><td></td></tr>
                    <tr><td></td><td></td></tr>
                    <tr><td></td><td></td></tr>
                    <tr><td></td><td></td></tr>
                </tbody>
            </table>
        </div>
    )

    return (
        <Link to={`/tours/${id}`} className={styles.tourCard}> 
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
                    <tr><td>Attendance</td><td>{`${formatNumber(attendance)} ${sold === 0 ? '' : `(${formatPercentage(sold)})`}`}</td></tr>
                    <tr><td>Box Socre</td><td>{formatUSD(box)}</td></tr>
                    <tr><td>Avg Price</td><td>{formatUSD(price)}</td></tr>
                </tbody>
            </table>
        </Link>
    )

}

export default TourCard