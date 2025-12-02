import { toast } from "sonner"
import supabase from "../api/supabase"
import { useEffect, useState } from "react"
import type { Company } from "../types/models"
import type { ApiError } from "../types/utils"

const useCompanies = () => {

    const [ companies, setCompanies ] = useState<Company[]>([])

    const [ loading, setLoading ] = useState(false)
    const [ apiError, setApiError ] = useState<ApiError>({ isError: false, message: '' })

    useEffect(() => { console.log('companies: ', companies) }, [companies])

    const getAllCompanies = async (): Promise<Company[] | void> => {
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

        console.log('data: ', data)

        // ts thinks supabase returns a ParentCompany[] for some reason, even though it
        // doesn't, so we have to override this with this horrendous line of code here <3
        setCompanies(
            data.map(c => ({ ...c, parent_company: Array.isArray(c.parent_company) ? c.parent_company[0] : c.parent_company }))
        )
        setLoading(false)
        return data.map(c => ({ ...c, parent_company: Array.isArray(c.parent_company) ? c.parent_company[0] : c.parent_company }))
    }

    return { companies, getAllCompanies, loading, apiError }

}

export default useCompanies