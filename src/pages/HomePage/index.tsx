import { useEffect } from "react"
import supabase from "../../api/supabase"

const HomePage = () => {

    const fetchGroups = async () => {

        const { error, data } = await supabase.from('groups').select('*') 

        if (error) {
            console.error('[HomePage] Error fetching groups data: ', error)
            return
        }

        console.log(data)

    }

    useEffect(() => { fetchGroups() }, [])

    return (
        <h1>Home Page</h1>
    )

}

export default HomePage
