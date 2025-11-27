import { useEffect } from 'react'
import GroupCard from '../../components/Group/Card'
import Heading from '../../components/Heading'
import useGroups from '../../hooks/GroupHook'
import type { Group } from '../../types/models'
import styles from './styles.module.css'
import ErrorPage from '../ErrorPage'
import Form from '../../components/Form'

const GroupsPage = () => {

    const { groups, getAllGroups, loading, apiError } = useGroups()

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => { getAllGroups() }, [])

    if (loading) return (
        <div className={styles.container}>
            <Heading title='Groups' desc='Browse and filter K-pop groups' />
            <Form />
            <p className={styles.info}>Showing 16 out of 16 groups</p>

            <div className={styles.cards}>
            {Array.from({ length: 16 }).map((_, i) => (
                <div className={styles.skeletonCard} key={i}>
                    <div className={styles.skelHeader}>
                        <div className={styles.skelPfp}></div>
                        <div className={styles.skelHeader}></div>
                    </div>
                    <div className={styles.skelTagRow}>
                        <div className={styles.skelTag}></div>
                        <div className={styles.skelTag}></div>
                        <div className={styles.skelTag}></div>
                    </div>
                </div>
            ))}
            </div>
        </div>
    )

    if (apiError.isError) return <ErrorPage message={apiError.message || 'test'} />;



    return (
        <div className={styles.container}>
            <Heading title='Groups' desc='Browse and filter K-pop groups' />
            <Form />

            <p className={styles.info}>Showing {groups.length} out of {groups.length} groups</p>
            <div className={styles.cards}>
                { groups.map((gp: Group, key: number) => <GroupCard group={gp} key={key} /> ) }
            </div>
        </div>
    )

}

export default GroupsPage