import { useParams } from 'react-router-dom'
import GoBack from '../../components/GoBack'
import styles from './styles.module.css'
import useShows from '../../hooks/ShowHook'
import ErrorPage from '../ErrorPage'
import { useEffect, useState } from 'react'
import ShowsSection from '../../components/ShowsSection'
import StatsSection from '../../components/StatsSection'
import Select from '../../components/Form/Select'
import TourProfile from '../../components/Artist/TourProfile'
import Switch from '../../components/Switch'

const ConcertPage = () => {

    const { id } = useParams();
    const { shows, allShows, tours, regions, getAllShowsByTourId, filterShowsByRegion, filterOnlyReportedShows, loading, apiError } = useShows()
    
    const [selectedRegion, setSelectedRegion] = useState("Worldwide")

    const handleRegionChange = async (value: string) => {
        setSelectedRegion(value)
        await filterShowsByRegion(value)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => { getAllShowsByTourId(Number(id)) }, [])
    
    if (apiError.isError) return <ErrorPage message={apiError.message} />

    if (loading) return (
        <div className={styles.container}>
            <div>
                <GoBack text='Back to tours' path='/tours' />
                <div className={styles.top}>
                    <TourProfile loading tour={tours[0]} />
                    <div className={styles.select}>
                        <div className={styles.switch}>
                            <label>Show Only Reported Shows</label>
                            <Switch disabled size='lg' />
                        </div>
                        <Select
                            label='overview' handleChange={handleRegionChange} disable value={selectedRegion}
                            options={regions.length === 0 ? [ { text: 'Worldwide', value: 'Worldwide' }, ] : regions}
                        />
                    </div>
                </div>
            </div>

            <StatsSection loading stats={tours[0]} />

            <ShowsSection
                loading
                heading='Shows'
                shows={shows}
            />

        </div>
    )

    return (
        <div className={styles.container}>
            <div>
                <GoBack text='Back to tours' path='/tours' />
                <div className={styles.top}>
                    <TourProfile tour={tours[0]} />
                    <div className={styles.select}>
                        <div className={styles.switch}>
                            <label>Show Only Reported Shows</label>
                            <Switch
                                size='lg'
                                onChange={ filterOnlyReportedShows }
                                disabled={ shows.filter(s => s.box_score !== null).length === 0 || allShows.filter(s => s.box_score === null).length === 0 }
                            />
                        </div>
                        <Select
                            label='overview'
                            options={regions}
                            value={selectedRegion}
                            handleChange={handleRegionChange}
                        />
                    </div>
                </div>
            </div>

            <StatsSection stats={tours[0]} allShows={allShows} />

            <ShowsSection
                heading='Shows'
                shows={shows}
            />

        </div>
    )

}

export default ConcertPage