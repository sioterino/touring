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
import type { Group, Show } from '../../types/models';
import GroupCard from '../../components/Cards/GroupCard';
import useGroups from '../../hooks/GroupHook';

const VenueShowsPage = () => {

    const { id } = useParams();

    const { shows, getShowsByVenueId, loading: sLoading, apiError: sError }  = useShows()
    const { venue, getVenueById, loading: vLoading, apiError: vError }  = useVenues()
    const { groups, getGroupsByVenueId, loading: gLoading, apiError: gError } = useGroups()

    const loading = vLoading || sLoading || gLoading
    const apiError = vError.isError || sError.isError || gError.isError
    const message = vError.message || sError.message || gError.message

    useEffect(() => {
        getVenueById(Number(id))
        getShowsByVenueId(Number(id))
        getGroupsByVenueId(Number(id))
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

                <div className={styles.groups}>
                    <h2>Performing Groups</h2>
                    <p className={styles.hint}>Groups who have performed in this venue</p>
                    <div className={styles.gradient}>
                        <div className={styles.cards}>
                            {
                                Array.from({ length: 6 }).map((_, i) => <GroupCard key={ i } loading />)
                            }
                        </div>
                    </div>
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

            <div className={styles.groups}>
                <h2>Performing Groups</h2>
                <p className={styles.hint}>Groups who have performed in this venue</p>
                <div className={styles.cards}>
                    {
                        groups.map((g: Group, i: number) => (
                            <GroupCard
                                key={ i }
                                group={ g }
                                page='venue'
                                attendance={ shows.filter(s => s.group.id === g.id).reduce((acc, s) => { return acc += s.attendance || 0 }, 0) }
                                nights={ shows.filter(s => s.group.id === g.id).reduce((acc, s) => { return s.box_score ? acc += s.nights : 0 }, 0) }
                            />
                        ))
                    }
                </div>
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
