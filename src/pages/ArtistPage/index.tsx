import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import styles from './styles.module.css'
import GoBack from '../../components/GoBack';
import TourCard from '../../components/Cards/ToursCard';
import Slide from '../../components/Slide';
import useShows from '../../hooks/ShowHook';
import ErrorPage from '../ErrorPage';
import Select from '../../components/Form/Select';
import ArtistProfile from '../../components/Artist/ArtistProfile';
import StatsSection from '../../components/StatsSection';
import ShowsSection from '../../components/ShowsSection';

    const ArtistPage = () => {

        const { id } = useParams();
        const { group, tours, shows, regions, getAllShowsByGroupId, filterShowsByRegion, loading, apiError } = useShows()

        const [selectedRegion, setSelectedRegion] = useState("Worldwide")

        useEffect(() => {
            getAllShowsByGroupId(Number(id))
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [])

        const handleRegionChange = async (value: string) => {
            console.log('value: ', value)
            setSelectedRegion(value)
            await filterShowsByRegion(value, 'region')
        }

        if (apiError.isError) return <ErrorPage message={apiError.message} />

        if (loading || group === null)
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

                    <StatsSection loading stats={group} />

                    <Slide
                        loading
                        heading='Tours'
                        hint
                        children={
                            Array.from({ length: 4 }).map((_, i) => (
                                <TourCard loading key={ i } />
                            ))
                        }
                    />

                    <ShowsSection
                        loading
                        page='group'
                        heading='Recent Shows'
                        desc='Latest updated performances'
                    />

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

                <StatsSection stats={group} />

                <Slide
                    heading='Tours'
                    hint
                    children={
                        tours
                        .filter(t => t.attendance !== 0)
                        .map((t, key) =>  <TourCard key={ key } tour={ t } /> )
                    }
                />

                <ShowsSection
                    heading='Recent Shows'
                    desc='Latest updated performances'
                    shows={ shows.filter(s => s.box_score !== null).slice(0, 6) }
                    page='group'
                />

            </div>
        )

    }

    export default ArtistPage
