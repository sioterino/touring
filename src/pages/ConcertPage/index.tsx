import EmptyArray from '../../components/EmptyArray'
import GoBack from '../../components/GoBack'
import Heading from '../../components/Heading'
import styles from './styles.module.css'

const ConcertPage = () => {

    return (
        <div className={styles.container}>
            <GoBack path='/tours' text='Back to tours' />
            <Heading title='Touring Page' desc="See all available data of a artist's tour" />
            <EmptyArray />
        </div>
    )

}

export default ConcertPage