import styles from './styles.module.css'
import Heading from '../../components/Heading'
import ToursForm from '../../components/Form/ToursForm'
import ToursPageCard from '../../components/Cards/ToursPageCard'
import EmptyArray from '../../components/EmptyArray'
import useTours from '../../hooks/TourHook'
import ErrorPage from '../ErrorPage'
import { useEffect } from 'react'

const ToursPage = () => {

    const { tours, allTours, types, genders, generations, getAllTours, getToursByValue, loading, apiError } = useTours()

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => { getAllTours() }, [])

    if (apiError.isError) return <ErrorPage message={apiError.message} />;

    return (
        <div className={styles.container}>
            <Heading title='Tours' desc='Browse all K-pop tours and their details' />
            <ToursForm
                loading={loading}
                options={[ genders, generations, types ]}
                handleChange={getToursByValue}
            />

            <p className={styles.info}>Showing {tours.length} out of {allTours.length} tours</p>
            <div className={loading ? styles.gradient : ''}>
                <div className={styles.cards}>
                    {
                        !loading ?
                            tours.length !== 0 ? tours.map((tour, key) => (<ToursPageCard key={key} tour={tour} />))
                            : <EmptyArray title='Hmm… nothing matched' desc="We couldn't find any items that match your search or filter criteria. Maybe try different options?" />
                        : Array.from({ length: 24 }).map((_, i) => <ToursPageCard key={i} loading /> )
                        
                    }
                </div>
            </div>
        </div>
    )

}

export default ToursPage