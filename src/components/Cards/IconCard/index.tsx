import styles from './styles.module.css'

interface Props {
    heading: string
    icon: React.ReactNode
    text: string
}

const IconCard = ({ heading, icon, text }: Props) => {

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