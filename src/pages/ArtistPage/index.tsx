import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import styles from './styles.module.css'
import GoBack from '../../components/GoBack';
import TourCard from '../../components/Cards/ToursCard';
import ShowCards from '../../components/Cards/ShowCard';
import Slide from '../../components/Slide';
import useShows from '../../hooks/ShowHook';
import ErrorPage from '../ErrorPage';
import type { Show } from '../../types/models';
import Select from '../../components/Form/Select';
import ArtistProfile from '../../components/Artist/ArtistProfile';
import StatsSection from '../../components/StatsSection';

    const ArtistPage = () => {

        const { id } = useParams();
        const { group, tours, shows, regions, getAllShowsByGroupId, filterShowsByRegion, loading, apiError } = useShows()

        const [selectedRegion, setSelectedRegion] = useState("Worldwide")

        useEffect(() => {
            getAllShowsByGroupId(Number(id))
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [])

        const handleRegionChange = async (value: string) => {
            setSelectedRegion(value)
            await filterShowsByRegion(value)
        }

        if (apiError.isError) return <ErrorPage message={apiError.message} />

        if ( loading || group === null)
            return (
                <div className={styles.artist}>
                    <div>
                        <GoBack text='Back to groups' path='/groups' />
                        <div className={styles.top}>
                            <ArtistProfile loading />
                            <div className={styles.select}>
                                <Select
                                    label='overview' handleChange={handleRegionChange} disable value={selectedRegion}
                                    options={regions.length === 0 ? [ { text: 'Worldwide', value: 'Worldwide' }, ] : regions}
                                />
                            </div>
                        </div>
                    </div>

                    <StatsSection loading group={group} />

                    <Slide
                        heading='Tours'
                        hint
                        children={
                            Array.from({ length: 4 }).map((_, i) => (
                                <TourCard loading key={i} id={0} name={''} level={''} continents={[]} start={''} end={''} reported={0} total={0} attendance={0} box={0} sold={0} price={0} />
                            ))
                        }
                    />

                    <div className={styles.recent}>
                        <h2>Recent Shows</h2>
                        <p className={styles.hint}>Most recent reported shows</p>
                        <div className={styles.shows}>
                            {
                                Array.from({ length: 5 }).map((_, i) => (
                                    <ShowCards loading key={i} tour={''} dates={[]} venue={''} continent={''} country={''} city={''} box={0} attendance={0} sold={0} shows={0} />
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
                        <ArtistProfile group={group} />
                        <div className={styles.select}>
                            <Select
                                label='overview'
                                options={regions}
                                value={selectedRegion}
                                handleChange={handleRegionChange}
                            />
                        </div>
                    </div>
                </div>

                <StatsSection group={group} />

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
