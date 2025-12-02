import { useState } from "react"
import type { Gender, Generation, Tour } from "../types/models"
import type { ApiError } from "../types/utils"
import supabase from "../api/supabase"
import { toast } from "sonner"
import { compareValues } from "../utils/StringUtils"

const useTours = () => {

    const [ tours, setTours ] = useState<Tour[]>([])
    const [ allTours, setAllTours ] = useState<Tour[]>([])

    const [ loading, setLoading ] = useState(false)
    const [ apiError, setApiError ] = useState<ApiError>({ isError: false, message: '' })

    const [ types, setTypes ] = useState<string[]>([])
    const [ genders, setGenders ] = useState<Gender[]>([])
    const [ generations, setGenerations ] = useState<Generation[]>([])

    const getAllTours = async (): Promise<Tour[] | void> => {

        setLoading(true)

        const { data, error } = await supabase
            .from('tours')
            .select('*, group:groups(*)')
            .order('begin', { ascending: false })

        if (error) {
            setLoading(false)
            setApiError({ isError: true, message: error.message })
            console.error('[TourHook] Error fetching tours data: ', error)
            toast.error('There was an error while loading the tours...')
            return
        }

        setTours(data)
        setAllTours(data)

        const typeSet = new Set<string>()
        const genderSet = new Set<Gender>()
        const generationSet = new Set<Generation>()

        data.forEach((g) => {
            typeSet.add(g.tour)
            genderSet.add(g.group.gender)
            generationSet.add(g.group.generation)
        })

        setTypes([...typeSet])
        setGenders([...genderSet])
        setGenerations([...generationSet])

        setLoading(false)
        return data
    }

    const getToursByValue = async (value: string, method?: string): Promise<void> => {

        switch (method) {

             case 'search':
                if (value.trim()) {
                    const filtered = allTours.filter(t => compareValues(t.name, value) || compareValues(t.group.name, value) )
                    setTours(filtered)
                } else setTours(allTours)
                break

            case 'gender':
                if (value === 'all') setTours(allTours)
                else {
                    const filtered = allTours.filter(t => t.group.gender === value)
                    setTours(filtered)
                }
                break

            case 'generation':
                if (value === 'all') setTours(allTours)
                else {
                    const filtered = allTours.filter(t => t.group.generation === Number(value))
                    setTours(filtered)
                }
                break

            case 'type':
                if (value === 'all') setTours(allTours)
                else {
                    const filtered = allTours.filter(t => t.tour === value)
                    setTours(filtered)
                }
                break
            
            default:
                setApiError({ isError: true, message: `Tour filter method ${method} is not accepted.` })
        }
    }

    return { tours, allTours, types, genders, generations, getAllTours, getToursByValue, loading, apiError }

}

export default useTours