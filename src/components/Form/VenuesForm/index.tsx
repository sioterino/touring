import styles from './styles.module.css'
import type { City, Continent, Country } from '../../../types/models'
import Searchbar from '../Searchbar'
import Select from '../Select'

interface Props {
    loading?: boolean
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    options?: any[]
    handleChange: (value: string, method: string | undefined) => Promise<void>
    activeFilter?: { method: string; value: string } | null
}

const VenuesForm = ({ loading = false, options, handleChange, activeFilter }: Props) => {

    const continents = [ { text: 'All Continents', value: 'all', group: '_nogroup_' }, ]
    const countries = [ { text: 'All Country', value: 'all', group: '_nogroup_' }, ]
    const cities = [ { text: 'All Cities', value: 'all', group: '_nogroup_' }, ]

    if (options) {
        options[0].forEach((c: City) => cities.push({ text: c.name, value: c.id.toString(), group: c.country.name }))
        options[1].forEach((c: Country) => countries.push({ text: c.name, value: c.id.toString(), group: c.continent.name }))
        options[2].forEach((c: Continent) => continents.push({ text: c.name, value: c.id.toString(), group: '_nogroup_' }))
    }

    return (
        <form className={styles.filters}>
            <Searchbar disable={loading} handleChange={handleChange} placeholder='Search by venue name...' activeValue={activeFilter?.method === 'search' ? activeFilter.value : ''} />
            <Select disable={loading} label='continent' options={continents} handleChange={handleChange} value={activeFilter?.method === 'continent' ? activeFilter.value : ''} />
            <Select disable={loading} label='country' options={countries} handleChange={handleChange} value={activeFilter?.method === 'country' ? activeFilter.value : ''} />
            <Select disable={loading} label='city' options={cities} handleChange={handleChange} value={activeFilter?.method === 'city' ? activeFilter.value : ''} />
        </form>
    )

}

export default VenuesForm