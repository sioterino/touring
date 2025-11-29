import { useEffect } from 'react'
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
import Slide from '../../components/Slide';
import useShows from '../../hooks/ShowHook';
import ErrorPage from '../ErrorPage';
import type { Show } from '../../types/models';
import { parseGen } from '../../components/utils/StringUtils';
import Select from '../../components/Form/Select';

const ArtistPage = () => {

    const { id } = useParams();
    const { group, tours, shows, regions, getAllShowsByGroupId, filterShowsByRegion, loading, apiError } = useShows()

    useEffect(() => {
        getAllShowsByGroupId(Number(id))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (apiError.isError) return <ErrorPage message={apiError.message} />

    if ( loading || group === null)
        return (
            <div className={styles.artist}>

                <div>
                    <GoBack text='Back to groups' path='/groups' />
                    <div className={styles.top}>
                        <span className={styles.heading}>
                            <span className={styles.skelPfp}></span>
                            <span className={styles.desc}>
                                <span className={styles.skelHeading}></span>
                                <div className={styles.skelTags}>
                                    { Array.from({ length: 3 }).map((_, i) => <Tag key={i} type='loading' text='' /> ) }
                                </div>
                            </span>
                        </span>
                        <div className={styles.select}>
                            <Select
                                label='overview'
                                options={[ { text: 'Worldwide', value: 'Worldwide' }, ]}
                                handleChange={async () => console.log()}
                                disable
                            />
                        </div>
                    </div>
                </div>

                <div className={styles.general}>
                    { Array.from({ length: 6 }).map((_, i) => <IconCard key={i} loading />) }
                </div>

                <Slide
                    heading='Tours'
                    hint
                    children={
                        Array.from({ length: 4 }).map((_, i) => (
                            <TourCard
                                loading key={i} id={0} name={''} level={''} continents={[]} start={''}
                                end={''} reported={0} total={0} attendance={0} box={0} sold={0} price={0}
                            />
                        ))
                    }
                />

                <div className={styles.recent}>
                    <h2>Recent Shows</h2>
                    <p className={styles.hint}>Most recent reported shows</p>
                    <div className={styles.shows}>
                        {
                            Array.from({ length: 5 }).map((_, i) => (
                                <ShowCards
                                    loading key={i} tour={''} dates={[]} venue={''} continent={''}
                                    country={''} city={''} box={0} attendance={0} sold={0} shows={0}
                                />
                            ))
                        }
                    </div>
                </div>

            </div>
    )

    return (
        <div className={styles.artist}>
            <div>
                <GoBack text='Back to groups' path='/groups' />
                <div className={styles.top}>
                    <div className={styles.heading}>
                        <div className={styles.pfp}>
                            <ProfileImage name={group.name} colors={group.colors} size={90} font={32} />
                        </div>
                        <div className={styles.desc}>
                            <h1>{group.name}</h1>
                            <div className={styles.tags}>
                                <Tag text={group.gender} type='filled' />
                                <Tag text={parseGen(group.generation)} />
                                { group.company.parent_company && <Tag text={Array.isArray(group.company.parent_company) ? group.company.parent_company[0].name : group.company.parent_company.name} /> }
                                <Tag text={group.company.name} />
                            </div>
                        </div>
                    </div>
                    <div className={styles.select}>
                        <Select
                            label='overview'
                            options={regions.map(r => ({ text: r, value: r }))}
                            handleChange={filterShowsByRegion}
                        />
                    </div>
                </div>
            </div>

            <div className={styles.general}>
                <IconCard heading='Avg Ticket Price' icon={ <Ticket /> } text={formatUSD(group.avg_ticket)} />
                <IconCard heading='Box Score' icon={ <CircleDollarSign /> } text={formatUSD(group.box_score)} />
                <IconCard heading='Avg Box Score' icon={ <CircleDollarSign /> } text={formatUSD(group.avg_box)} />
                <IconCard heading='Net Attendance' icon={ <Users /> } text={formatNumber(group.net_att)} />
                <IconCard heading='Avg Sold %' icon={ <Percent /> } text={formatPercentage(group.avg_sold) === '0.00%' ? 'Not Reported' : formatPercentage(group.avg_sold)} />
                <IconCard heading='Reported Shows' icon={ <Calendar /> } text={`${group.reported_nights}/${group.total_nights}`} />
            </div>

            <Slide
                heading='Tours'
                hint
                children={
                    tours
                    .filter(t => t.box_score !== 0)
                    .sort((a, b) => {
                        return new Date(b.begin).getTime() - new Date(a.begin).getTime()
                    })
                    .map((t, key) => (
                        <TourCard
                            key={key}
                            id={t.id}
                            name={t.name}
                            level={t.tour}
                            continents={t.continents}
                            start={t.begin}
                            end={t.end}
                            reported={t.reported_nights}
                            total={t.total_nights}
                            attendance={t.attendance}
                            box={t.box_score}
                            sold={t.sum_sold / t.sum_venues}
                            price={t.sum_price / t.sum_venues}
                        />
                    ))
                }
            />

            <div className={styles.recent}>
                <h2>Recent Shows</h2>
                <p className={styles.hint}>Most recent reported shows</p>
                <div className={styles.shows}>
                    {
                        shows
                            .filter(s => s.box_score !== null)
                            .sort((a, b) => {
                                return new Date(b.day_1).getTime() - new Date(a.day_1).getTime()
                            })
                            .slice(0, 5)
                            .map((s: Show, key) => (
                            <ShowCards
                                key={key}
                                tour={s.tour.name}
                                dates={[ s.day_1, s.day_2, s.day_3, s.day_4, s.day_5 ].filter(Boolean) as string[]}
                                venue={s.venue.name}
                                continent={s.venue.city.country.continent.name}
                                country={s.venue.city.country.name}
                                city={s.venue.city.name}
                                box={s.box_score!}
                                attendance={s.attendance!}
                                sold={s.sold_percentage!}
                                shows={s.nights}
                            />
                        ))
                    }
                </div>
            </div>

        </div>
    )

}

export default ArtistPage
