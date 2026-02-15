import type { Gender, Generation } from '../../../types/models'
import Searchbar from '../Searchbar'
import Select from '../Select'
import styles from './styles.module.css'

interface Props {
    loading?: boolean
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    options?: any[]
    handleChange: ( value: string, method?: string ) => Promise<void>
}

const ToursForm = ({ loading, options, handleChange }: Props) => {

    const genders = [ { text: 'All Genders', value: 'all' }, ]
    const generations = [ { text: 'All Generations', value: 'all' }, ]
    const tours = [ { text: 'All Tours', value: 'all' }, ]

    if (options) {
        const sortedGenders = [...options[0]].sort((a: string, b: string) => a.localeCompare(b))
        sortedGenders.forEach((g: Gender) => {genders.push({ text: g, value: g })})

        const sortedGenerations = [...options[1]].sort((a: number, b: number) => a - b).filter((g: number) => g > 0)
        sortedGenerations.forEach((g: Generation) => { generations.push({ text: g === 3 ? '3rd Gen' : `${g}th Gen`, value: g.toString() })})

        const sortedTours = [...options[2]].sort((a: string, b: string) => a.localeCompare(b))
        sortedTours.forEach((t: string) => tours.push({ text: t, value: t }))
    }

    return (
        <form className={styles.filters}>
            <Searchbar disable={loading} handleChange={handleChange} placeholder='Search by tour or group name...' />
            <Select disable={loading} label='generation' options={generations} handleChange={handleChange} />
            <Select disable={loading} label='gender' options={genders} handleChange={handleChange} />
            <Select disable={loading} label='type' options={tours} handleChange={handleChange} />
        </form>
    )

}

export default ToursForm