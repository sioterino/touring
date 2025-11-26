import styles from './styles.module.css'

interface Props {
    title?: string
    desc?: string
}

const Heading = ({ title = 'Page Title', desc = '' }: Props) => {

    return (
        <div className={styles.heading}>
            <h1>{title}</h1>
            { desc && <p>{desc}</p> }
        </div>
    )

}

export default Heading