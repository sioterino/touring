import { toast } from "sonner"
import supabase from "../api/supabase"
import { useState } from "react"
import type { Gender, Generation, Group } from "../types/models"
import type { ApiError } from "../types/utils"
import useCompanies from "./CompanyHook"
import { compareValues } from "../utils/StringUtils"

const useGroups = () => {

    const [ groups, setGroups ] = useState<Group[]>([])
    const [ allGroups, setAllGroups ] = useState<Group[]>([])
    const [ length, setLength ] = useState(0)
    const [ group, setGroup ] = useState<Group>({
        id: 13, name: 'Group Name', debut: '2022-11-26', company: { id: 1, name: 'Company', parent_company: null }, gender: 'coed', generation: 5, 
    })

    const [ genders, setGenders ] = useState<Gender[]>([])
    const [ generations, setGenerations ] = useState<Generation[]>([])

    const [ loading, setLoading ] = useState(false)
    const [ apiError, setApiError ] = useState<ApiError>({ isError: false, message: '' })

    const { companies, getAllCompanies } = useCompanies()

    const getAllGroups = async () => {
        setLoading(true)

        const { data, error } = await supabase
            .from('groups')
            .select('*, company:companies(id, name, parent_company:parent_company(*))')
            .order('name', { ascending: true })


        if (error) {
            setLoading(false)
            setApiError({ isError: true, message: error.message })
            console.error('[GroupHook] Error fetching groups data: ', error)
            toast.error('There was an error while loading the groups...')
            return
        }

        setGroups(data)
        setAllGroups(data)
        setLength(data.length)

        const genderSet = new Set<Gender>()
        const generationSet = new Set<Generation>()

        data.forEach((g) => {
            genderSet.add(g.gender)
            generationSet.add(g.generation)
        })

        getAllCompanies()

        setGenders([...genderSet])
        setGenerations([...generationSet])

        setLoading(false)
    }

    const getGroupById = async (id: number) => {
        setLoading(true)
        const { data, error } = await supabase
            .from('groups')
            .select('*, company:companies(id, name, parent_company:parent_company(*))')
            .eq('id', id).single()

        if (error) {
            setLoading(false)
            setApiError({ isError: true, message: error.message })
            console.error("[GroupHook] Error fetching the group's data: ", error)
            toast.error("There was an error while trying to load the group's data...")
            return
        }

        setGroup(data)
        setLoading(false)
    }

    const getGroupsByValue = async (value: string, method?: string) => {
        switch (method) {

            case 'search':
                if (value.trim()) {
                    const filtered = allGroups.filter(g => compareValues(g.name, value) )
                    setGroups(filtered)
                } else setGroups(allGroups)
                break

            case 'gender':
                if (value === 'all') setGroups(allGroups)
                else {
                    const filtered = allGroups.filter(g => g.gender === value)
                    setGroups(filtered)
                }
                break

            case 'generation':
                if (value === 'all') setGroups(allGroups)
                else {
                    const filtered = allGroups.filter(g => g.generation === Number(value))
                    setGroups(filtered)
                }
                break

            case 'company': {
                if (value === 'all') {
                    setGroups(allGroups)
                    break
                }

                const selectedId = Number(value)

                const filtered = allGroups.filter(g => {
                    if (g.company.id === selectedId) return true

                    if (
                        g.company.parent_company !== null &&
                        !Array.isArray(g.company.parent_company) &&
                        g.company.parent_company.id === selectedId
                    )
                        return true

                    return false
                })

                setGroups(filtered)
                break
            }


            default:
                setApiError({ isError: true, message: `Group filter method ${method} is not accepted.` })
        }

        setLoading(false)
    }

    return {
        groups,
        length,
        group,
        companies,
        genders,
        generations,
        getAllGroups,
        getGroupById,
        getGroupsByValue,
        loading,
        apiError,
    }
}

export default useGroups