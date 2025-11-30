import type { Show } from '../../types/models'
import ShowCards from '../Cards/ShowCard'
import styles from './styles.module.css'

interface Props {
    className?: string
    loading?: boolean
    shows?: Show[]
    heading: string
    desc?: string
}

const ShowsSection = ({ className, loading, shows, heading, desc }: Props) => {

    if (loading || !shows) return (
        <div className={`${styles.container} ${className}`}>
            <h2>Recent Shows</h2>
            <p className={styles.hint}>Most recent reported shows</p>
            <div className={styles.gradient}>
                <div className={styles.shows}>
                    {
                        Array.from({ length: 5 }).map((_, i) => (
                            <ShowCards loading key={i} tour={''} dates={[]} venue={''} continent={''} country={''} city={''} box={0} attendance={0} sold={0} shows={0} />
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
                            key={key}
                            tour={s.tour.name}
                            dates={[ s.day_1, s.day_2, s.day_3, s.day_4, s.day_5 ].filter(Boolean) as string[]}
                            venue={s.venue.name}
                            continent={s.venue.city.country.continent.name}
                            country={s.venue.city.country.name}
                            city={s.venue.city.name}
                            box={s.box_score!}
                            attendance={s.attendance!}
                            sold={s.sold_percentage!}
                            shows={s.nights}
                        />
                    ))
                }
            </div>

        </div>
    )

}

export default ShowsSection