import styles from './styles.module.css'

interface Props {
    text: string
    capitalize?: boolean
    type?: 'hollow' | 'filled' | 'loading'
}

const Tag = ({ text, type = 'hollow', capitalize = true }: Props) => {
    
    const classList = [ styles.tag, styles[type], capitalize && styles.capitalize ].filter(Boolean).join(' ')


    return (
        <p className={classList}>{text}</p>
    )

}

export default Tag