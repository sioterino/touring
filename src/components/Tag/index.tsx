import styles from './styles.module.css'

interface Props {
    text: string
    clickable?: boolean
    type?: string
}

const Tag = ({ text, type = 'hollow', clickable = false }: Props) => {
    
    const classList = [ styles.tag, styles[type], clickable && styles.clickable ].filter(Boolean).join(' ')


    return (
        <p className={classList}>
            {text}
        </p>
    )

}

export default Tag