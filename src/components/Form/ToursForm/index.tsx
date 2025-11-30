import Searchbar from '../Searchbar'
import Select from '../Select'
import styles from './styles.module.css'

interface Props {
    loading?: boolean
    handleChange: ( value: string, method?: string ) => Promise<void>
}

const ToursForm = ({ loading, handleChange }: Props) => {

    return (
        
        <form className={styles.filters}>
            <Searchbar disable={loading} handleChange={handleChange} placeholder='Search by group name...' />
            <Select disable={loading} label='type' options={[]} handleChange={handleChange} />
            <Select disable={loading} label='gender' options={[]} handleChange={handleChange} />
            <Select disable={loading} label='group' options={[]} handleChange={handleChange} />
        </form>

    )

}

export default ToursForm