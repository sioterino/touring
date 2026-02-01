import styles from './styles.module.css'
import Heading from '../../components/Heading'
import EmptyArray from '../../components/EmptyArray'
import useVenues from '../../hooks/VenueHoook'
import ErrorPage from '../ErrorPage'
import { useEffect } from 'react'
import type { Venue } from '../../types/models'
import VenueCard from '../../components/Cards/VenueCard'
import VenuesForm from '../../components/Form/VenuesForm'

import { useSearchParams } from 'react-router-dom'

const VenuesPage = () => {

    const { venues, allVenues, cities, countries, continents, getAllVenues, filterVenuesByValue, loading, apiError } = useVenues()

    const [searchParams, setSearchParams] = useSearchParams()

    const activeFilter = (() => {
        const entries = Array.from(searchParams.entries())
        if (entries.length === 0) return null

        const [method, value] = entries[0]
        return { method, value }
    })()

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => { getAllVenues() }, [])

    useEffect(() => {
        if (!allVenues.length) return

        const entries = Array.from(searchParams.entries())

        if (entries.length === 0) {
            filterVenuesByValue('all')
            return
        }

        const [method, value] = entries[0]
        filterVenuesByValue(value, method)

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams, allVenues])

    if (apiError.isError) return <ErrorPage message={apiError.message} />

    return (
        <div className={styles.container}>
            <Heading title='Venues' desc='Explore venues and see which artists performed there' />
            <VenuesForm
                options={[cities, countries, continents]}
                activeFilter={activeFilter}
                handleChange={ async (value, method) => {
                    if (!method) return

                    if (value === 'all') {
                        setSearchParams({})
                        return
                    }

                    setSearchParams({ [method]: value })
                }}
/>

            <p className={styles.info}>Showing {venues.length} out of {allVenues.length} venues</p>
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