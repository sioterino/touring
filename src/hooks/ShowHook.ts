import { useMemo, useState } from "react"
import type { Country, Show } from "../types/models"
import type { ApiError } from "../types/utils"
import supabase from "../api/supabase"
import { toast } from "sonner"
import type { GroupsResponseDTO, TourResponseDTO } from "../types/dtos"

interface RegionOption {
    text: string
    value: string
    group: string
}

const useShows = () => {

    const [ shows, setShows  ] = useState<Show[]>([])
    const [ allShows, setAllShows  ] = useState<Show[]>([])

    const [ loading, setLoading ] = useState(false)
    const [ apiError, setApiError ] = useState<ApiError>({ isError: false, message: '' })

    const [ regions, setRegions ] = useState<RegionOption[]>([])

    const buildToursFromShows = (shows: Show[]): TourResponseDTO[] => {
        if (shows.length === 0) return []

        const map = new Map<number, TourResponseDTO>()

        for (const s of shows) {
            const t = s.tour
            const continent = s.venue.city.country.continent.name

            if (!map.has(t.id)) {
                
                const totalNights = s.nights
                let reportedNights = 0
                
                let available = 0;
                let totalAttendance = 0
                let totalBox = 0

                if (s.box_score) {
                    reportedNights += s.nights
                    
                    available += s.attendance && s.sold_percentage ? s.attendance / s.sold_percentage : 0
                    totalAttendance += s.attendance || 0
                    totalBox += s.box_score

                }

               map.set(t.id, {
                    id: t.id,
                    name: t.name,
                    begin: t.begin,
                    end: t.end,
                    group: t.group,
                    tour: t.tour,
                    continents: [continent],

                    total_nights: totalNights,
                    reported_nights: reportedNights,

                    available: available,
                    attendance: totalAttendance,
                    box_score: totalBox,

                    avg_ticket: totalBox / totalAttendance,
                    avg_sold: totalAttendance / available,
                    avg_box: totalBox / reportedNights,

                })
                continue
            }

            const dto = map.get(t.id)!

            if (!dto.continents.includes(continent))
                dto.continents.push(continent)

            dto.total_nights += s.nights
            
            if (s.box_score) {
                dto.reported_nights += s.nights

                if (s.attendance && s.sold_percentage) {
                    const available = s.attendance / s.sold_percentage
                    dto.available! += available
                }

                dto.box_score += s.box_score
                dto.attendance! += s.attendance!

                dto.avg_ticket = dto.box_score / dto.attendance!
                dto.avg_sold = dto.attendance! / dto.available!
                dto.avg_box = dto.box_score / dto.reported_nights
            }

        }
        return Array.from(map.values())
    }

    const buildGroupFromShow = (shows: Show[]): GroupsResponseDTO | null => {
        if (shows.length === 0) return null

        const group = shows[0].group

        let totalNights = 0
        let reportedNights = 0

        let totalAvailable = 0
        let totalAttendance = 0
        let totalBox = 0

        shows.forEach(s => {
            totalBox += s.box_score || 0
            totalNights += s.nights || 0

            if (s.box_score) {
                const nights = s.nights || 1

                reportedNights += nights
                totalAttendance += s.attendance || 0

                if (s.attendance && s.sold_percentage) {
                    const available = s.attendance / s.sold_percentage
                    totalAvailable += available
                }
            }
        })

        return {
            id: group.id,
            name: group.name,
            debut: group.debut,
            company: group.company,
            gender: group.gender,
            generation: group.generation,
            colors: group.colors,

            total_nights: totalNights,
            reported_nights: reportedNights,
            
            available: totalAvailable,
            attendance: totalAttendance || null,
            box_score: totalBox,

            avg_ticket: totalAttendance > 0 ? totalBox / totalAttendance : null,
            avg_sold: totalAvailable > 0 ? totalAttendance / totalAvailable : null,
            avg_box: reportedNights > 0 ? totalBox / reportedNights : null,
        }
    }

    const tours = useMemo(() => buildToursFromShows(shows), [shows])
    const group = useMemo(() => buildGroupFromShow(shows), [shows])

    const getAllShowsByGroupId = async (id: number): Promise<Show[] | void> => {
        setLoading(true)

        const { data, error } = await supabase
            .from('shows')
            .select("*, tour:tour(*), group:group(*, company:company(*, parent_company:parent_company(*))), venue:venue(*, city:city(*, country:country(*, continent:continent(*))))")
            .eq('group', id)
            .order('day_1', { ascending: false })

        if (error || data.length === 0) {
            setLoading(false)
            setApiError({ isError: true, message: error ? error.message : 'No data available' })
            console.error("[ShowsHook] Error fetching group's concert shows: ", error || 'No data available for the selected group')
            toast.error('There was an error while trying to load the concert shows...')
            return
        }
        
        setShows(data)
        setAllShows(data)

        await getRegionOptions(data)

        setLoading(false)
        return data
    }

    const getAllShowsByTourId = async (id: number): Promise<Show[] | void> => {
        setLoading(true)

        const { data, error } = await supabase
            .from('shows')
            .select("*, tour:tour(*, group:groups(*, company:company(*, parent_company:parent_company(*)))), group:group(*, company:company(*, parent_company:parent_company(*))), venue:venue(*, city:city(*, country:country(*, continent:continent(*))))")
            .eq('tour', id)
            .order('day_1', { ascending: true })

        if (error || data.length === 0) {
            setLoading(false)
            setApiError({ isError: true, message: error ? error.message : 'No data available' })
            console.error("[ShowsHook] Error fetching tour's concert shows: ", error || 'No data available for the selected tour')
            toast.error('There was an error while trying to load the concert shows...')
            return
        }
        
        setShows(data)
        setAllShows(data)

        await getRegionOptions(data)

        setLoading(false)
        return data
    }

    const getRegionOptions = async (data: Show[]): Promise<void> => {
        const aux = new Map<string, RegionOption>()
        aux.set("Worldwide", { text: "Worldwide", value: "Worldwide", group: "_nogroup_" })
        const { data: countries, error: countriesError } = await supabase.from('countries').select('*').in('id', [1, 2, 3])

        if (countriesError) {
            setLoading(false)
            setApiError({ isError: true, message: countriesError.message })
            console.error("[ShowsHook] Error fetching targeted countries: ", countriesError.message)
            toast.error("There was an error while trying to fetch targeted countries for filtering...")
            return
        }

        const targetCountries = countries.map(d => d.name)

        data.forEach(s => {
            const country = s.venue.city.country as Country

            aux.set(country.continent.name, { text: country.continent.name, value: country.continent.name, group: "Continent" })

            if (targetCountries.includes(country.name)) 
                aux.set(country.name, { text: country.name, value: country.name, group: "Country" })            
        })

        setRegions(Array.from(aux.values()))
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const filterShowsByRegion = async (value: string, _method?: string): Promise<void> => {

        setLoading(true)

        const { data: countriesObj, error: countryError } = await supabase.from('countries').select('*').in('id', [1, 2, 3])
        const { data: continentsObj, error: continentError } = await supabase.from('continents').select('*')

        if (countryError || continentError) {
            setLoading(false)
            const msg = countryError ? countryError.message : continentError?.message || 'There was an error while trying to fetch continents from the dataset'
            setApiError({ isError: true, message: msg })
            console.error("[ShowsHook] Error filtering group's concert shows: ", msg)
            toast.error("There was an error while trying to filter the artist's shows...")
            return
        }

        const countries = countriesObj.map(d => d.name)
        const continents = continentsObj.map(d => d.name)

        if (value === 'Worldwide') setShows(allShows)

        else if (countries.includes(value)) {
            const filtered = allShows.filter(s => s.venue.city.country.name === value)
            setShows(filtered)
        
        } else if (continents?.includes(value)) {
            const filtered = allShows.filter(s => s.venue.city.country.continent.name === value)
            setShows(filtered)

        } else toast.error("There was an error filtering the group's shows...")

        setLoading(false)

    }

    const filterOnlyReportedShows = (filter: boolean) => {

        if (filter) {
            const filtered = allShows.filter(s => s.box_score !== null)
            setShows(filtered)
        } else setShows(allShows)

    }

    const getShowsByVenueId = async (id: number): Promise<void> => {
        setLoading(true)

        const { data, error } = await supabase
            .from('shows')
            .select("*, tour:tour(*, group:groups(*, company:company(*, parent_company:parent_company(*)))), group:group(*, company:company(*, parent_company:parent_company(*))), venue:venue(*, city:city(*, country:country(*, continent:continent(*))))")
            .eq('venue', id)
            .order('attendance', { ascending: false })
            .order('attendance', { ascending: false, foreignTable: undefined })  

        if (error || data.length === 0) {
            setLoading(false)
            setApiError({ isError: true, message: error ? error.message : 'No data available' })
            console.error("[ShowsHook] Error fetching tour's concert shows: ", error || 'No data available for the selected tour')
            toast.error('There was an error while trying to load the concert shows...')
            return
        }
        
        setShows(data)
        setAllShows(data)

        await getRegionOptions(data)

        setLoading(false)
    }

    return { shows, allShows, tours, group, regions, getAllShowsByGroupId, getAllShowsByTourId, filterShowsByRegion, filterOnlyReportedShows, getShowsByVenueId, loading, apiError }

}

export default useShows