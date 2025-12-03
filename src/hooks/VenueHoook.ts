import { useState } from "react"
import type { City, Continent, Country, Venue } from "../types/models"
import type { ApiError } from "../types/utils"
import supabase from "../api/supabase"
import { toast } from "sonner"
import { compareValues } from "../utils/StringUtils"

const useVenues = () => {

    const [ venues, setVenues ] = useState<Venue[]>([])
    const [ venue, setVenue ] = useState<Venue | null>(null)
    const [ allVenues, setAllVenues ] = useState<Venue[]>([])
    
    const [ cities, setCities ] = useState<City[]>([])
    const [ countries, setCountries ] = useState<Country[]>([])
    const [ continents, setContinents ] = useState<Continent[]>([])

    const [ loading, setLoading ] = useState(false)
    const [ apiError, setApiError ] = useState<ApiError>({ isError: false, message: '' })


    const getAllVenues = async (): Promise<void> => {
        
        setLoading(true)
        
        const { data, error } = await supabase
            .from('venues')
            .select('*, city:cities(id, name, country:countries(id, name, continent:continents(id, name)))')
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .order('name', { ascending: true }) as { data: Venue[], error: any }
        
        if (error) {
            setLoading(false)
            setApiError({ isError: true, message: error.message })
            console.error("[VenuesHook] Couldn't fetch venues from database: ", error.message)
            toast.error('An error happened while trying to fetch venues from the database')
            return
        }

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { data: stats, error: statsError } = await supabase.rpc("get_venue_show_stats")  as { data: { venue_id: number, shows: number, groups: number }[], error: any }
        
        if (statsError) {
            setLoading(false)
            setApiError({ isError: true, message: statsError.message })
            console.error("[VenuesHook] Couldn't fetch venues from database: ", statsError.message)
            toast.error('An error happened while trying to fetch venues from the database')
            return
        }

        const statsMap = new Map(stats.map(s => [s.venue_id, s]))

        const citySet = new Map<number, City>()
        const countrySet = new Map<number, Country>()
        const continentSet = new Map<number, Continent>()

        const parsed = data.map((d) => {
            const stat = statsMap.get(d.id)

            const groups = stat?.groups ?? 0
            const shows = stat?.shows ?? 0

            const city = d.city
            const country = city.country
            const continent = country.continent

            citySet.set(city.id, city)
            countrySet.set(country.id, country)
            continentSet.set(continent.id, continent)

            return { ...d, groups, shows }
        })

        setCities([...citySet.values()])
        setCountries([...countrySet.values()])
        setContinents([...continentSet.values()])

        parsed.sort((a, b) => b.shows - a.shows)

        setVenues(parsed)
        setAllVenues(parsed)
        
        setLoading(false)
    }

    const getVenueById = async (id: number): Promise<void> => {
        setLoading(true)
        
        const { data, error } = await supabase
            .from('venues')
            .select('*, city:cities(id, name, country:countries(id, name, continent:continents(id, name)))')
            .eq('id', id)
        
        if (error) {
            setLoading(false)
            setApiError({ isError: true, message: error.message })
            console.error("[VenuesHook] Couldn't fetch venues from database: ", error.message)
            toast.error('An error happened while trying to fetch venues from the database')
            return
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { data: stats, error: statsError } = await supabase.rpc("get_venue_show_stats")  as { data: { venue_id: number, shows: number, groups: number }[], error: any }
        
        if (statsError) {
            setLoading(false)
            setApiError({ isError: true, message: statsError.message })
            console.error("[VenuesHook] Couldn't fetch venues from database: ", statsError.message)
            toast.error('An error happened while trying to fetch venues from the database')
            return
        }

        const statsMap = new Map(stats.map(s => [s.venue_id, s]))

        const parsed = data.map((d) => {
            const stat = statsMap.get(d.id)

            const groups = stat?.groups ?? 0
            const shows = stat?.shows ?? 0

            return { ...d, groups, shows }
        })

        setVenue(parsed[0])
        setLoading(false)
    }

    const filterVenuesByValue = async (value: string, method?: string): Promise<void> => {
        
        if (value === 'all' && method !== 'search') {
            setVenues(allVenues)
            return
        }

        switch(method) {

            case 'search': {
                if (value.trim()) {
                    const filtered = allVenues.filter(v => compareValues(v.name, value) )
                    setVenues(filtered)
                } else setVenues(allVenues)
                break
            }
            
            case 'city': {
                const filtered = allVenues.filter(v => v.city.id === Number(value) )
                setVenues(filtered)
                break
            }
            
            case 'country': {
                const filtered = allVenues.filter(v => v.city.country.id === Number(value) )
                setVenues(filtered)
                break
            }
            
            case 'continent': {
                const filtered = allVenues.filter(v => v.city.country.continent.id === Number(value) )
                setVenues(filtered)
                break
            }

            default: setApiError({ isError: true, message: `Group filter method ${method} is not accepted.` })

        }
    }

    return { venues, venue, allVenues, cities, countries, continents, getAllVenues, filterVenuesByValue, getVenueById, loading, apiError }

}

export default useVenues