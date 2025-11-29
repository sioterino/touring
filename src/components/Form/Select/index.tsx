import { ChevronDown } from 'lucide-react'
import styles from './styles.module.css'
import type { ChangeEvent } from 'react'

interface Props {
    label: string
    placeholder?: string
    disable?: boolean
    options: { text: string, value: string, group?: string }[]
    value?: string
    handleChange: (value: string, method?: string) => Promise<void>
}

const Select = ({ placeholder = '', options, disable = false, label, handleChange, value }: Props) => {

    const onChange = (e: ChangeEvent) => {
        const target = e.target as HTMLSelectElement
        
        handleChange(target.value, label)
    }

    // Group options by "group"
    const grouped = options.reduce((acc, opt) => {
        const group = opt.group || '_nogroup_'
        if (!acc[group]) acc[group] = []
        acc[group].push(opt)
        return acc
    }, {} as Record<string, typeof options>)

    return (
        <div className={styles.container} >
            <ChevronDown className={styles.arrow} />
            <select
                name={label}
                id={label}
                className={styles.select}
                disabled={disable}
                onChange={onChange}
                value={value}
            >
                {placeholder && (
                    <option value="" disabled selected>
                        {placeholder}
                    </option>
                )}

                {Object.entries(grouped).map(([groupName, groupedOptions]) => (
                    groupName === '_nogroup_' ? (
                        // Render ungrouped options normally
                        groupedOptions.map((opt, key) => (
                            <option key={key} value={opt.value}>
                                {opt.text}
                            </option>
                        ))
                    ) : (
                        // Render grouped options inside optgroup
                        <optgroup key={groupName} label={groupName}>
                            {groupedOptions.map((opt, key) => (
                                <option key={key} value={opt.value}>
                                    {opt.text}
                                </option>
                            ))}
                        </optgroup>
                    )
                ))}
            </select>
        </div>
    )
}

export default Select
