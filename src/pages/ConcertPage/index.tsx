import { useParams, useSearchParams } from 'react-router-dom'
import GoBack from '../../components/GoBack'
import styles from './styles.module.css'
import useShows from '../../hooks/ShowHook'
import ErrorPage from '../ErrorPage'
import { useEffect } from 'react'
import ShowsSection from '../../components/ShowsSection'
import StatsSection from '../../components/StatsSection'
import Select from '../../components/Form/Select'
import TourProfile from '../../components/Artist/TourProfile'
import Switch from '../../components/Switch'

const ConcertPage = () => {

    const { id } = useParams();
    const { shows, allShows, tours, regions, getAllShowsByTourId, filterShowsByRegion, filterOnlyReportedShows, loading, apiError } = useShows()
    
    const [ searchParams, setSearchParams ] = useSearchParams()

    const activeFilter = (() => {
        const entries = Array.from(searchParams.entries())
        if (entries.length === 0) return null

        const [ method, value ] = entries[0]
        return { method, value }
    })()

    const handleSelectChange = async (value: string, method: string | undefined) => {
        if (!method) return

        if (value === 'Worldwide') {
            setSearchParams({})
            return
        }

        setSearchParams({ [method!]: value })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => { getAllShowsByTourId(Number(id)) }, [])
    
    useEffect(() => {
        if (!allShows.length) return

        const entries = Array.from(searchParams.entries())

        if (entries.length === 0) {
            filterShowsByRegion('Worldwide')
            return
        }

        const [ method, value ] = entries[0]
        filterShowsByRegion(value, method)
    }, [searchParams, allShows])

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
                            label='overview' handleChange={handleSelectChange} disable value={activeFilter?.method === 'region' ? activeFilter.value : ''}
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
                page='tour'
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
                                disabled={ shows.filter(s => s.attendance !== null).length === 0 || allShows.filter(s => s.attendance === null).length === 0 }
                            />
                        </div>
                        <Select
                            label='region'
                            options={regions}
                            value={activeFilter?.method === 'region' ? activeFilter.value : ''}
                            handleChange={handleSelectChange}
                        />
                    </div>
                </div>
            </div>

            <StatsSection stats={tours[0]} allShows={allShows} />

            <ShowsSection
                heading='Shows'
                shows={shows}
                page='tour'
            />

        </div>
    )

}

export default ConcertPage