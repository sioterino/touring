import Tag from '../../Tag'
import { formatPrettyDate } from '../../utils/DateUtils'
import { formatNumber, formatUSD } from '../../utils/NumberUtils'
import styles from './styles.module.css'

interface Props {
    name: string
    level: string
    continents: string[]
    start: string
    end: string
    shows: number
    attendance: number
    box: number
}

const TourCard = ({ name, level, continents, start, end, shows, attendance, box }: Props) => {

    return (
        <div className={styles.tourCard}>
            
            <div className={styles.header}>
                <h3>{name}</h3>
                <div className={styles.tags}>
                    <Tag text={`${level} Tour`} type='filled' />
                    { continents.slice(0,3).map((c, i) => (<Tag text={c} key={i} />)) }
                </div>
            </div>

            <table>
                <tbody>
                    <tr><td>Begin Date</td><td>{formatPrettyDate(start)}</td></tr>
                    <tr><td>End Date</td><td>{formatPrettyDate(end)}</td></tr>
                    <tr><td>Shows</td><td>{shows}</td></tr>
                    <tr><td>Attendance</td><td>{formatNumber(attendance)}</td></tr>
                    <tr><td>Box Socre</td><td>{formatUSD(box)}</td></tr>
                </tbody>
            </table>
        </div>
    )

}

export default TourCard