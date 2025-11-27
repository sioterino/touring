import { ChevronDown } from 'lucide-react'
import styles from './styles.module.css'

interface Props {
    placeholder?: string
    options: { text: string, value: string }[]
}

const Select = ({ placeholder = '', options }: Props) => {

    console.log(placeholder)

    return (
        <div className={styles.container} >
            <ChevronDown className={styles.arrow} />
            <select name="" id="" className={styles.select}>
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