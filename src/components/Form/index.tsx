import Searchbar from '../../components/Form/Searchbar'
import Select from '../../components/Form/Select'
import styles from './styles.module.css'

const Form = () => {

    const genders = [
        { text: 'All Genders', value: 'all' },
        { text: 'Female', value: 'female' },
        { text: 'Male', value: 'male' },
        { text: 'Coed', value: 'coed' },
    ]

    const generations = [
        { text: 'All Generations', value: 'all' },
        { text: '3rd Gen', value: '3' },
        { text: '4th Gen', value: '4' },
        { text: '5th Gen', value: '5' }
    ]


    const companies = [
        { text: 'All Companies', value: 'all' },
        { text: 'SM', value: 'sm' },
        { text: 'JYP', value: 'jyp' },
        { text: 'YG', value: 'yg' },
        { text: 'HYBE', value: 'hybe' },
        { text: 'Cube', value: 'cube' },
        { text: 'Source Music', value: 'source' },
    ]

    return (

        <form className={styles.filters}>
            <Searchbar />
            <Select options={genders} />
            <Select options={generations} />
            <Select options={companies} />
        </form>

    )

}

export default Form