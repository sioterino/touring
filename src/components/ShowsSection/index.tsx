import type { Show } from '../../types/models'
import ShowCards from '../Cards/ShowCard'
import styles from './styles.module.css'

interface Props {
    className?: string
    loading?: boolean
    shows?: Show[]
    heading: string
    desc?: string
    page: 'group' | 'tour' | 'venue'
}

const ShowsSection = ({ className, loading, shows, heading, desc, page = 'group' }: Props) => {

    if (loading || !shows) return (
        <div className={`${styles.container} ${className}`}>
            <h2>Recent Shows</h2>
            <p className={styles.hint}>Most recent reported shows</p>
            <div className={styles.gradient}>
                <div className={styles.shows}>
                    {
                        Array.from({ length: 6 }).map((_, i) => (
                            <ShowCards loading key={i} />
                        ))
                    }
                </div>
            </div>
        </div>
    )

    return (
        <div className={`${styles.container} ${className}`}>

            <h2>{heading}</h2>
            { desc && <p className={styles.hint}>{desc}</p> }

            <div className={styles.shows}>
                {
                    shows.map((s: Show, key) => (
                        <ShowCards
                            key={ key }
                            page={ page }
                            show={ s }
                        />
                    ))
                }
            </div>

        </div>
    )

}

export default ShowsSection