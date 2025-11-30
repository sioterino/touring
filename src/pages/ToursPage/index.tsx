import styles from './styles.module.css'
import Heading from '../../components/Heading'
import ToursForm from '../../components/Form/ToursForm'
import type { Tour } from '../../types/models'
import ToursPageCard from '../../components/Cards/ToursPageCard'
import EmptyArray from '../../components/EmptyArray'

const ToursPage = () => {

    const mockTour: Tour = {
        id: 1, name: 'EASY CRAZY HOT', begin: '2025-04-19', end: '2026-02-01', tour: 'world',
        group: { id: 1, name: 'LE SSERARIM', debut: '2022-05-02', company: { id: 1, name: 'Source Music', parent_company: [{ id: 2, name: 'HYBE' }] }, gender: 'female', generation: 4, colors: ['#0c4d9cff', '#4db1d5ff'] }
    }

    const tours = []

    for (let i = 0; i < 33; i++)
        tours.push(mockTour)

    const loading = true

    return (
        <div className={styles.container}>
            <Heading title='Tours' desc='Browse all K-pop tours and their details' />
            <ToursForm
                loading={loading}
                handleChange={async () => console.log('a')}
            />

            <p className={styles.info}>Showing 32 out of 32 tours</p>
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