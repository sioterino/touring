import styles from './styles.module.css'
import Heading from '../../components/Heading'
import EmptyArray from '../../components/EmptyArray'

const ToursPage = () => {

    return (
        <div className={styles.container}>
            <Heading title='Tours' desc='Browse all K-pop tours and their details' />

            <p className={styles.info}>Showing 0 out of 0 tours</p>
            <div className={styles.cards}>
                <EmptyArray />
            </div>
        </div>
    )

}

export default ToursPage