import { useState, type ChangeEvent } from 'react'
import styles from './styles.module.css'
import { Search, X } from 'lucide-react'

interface Props {
    placeholder?: string
    disable?: boolean
    handleChange: (value: string, method: string) => Promise<void>
}

const Searchbar = ({ placeholder = 'Seatch...', disable = false, handleChange }: Props) => {

    const [ showDelete, setShowDelete ] = useState(false)
    const [ value, setValue ] = useState('')

    const handleInputChange = (e: ChangeEvent): void => {
        e.preventDefault()

        if (! showDelete) setShowDelete(true)
            
        const target = e.target as HTMLInputElement
        setValue(target.value)
        handleChange(target.value, 'search')
    }

    const clearInput = () => {
        setValue('')
        setShowDelete(false)
        handleChange('', 'search')
    }

    return (
        <div className={styles.container}>
            <Search className={styles.searchglass} />

            <input
                className={styles.searchbar}
                id='searchbar'
                type="text"
                spellCheck={false}
                autoComplete='off'
                value={value}
                onChange={e => handleInputChange(e)}
                placeholder={placeholder}
                disabled={disable}
            />

            { showDelete && <X className={styles.closeButton} onClick={() => clearInput()} /> }
        </div>
    )

}

export default Searchbar