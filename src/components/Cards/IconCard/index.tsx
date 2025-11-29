import styles from './styles.module.css'

interface Props {
    heading?: string
    icon?: React.ReactNode
    text?: string
    loading?: boolean
}

const IconCard = ({ loading = false, heading, icon, text }: Props) => {

    if (loading) return (
        <span className={styles.skeletonCard}>
            <span className={styles.skelHeader}>
                <span className={styles.skelTxt}></span>
                <span className={styles.skelIcon}></span>
            </span>
            <span className={styles.skelData}></span>
        </span>
    )

    return (
        <div className={styles.iconCard}>
            <div className={styles.header}>
                <p>{heading}</p>
                { icon }
            </div >
            <h3 >{text}</h3>
        </div>
    )

}

export default IconCard