import { toast } from "sonner"
import supabase from "../api/supabase"
import { useState } from "react"
import type { Gender, Generation, Group } from "../types/models"
import type { ApiError } from "../types/utils"
import { compareValues } from "../utils/StringUtils"

const useGroups = () => {

    const [ groups, setGroups ] = useState<Group[]>([])
    const [ allGroups, setAllGroups ] = useState<Group[]>([])
    const [ length, setLength ] = useState(0)

    const [ genders, setGenders ] = useState<Gender[]>([])
    const [ generations, setGenerations ] = useState<Generation[]>([])

    const [ loading, setLoading ] = useState(false)
    const [ apiError, setApiError ] = useState<ApiError>({ isError: false, message: '' })

    const getAllGroups = async (): Promise<Group[] | void> => {
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

        setGenders([...genderSet])
        setGenerations([...generationSet])

        setLoading(false)
        return data
    }

    const getGroupsByVenueId = async (id: number): Promise<void> => {

        setLoading(true)

        const { error, data } = await supabase.rpc('get_groups_by_venue', { venue_id: id })
        
        if (error) {
            setLoading(false)
            setApiError({ isError: true, message: error.message })
            console.error('[GroupHook] Error fetching groups data: ', error)
            toast.error('There was an error while loading the groups...')
            return   
        }

        const companyIds = data.map((d: { company: any }) => d.company)

        const { error: compError, data: companies } =  await supabase.from('companies').select('*, parent_company:companies(id, name)').in('id', companyIds)
        
        if (compError) {
            setLoading(false)
            setApiError({ isError: true, message: compError.message })
            console.error('[GroupHook] Error fetching groups data: ', compError)
            toast.error('There was an error while loading the groups...')
            return   
        }

        const parsed = data.map((d: { company: any }) => ({...d, company: companies.find(c => c.id === d.company)}))

        setGroups(parsed)
        setAllGroups(data)

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

    return { groups, length, genders, generations, getAllGroups, getGroupsByValue, getGroupsByVenueId, loading, apiError, }
}

export default useGroups