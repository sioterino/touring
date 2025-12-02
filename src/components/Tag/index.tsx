import type React from 'react'
import styles from './styles.module.css'

interface Props {
    text: string
    capitalize?: boolean
    type?: 'hollow' | 'filled' | 'loading'
    icon?: React.ReactNode | null
}

const Tag = ({ text, type = 'hollow', capitalize = true, icon = null }: Props) => {
    
    const classList = [ styles.tag, styles[type], capitalize && styles.capitalize, icon && styles.icon ].filter(Boolean).join(' ')


    return (
        <span className={classList} >{icon && icon} {text}</span>
    )

}

export default Tag