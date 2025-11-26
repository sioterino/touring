import { useEffect } from 'react'
import useGroups from '../../hooks/GroupHook'
import { useParams } from 'react-router-dom';
import Heading from '../../components/Heading';
// import styles from './styles.module.css'

const ArtistPage = () => {

    const { id } = useParams();
    const { group, getGroupById, loading, apiError } = useGroups()

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => { getGroupById(Number(id)) }, [])

    if (loading) return null
    if (apiError.isError) return <p>error</p>

    let gen
    switch(group.generation) {
        case 1: gen = 'st Gen'; break;
        case 2: gen = 'nd Gen'; break;
        case 3: gen = 'rd Gen'; break;
        default: gen = `${group.generation}th  Gen`
    }

    const gender = group.gender.charAt(0).toUpperCase() + group.gender.slice(1)

    return (
        <Heading title={group.name} desc={`${gen} ${gender} K-Pop Group`} />
    )

}

export default ArtistPage