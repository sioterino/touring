import { ChevronDown } from 'lucide-react'
import styles from './styles.module.css'
import type { ChangeEvent } from 'react'

interface Props {
    label: string
    placeholder?: string
    disable?: boolean
    options: { text: string, value: string }[]
    handleChange: (value: string, method: string) => Promise<void>
}

const Select = ({ placeholder = '', options, disable = false, label, handleChange }: Props) => {

    const onChange = (e: ChangeEvent) => {
        const target = e.target as HTMLSelectElement
        handleChange(target.value, label)
    }

    return (
        <div className={styles.container} >
            <ChevronDown className={styles.arrow} />
            <select name={label} id={label} className={styles.select} disabled={disable} onChange={e => onChange(e)} >
                {
                    placeholder && <option value="" disabled selected>
                        {placeholder}
                    </option>
                }

                {options.map((opt, key) => (
                    <option key={key} value={opt.value}>
                        {opt.text}
                    </option>
                ))}
            </select>
        </div>
    )

}

export default Select