import { toast } from "sonner"
import supabase from "../api/supabase"
import { useState } from "react"
import type { Group } from "../types/models"

interface ApiError {
    isError: boolean
    message: string
}

const useGroups = () => {

    const [ groups, setGroups ] = useState<Group[]>([])
    const [ group, setGroup ] = useState<Group>({
        id: 13, name: 'Group Name', debut: '2022-11-26', company: { id: 1, name: 'Company' }, gender: 'coed', generation: 5
    })

    const [ loading, setLoading ] = useState(false)
    const [ apiError, setApiError ] = useState<ApiError>({ isError: false, message: '' })

    const getAllGroups = async () => {
        setLoading(true)
        const { data, error } = await supabase.from('groups').select('*, company:companies(name)');

        if (error) {
            setLoading(false)
            setApiError({ isError: true, message: error.message })
            console.error('[GroupHook] Error fetching groups data: ', error)
            toast.error('There was an error while loading the groups...')
            return
        }

        setGroups(data)
        setLoading(false)
    }

    const getGroupById = async (id: number) => {
        setLoading(true)
        const { data, error } = await supabase.from('groups').select('*, company:companies(name)').eq('id', id).single()

        if (error) {
            setLoading(false)
            setApiError({ isError: true, message: error.message })
            console.error("[GroupHook] Error fetching the group's data: ", error)
            toast.error("There was an error while loading the group's data...")
            return
        }

        setGroup(data)
        setLoading(false)
    }

    return { groups, group, getAllGroups, getGroupById, loading, apiError }
}

export default useGroups