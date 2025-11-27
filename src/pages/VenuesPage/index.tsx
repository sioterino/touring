import styles from './styles.module.css'
import Heading from '../../components/Heading'
import EmptyArray from '../../components/EmptyArray'

const VenuesPage = () => {

    return (
        <div className={styles.container}>
            <Heading title='Venues' desc='Explore venues and see which artists performed there' />

            <p className={styles.info}>Showing 0 out of 0 venues</p>
            <div className={styles.cards}>
                <EmptyArray />
            </div>
        </div>
    )

}

export default VenuesPage