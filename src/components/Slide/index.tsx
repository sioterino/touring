import styles from './styles.module.css'

interface Props {
    heading: string
    desc?: string
    hint?: boolean
    className?: string
    children: React.ReactNode
}

const Slide = ({ heading, children, className, desc = 'Slide left two see all tours available', hint }: Props) => {

    return (
        <div className={`${styles.slider} ${className}`}>
            <h2>{heading}</h2>
            { hint && <p className={styles.hint}>{desc}</p> }
            <div className={styles.sliderContainer}>
                <div className={styles.cards}>
                    { children }
                </div>
            </div>
        </div>
    )

}

export default Slide