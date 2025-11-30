import styles from './styles.module.css'
import IconCard from '../../components/Cards/IconCard';
import { Calendar, CircleDollarSign, Percent, Ticket, Users } from 'lucide-react';
import { formatNumber, formatPercentage, formatUSD } from '../../utils/NumberUtils';
import type { GroupsResponseDTO } from '../../types/dtos';

interface Props {
    className?: string
    loading?: boolean
    group: GroupsResponseDTO | null
}

const StatsSection = ({ className, loading, group }: Props) => {

    if (loading || !group) return (
        <div className={styles.general}>
            { Array.from({ length: 6 }).map((_, i) => <IconCard key={i} loading />) }
        </div>
    )

    return (
        <div className={`${styles.general} ${className}`}>
            <IconCard heading='Avg Ticket Price' icon={ <Ticket /> } text={formatUSD(group.avg_ticket)} />
            <IconCard heading='Box Score' icon={ <CircleDollarSign /> } text={formatUSD(group.box_score)} />
            <IconCard heading='Avg Box Score' icon={ <CircleDollarSign /> } text={formatUSD(group.avg_box)} />
            <IconCard heading='Net Attendance' icon={ <Users /> } text={formatNumber(group.net_att)} />
            <IconCard heading='Avg Sold %' icon={ <Percent /> } text={formatPercentage(group.avg_sold) === '0.00%' ? 'Not Reported' : formatPercentage(group.avg_sold)} />
            <IconCard heading='Reported Shows' icon={ <Calendar /> } text={`${group.reported_nights}/${group.total_nights}`} />
        </div>
    )

}

export default StatsSection