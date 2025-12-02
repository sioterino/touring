import { useEffect } from 'react'
import GroupCard from '../../components/Cards/GroupCard'
import Heading from '../../components/Heading'
import type { Group } from '../../types/models'
import styles from './styles.module.css'
import ErrorPage from '../ErrorPage'
import GroupsForm from '../../components/Form/GroupsForm'
import { useGroupsContext } from '../../context/GroupsContext'
import EmptyArray from '../../components/EmptyArray'
import useCompanies from '../../hooks/CompanyHook'

const GroupsPage = () => {

    const { groups, length, genders, generations, getAllGroups, getGroupsByValue, loading: gLoading, apiError: gError } = useGroupsContext()
    const { companies, getAllCompanies, loading: cLoading, apiError: cError } = useCompanies()

    useEffect(() => {
        getAllGroups()
        getAllCompanies()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (cError.isError || gError.isError) return <ErrorPage message={gError.isError ? gError.message : cError.message} />;

    return (
        <div className={`${styles.container}`}>
            <Heading title='Groups' desc='Browse and filter K-pop groups' />
            <GroupsForm
                loading={gLoading || cLoading}
                options={[genders, generations, companies]}
                handleChange={getGroupsByValue}
            />

            <p className={styles.info}>Showing {groups.length} out of {length} groups</p>
            <div className={gLoading || cLoading ? styles.gradient : ''}>
                <div className={styles.cards}>
                    { 
                        !gLoading || !cLoading ?
                            groups.length !== 0 ? groups.map((gp: Group, key: number) => <GroupCard group={gp} key={key} /> )
                            : <div className={styles.span}>
                                <EmptyArray title='Hmm… nothing matched' desc="We couldn't find any items that match your search or filter criteria. Maybe try different options?" />
                            </div>
                        : Array.from({ length: 24 }).map((_, i) => <GroupCard loading key={i} /> )
                    }
                </div>
            </div>
        </div>
    )

}

export default GroupsPage