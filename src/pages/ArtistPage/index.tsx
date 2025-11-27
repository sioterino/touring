import { useEffect } from 'react'
import useGroups from '../../hooks/GroupHook'
import { useParams } from 'react-router-dom';
import styles from './styles.module.css'
import Tag from '../../components/Tag';
import ProfileImage from '../../components/ProfileImage';
import GoBack from '../../components/GoBack';
import IconCard from '../../components/Cards/IconCard';
import { Calendar, CircleDollarSign, Percent, Ticket, Users } from 'lucide-react';
import TourCard from '../../components/Cards/ToursCard';
import { formatNumber, formatPercentage, formatUSD } from '../../components/utils/NumberUtils';
import ShowCards from '../../components/Cards/ShowCard';

const ArtistPage = () => {

    const { id } = useParams();
    const { group, getGroupById, loading, apiError } = useGroups()

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => { getGroupById(Number(id)) }, [])

    if (loading) return null
    if (apiError.isError) return <p>error</p>

    let gen
    switch(group.generation) {
        case 1: gen = '1st Gen'; break;
        case 2: gen = '2nd Gen'; break;
        case 3: gen = '3rd Gen'; break;
        default: gen = `${group.generation}th  Gen`
    }

    const mock = {
        att: 420870, box: 120750600, reported: 90, total: 120, sold: 0.9285
    }

    const mockTour = {
        name:'SYNK: Hyper Line', level:'world', continents:['Asia', 'Europa', 'North America', 'South America', 'Oceania'], start:'2018-06-28', end:'2019-11-02', shows:34, attendance:480560, box:80574723,
    }

    const mockShow = {
        tour: 'SYNK: Hyper Line', dates: ['2019-12-25', '2019-12-26'], venue: 'Tokyo Dome', continent: 'Asia', country: 'Japan', city: 'Tokyo', attendance: 93000, box: 7400000, sold: 1,
    }

    return (
        <div className={styles.artist}>

            <div>
                <GoBack text='Back to groups' path='/groups' />
                <div className={styles.heading}>
                    <div className={styles.pfp}>
                        <ProfileImage name={group.name} colors={group.colors} size={90} font={32} />
                    </div>
                    <div className={styles.desc}>
                        <h1>{group.name}</h1>
                        <div className={styles.tags}>
                            <Tag text={group.gender} type='filled' />
                            <Tag text={gen} />
                            <Tag text={group.company.name} />
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.general}>
                <IconCard heading='Avg Ticket Price' icon={ <Ticket /> } text={formatUSD(mock.box / mock.att)} />
                <IconCard heading='Box Score' icon={ <CircleDollarSign /> } text={formatUSD(mock.box)} />
                <IconCard heading='Avg Box Score' icon={ <CircleDollarSign /> } text={formatUSD(mock.box / mock.reported)} />
                <IconCard heading='Net Attendance' icon={ <Users /> } text={formatNumber(mock.att)} />
                <IconCard heading='Avg Sold %' icon={ <Percent /> } text={formatPercentage(mock.sold)} />
                <IconCard heading='Reported Shows' icon={ <Calendar /> } text={`${mock.reported}/${mock.total}`} />
            </div>

            <div className={styles.tours}>
                <h2>Tours</h2>
                <p className={styles.hint}>Slide left two see all tours available</p>
                <div className={styles.tourCards}>
                    <div className={styles.slider}>
                        {
                            Array.from({ length: 4 }).map((_, i) => (
                                <TourCard
                                    key={i}
                                    name={mockTour.name}
                                    level={mockTour.level}
                                    continents={mockTour.continents}
                                    start={mockTour.start}
                                    end={mockTour.end}
                                    shows={mockTour.shows}
                                    attendance={mockTour.attendance}
                                    box={mockTour.box}
                                />
                            ))
                        }
                    </div>
                </div>
            </div>

            <div className={styles.recent}>
                <h2>Recent Shows</h2>
                <p className={styles.hint}>Most recent reported shows</p>
                <div className={styles.shows}>
                    {
                        Array.from({length: 5}).map((_, i) => (
                            <ShowCards
                                key={i}
                                tour={mockShow.tour}
                                dates={mockShow.dates}
                                venue={mockShow.venue}
                                continent={mockShow.continent}
                                country={mockShow.country}
                                city={mockShow.city}
                                box={formatUSD(mockShow.box)}
                                attendance={formatNumber(mockShow.attendance)}
                                sold={formatPercentage(mockShow.sold)}
                            />
                        ))
                    }
                </div>
            </div>

        </div>
    )

}

export default ArtistPage
