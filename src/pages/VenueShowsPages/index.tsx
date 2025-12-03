import { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import styles from './styles.module.css'
import GoBack from '../../components/GoBack';
import ErrorPage from '../ErrorPage';
import ShowsSection from '../../components/ShowsSection';
import useShows from '../../hooks/ShowHook';
import VenueProfile from '../../components/Artist/VenueProfile';
import useVenues from '../../hooks/VenueHoook';
import IconCard from '../../components/Cards/IconCard';
import { Users, Calendar } from 'lucide-react';
import { formatNumber } from '../../utils/NumberUtils';
import type { Show } from '../../types/models';

const VenueShowsPage = () => {

    const { id } = useParams();

    const { shows, getShowsByVenueId, loading: sLoading, apiError: sError }  = useShows()
    const { venue, getVenueById, loading: vLoading, apiError: vError }  = useVenues()

    const loading = vLoading || sLoading
    const apiError = vError.isError || sError.isError
    const message = vError.message || sError.message

    useEffect(() => {
        getVenueById(Number(id))
        getShowsByVenueId(Number(id))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (apiError) return <ErrorPage message={message} />

    if (loading || shows === null)
        return (
            <div className={styles.artist}>
                <div>
                    <GoBack text='Back to venues' path='/venues' />
                    <VenueProfile loading />
                </div>

                <div className={styles.general}>
                    { Array.from({ length: 3 }).map((_, i) => <IconCard key={i} loading />) }
                </div>

                <ShowsSection
                    loading
                    heading='Recent Shows'
                    desc='Latest updated performances'
                />

            </div>
        )

    return (
        <div className={styles.artist}>
            <div>
                <GoBack text='Back to venues' path='/venues' />
                <VenueProfile venue={venue} />
            </div>

            <div className={styles.general}>
                <IconCard heading='Total Shows' icon={<Calendar />} text={ String(venue?.shows) } />

                <IconCard heading='Performing Groups' icon={<Users />} text={ String(venue?.groups) } />

                <IconCard heading='Total Attendance' icon={<Users />} text={ formatNumber( shows.reduce((acc: number, s: Show) => { return acc += s.attendance || 0 }, 0) ) } />
                
            </div>

            <ShowsSection
                heading='Recent Shows'
                desc='Latest updated performances'
                shows={
                    shows.sort((a, b) => {
                        if (a.attendance === null && b.attendance !== null) return 1
                        if (a.attendance !== null && b.attendance === null) return -1
                        return b.attendance! - a.attendance!
                    })
                }
                group
            />

        </div>
    )

}

export default VenueShowsPage
