import styles from './styles.module.css'
import IconCard from '../../components/Cards/IconCard';
import { Calendar, CircleDollarSign, Percent, Ticket, Users } from 'lucide-react';
import { formatNumber, formatPercentage, formatUSD } from '../../utils/NumberUtils';
import type { GroupsResponseDTO, StatsDTO, TourResponseDTO } from '../../types/dtos';
import type { Show } from '../../types/models';

interface Props {
    className?: string
    loading?: boolean
    stats: StatsDTO | TourResponseDTO | GroupsResponseDTO | null
    filteredShows?: Show[] | null
}

const StatsSection = ({ className, loading, stats, filteredShows = null }: Props) => {

    if (loading || !stats) return (
        <div className={styles.general}>
            { Array.from({ length: 6 }).map((_, i) => <IconCard key={i} loading />) }
        </div>
    )

    return (
        <div className={`${styles.general} ${className}`}>
            <IconCard heading='Avg Ticket Price' icon={<Ticket />} text={
                stats.avg_ticket ? formatUSD(stats.avg_ticket) : "Not Reported"
            } />

            <IconCard heading='Box Score' icon={<CircleDollarSign />} text={stats.box_score !== 0 ? formatUSD(stats.box_score) : 'Not Reported' } />

            <IconCard heading='Avg Box Score' icon={<CircleDollarSign />} text={
                stats.avg_box ? formatUSD(stats.avg_box) : "Not Reported"
            } />

            <IconCard heading='Net Attendance' icon={<Users />} text={
                stats.attendance ? formatNumber(stats.attendance) : "Not Reported"
            } />

            <IconCard heading='Avg Sold %' icon={<Percent />} text={
                stats.avg_sold ? formatPercentage(stats.avg_sold) : "Not Reported"
            } />

            <IconCard heading='Reported Shows' icon={<Calendar />} text={
                `${stats.reported_nights}/${filteredShows ? filteredShows.reduce((acc: number, s: Show) => { return acc + s.nights; }, 0) : stats.total_nights}`
            } />
            
        </div>
    )

}

export default StatsSection