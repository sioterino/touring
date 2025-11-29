import styles from './styles.module.css'
import type { Company, Gender, Generation } from '../../../types/models'
import Searchbar from '../Searchbar'
import Select from '../Select'

interface Props {
    loading?: boolean
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    options?: any[]
    handleChange: (value: string, method: string | undefined) => Promise<void>
}

const GroupsForm = ({ loading = false, options, handleChange }: Props) => {

    const genders = [
        { text: 'All Genders', value: 'all' },
    ]

    const generations = [
        { text: 'All Generations', value: 'all' },
    ]


    const companies = [
        { text: 'All Companies', value: 'all' },
    ]

    if (options) {
        options[0].forEach((g: Gender) => genders.push({ text: g, value: g }));
        options[1].forEach((g: Generation) => generations.push({ text: g === 3 ? '3rd Gen' : g + 'th Gen', value: g.toString() }))
        options[2].forEach((c: Company) => companies.push({ text: c.name, value: c.id.toString() }))
    }
    

    return (

        <form className={styles.filters}>
            <Searchbar disable={loading} handleChange={handleChange} placeholder='Search by group name...' />
            <Select disable={loading} label='gender' options={genders} handleChange={handleChange} />
            <Select disable={loading} label='generation' options={generations} handleChange={handleChange} />
            <Select disable={loading} label='company' options={companies} handleChange={handleChange} />
        </form>

    )

}

export default GroupsForm