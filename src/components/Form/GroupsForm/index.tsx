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

    const genders = [{ text: 'All Genders', value: 'all' }]
    const generations = [{ text: 'All Generations', value: 'all' }]
    const companies = [{ text: 'All Companies', value: 'all', group: '_nogroup_' }]

    if (options) {

        const sortedGenders = [...options[0]].sort((a: string, b: string) => a.localeCompare(b))
        sortedGenders.forEach((g: Gender) => {genders.push({ text: g, value: g })})

        const sortedGenerations = [...options[1]].sort((a: number, b: number) => a - b).filter((g: number) => g > 0)
        sortedGenerations.forEach((g: Generation) => { generations.push({ text: g === 3 ? '3rd Gen' : `${g}th Gen`, value: g.toString() })})

        const sortedCompanies = [...options[2]].sort(
            (a: Company, b: Company) => {

                const parentA = a.parent_company?.name ?? a.name
                const parentB = b.parent_company?.name ?? b.name

                return parentA.localeCompare(parentB) ||
                       a.name.localeCompare(b.name)
            }
        )

        const addedParents = new Set<number>()

        sortedCompanies.forEach((c: Company) => {

            const parentName = c.parent_company?.name ?? c.name
            const parentId = c.parent_company?.id ?? c.id

            if (!addedParents.has(parentId)) {
                companies.push({
                    text: parentName,
                    value: parentId.toString(),
                    group: parentName
                })
                addedParents.add(parentId)
            }

            if (c.parent_company) {
                companies.push({
                    text: c.name,
                    value: c.id.toString(),
                    group: parentName
                })
            }
        })
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
