import { useEffect } from 'react'
import GroupCard from '../../components/Cards/GroupCard'
import Heading from '../../components/Heading'
import type { Group } from '../../types/models'
import styles from './styles.module.css'
import ErrorPage from '../ErrorPage'
import GroupsForm from '../../components/Form/GroupsForm'
import { useGroupsContext } from '../../context/GroupsContext'
import EmptyArray from '../../components/EmptyArray'

const GroupsPage = () => {

    const { groups, length, companies, genders, generations, getAllGroups, getGroupsByValue, loading, apiError } = useGroupsContext()

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => { getAllGroups() }, [])

    if (loading) return (
        <div className={styles.container}>
            <Heading title='Groups' desc='Browse and filter K-pop groups' />
            <GroupsForm loading={loading} handleChange={getGroupsByValue} />
            <p className={styles.info}>Showing 16 out of 16 groups</p>

            <div className={styles.gradient}>
                <div className={styles.cards}>
                { Array.from({ length: 16 }).map((_, i) => <GroupCard loading={loading} key={i} /> ) }
                </div>
            </div>
        </div>
    )

    if (apiError.isError) return <ErrorPage message={apiError.message || 'test'} />;



    return (
        <div className={styles.container}>
            <Heading title='Groups' desc='Browse and filter K-pop groups' />
            <GroupsForm
                loading={loading}
                options={[genders, generations, companies]}
                handleChange={getGroupsByValue}
            />

            <p className={styles.info}>Showing {groups.length} out of {length} groups</p>
            <div className={styles.cards}>
                { groups.length === 0 ?
                    <EmptyArray title='Hmm… nothing matched' desc="We couldn't find any items that match your search or filter criteria. Maybe try different options?" /> :
                    groups.map((gp: Group, key: number) => <GroupCard group={gp} key={key} /> )
                }
            </div>
        </div>
    )

}

export default GroupsPage