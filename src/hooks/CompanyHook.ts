import { toast } from "sonner"
import supabase from "../api/supabase"
import { useState } from "react"
import type { Company } from "../types/models"
import type { ApiError } from "../types/utils"

const useCompanies = () => {

    const [ companies, setCompanies ] = useState<Company[]>([])

    const [ loading, setLoading ] = useState(false)
    const [ apiError, setApiError ] = useState<ApiError>({ isError: false, message: '' })

    const getAllCompanies = async () => {
        setLoading(true)

        const { data , error } = await supabase
            .from('companies')
            .select('id, name, colors, parent_company(id, name, colors)')
            .order('name', { ascending: true });


        if (error) {
            setLoading(false)
            setApiError({ isError: true, message: error.message })
            console.error('[CompanyHook] Error fetching companies data: ', error)
            toast.error('There was an error while loading companies...')
            return
        }

        setCompanies(data)
        setLoading(false)
    }

    return { companies, getAllCompanies, loading, apiError }

}

export default useCompanies