import styles from './styles.module.css'
import Heading from '../../components/Heading'
import EmptyArray from '../../components/EmptyArray'
import useVenues from '../../hooks/VenueHoook'
import ErrorPage from '../ErrorPage'
import { useEffect } from 'react'
import type { Venue } from '../../types/models'
import VenueCard from '../../components/Cards/VenueCard'

const VenuesPage = () => {

    const { venues, allVenues, getAllVenues, loading, apiError } = useVenues()

    useEffect(() => { getAllVenues() }, [])

    if (apiError.isError) return <ErrorPage message={apiError.message} />

    return (
        <div className={styles.container}>
            <Heading title='Venues' desc='Explore venues and see which artists performed there' />

            <p className={styles.info}>Showing {venues?.length} out of {allVenues?.length} venues</p>
            <div className={loading ? styles.gradient : ''}>
                <div className={styles.cards}>
                    {
                        !loading && venues ?
                            venues.length !== 0 ? venues.map((v: Venue, i: number) => <VenueCard key={ i } venue={ v }  />)
                            : <div className={styles.span}>
                                <EmptyArray title='Hmm… nothing matched' desc="We couldn't find any items that match your search or filter criteria. Maybe try different options?" />
                            </div>
                        : Array.from({ length: 24 }).map((_, i) => <VenueCard key={ i } loading />)
                    }
                </div>
            </div>
        </div>
    )

}

export default VenuesPage