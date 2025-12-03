import { useState } from "react"
import type { Venue } from "../types/models"
import type { ApiError } from "../types/utils"
import supabase from "../api/supabase"
import { toast } from "sonner"


const useVenues = () => {

    const [ venues, setVenues ] = useState<Venue[]>()
    const [ allVenues, setAllVenues ] = useState<Venue[]>()

    const [ loading, setLoading ] = useState(false)
    const [ apiError, setApiError ] = useState<ApiError>({ isError: false, message: '' })

    const getAllVenues = async (): Promise<void> => {
        
        setLoading(true)
        
        const { data, error } = await supabase
            .from('venues')
            .select('*, city:cities(id, name, country:countries(id, name, continent:continents(id, name)))')
            .order('name', { ascending: true })
        
        if (error) {
            setLoading(false)
            setApiError({ isError: true, message: error.message })
            console.error("[VenuesHook] Couldn't fetch venues from database: ", error.message)
            toast.error('An error happened while trying to fetch venues from the database')
            return
        }

        setVenues(data)
        setAllVenues(data)
        
        setLoading(false)
    }

    return { venues, allVenues, getAllVenues, loading, apiError }

}

export default useVenues