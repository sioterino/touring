import { useEffect, useState } from "react"
import supabase from "../../api/supabase"
import ProfilePicture from "../../components/ProfileImage"
import Sidebar from "../../components/Sidebar"

interface Group {
    id: number
    name: string
    debut: string | Date
    company: number
    gender: string
    generation: number
    colors: string[]
}

const HomePage = () => {

    const [ groups, setGroups ] = useState<Group[]>([])

    const fetchGroups = async () => {
        const { error, data } = await supabase.from('groups').select('*') 

        if (error) {
            console.error('[HomePage] Error fetching groups data: ', error)
            return
        }

        setGroups(data)
    }

    useEffect(() => { fetchGroups() }, [])

    return (
        <div>
            <Sidebar />
            {/* { groups.map((group, key) => (<ProfilePicture key={key} name={group.name} />)) } */}
        </div>
    )

}

export default HomePage
