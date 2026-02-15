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
    const { shows, unreportedShows, allShows, tours, regions, getAllShowsByTourId, filterShowsByRegion, loading, apiError } = useShows()
    
    const [ searchParams, setSearchParams ] = useSearchParams()
    const region = searchParams.get('region')
    const reportedOnly = searchParams.get('reported') === 'true'

    const showsDescription = (() => {
        if (!region)
            return reportedOnly ? 'Showing all reported concerts' : 'Showing all concerts'

        return reportedOnly ? `Showing only reported concerts in ${region}` : `Showing concerts in ${region}`
    })()

    const activeFilter = (() => {
        const entries = Array.from(searchParams.entries())
        if (entries.length === 0) return null

        const [ method, value ] = entries[0]
        return { method, value }
    })()

    const handleSelectChange = async (value: string, method: string | undefined) => {
        if (!method) return

        const params = Object.fromEntries(searchParams.entries())

        if (value === 'Worldwide') {
            delete params[method]
            setSearchParams(params)
            return
        }

        params[method] = value
        setSearchParams(params)
    }

    const handleReportedToggle = (checked: boolean) => {
        const params = Object.fromEntries(searchParams.entries())

        if (checked) params.reported = 'true'
        else delete params.reported

        setSearchParams(params)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => { getAllShowsByTourId(Number(id)) }, [])
    
    useEffect(() => {
        if (!allShows.length) return

        const region = searchParams.get('region') || 'Worldwide';
        const reported = searchParams.get('reported') === 'true';

        const entries = Array.from(searchParams.entries())
        console.log(entries)

        filterShowsByRegion(region, 'region', reported);

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
                            <Switch disabled checked={reportedOnly} size='lg' />
                        </div>
                        <Select
                            label='overview' handleChange={handleSelectChange} disable value={activeFilter?.method === 'region' ? activeFilter.value : ''}
                            options={regions.length === 0 ? [ { text: 'Worldwide', value: 'Worldwide' }, ] : regions}
                        />
                    </div>
                </div>
            </div>

            <StatsSection loading stats={tours[0]} />
            <ShowsSection loading heading='Shows' desc={showsDescription} shows={shows} page='tour' />

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
                            <Switch size='lg' onChange={handleReportedToggle}
                                checked={ unreportedShows.length === 0 || reportedOnly }
                                disabled={ unreportedShows.length === 0 }
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

            <StatsSection stats={tours[0]} filteredShows={shows} />
            <ShowsSection heading='Shows' desc={showsDescription} shows={shows} page='tour' />

        </div>
    )

}

export default ConcertPage