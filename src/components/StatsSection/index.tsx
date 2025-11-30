import styles from './styles.module.css'
import IconCard from '../../components/Cards/IconCard';
import { Calendar, CircleDollarSign, Percent, Ticket, Users } from 'lucide-react';
import { formatNumber, formatPercentage, formatUSD } from '../../utils/NumberUtils';
import type { GroupsResponseDTO, TourResponseDTO } from '../../types/dtos';

interface Props {
    className?: string
    loading?: boolean
    data: GroupsResponseDTO | TourResponseDTO | null
}

interface Stats {
    avgTicket: number | null
    boxScore: number
    avgBoxScore: number | null
    netAttendance: number | null
    avgSold: number | null
    reportedNights: number
    totalNights: number
}

const parseData = (data: GroupsResponseDTO | TourResponseDTO): Stats => {
    // Case: TourResponseDTO
    if ("tour" in data) {
        // Tours do not have avg_ticket, avg_box, avg_sold, net_att
        // You can compute some if wanted, but here we normalize safely:
        return {
            avgTicket: data.sum_venues ? data.sum_price / data.sum_venues : null,
            boxScore: data.box_score,

            avgBoxScore: data.sum_venues ? data.box_score / data.sum_venues : null,

            netAttendance: data.attendance ?? null,

            avgSold: data.sum_venues ? data.sum_sold / data.sum_venues : null,

            reportedNights: data.reported_nights,
            totalNights: data.total_nights,
        }
    }

    // Case: GroupsResponseDTO
    return {
        avgTicket: data.avg_ticket,
        boxScore: data.box_score,
        avgBoxScore: data.avg_box,
        netAttendance: data.net_att,
        avgSold: data.avg_sold,
        reportedNights: data.reported_nights,
        totalNights: data.total_nights,
    }
}


const StatsSection = ({ className, loading, data }: Props) => {

    if (loading || !data) return (
        <div className={styles.general}>
            { Array.from({ length: 6 }).map((_, i) => <IconCard key={i} loading />) }
        </div>
    )

    const stats = parseData(data)

    return (
        <div className={`${styles.general} ${className}`}>
            <IconCard heading='Avg Ticket Price' icon={<Ticket />} text={
                stats.avgTicket ? formatUSD(stats.avgTicket) : "Not Reported"
            } />

            <IconCard heading='Box Score' icon={<CircleDollarSign />} text={formatUSD(stats.boxScore)} />

            <IconCard heading='Avg Box Score' icon={<CircleDollarSign />} text={
                stats.avgBoxScore ? formatUSD(stats.avgBoxScore) : "Not Reported"
            } />

            <IconCard heading='Net Attendance' icon={<Users />} text={
                stats.netAttendance ? formatNumber(stats.netAttendance) : "Not Reported"
            } />

            <IconCard heading='Avg Sold %' icon={<Percent />} text={
                stats.avgSold ? formatPercentage(stats.avgSold) : "Not Reported"
            } />

            <IconCard heading='Reported Shows' icon={<Calendar />} text={
                `${stats.reportedNights}/${stats.totalNights}`
            } />
        </div>
    )

}

export default StatsSection