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
    const [ unreportedShows, setUnreportedShows  ] = useState<Show[]>([])
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
            const nights = s.nights || 0
            const attendance = s.attendance || 0

            if (!map.has(t.id)) {
            map.set(t.id, {
                id: t.id,
                name: t.name,
                begin: t.begin,
                end: t.end,
                group: t.group,
                tour: t.tour,
                continents: [continent],

                total_nights: 0,
                reported_nights: 0,

                sold_reported_nights: 0,
                box_reported_nights: 0,

                attendance: 0,
                sold_attendance: 0,
                box_attendance: 0,

                available: 0,
                box_score: 0,

                avg_ticket: null,
                avg_sold: null,
                avg_box: null,
            })
            }

            const dto = map.get(t.id)!

            if (!dto.continents.includes(continent))
            dto.continents.push(continent)


            dto.total_nights += nights
            dto.attendance! += attendance

            // ---------- Sold-based ----------
            if (attendance && s.sold_percentage) {
            const perNightAttendance = attendance / nights
            const perNightCapacity = perNightAttendance / s.sold_percentage
            const totalCapacity = perNightCapacity * nights

            dto.sold_attendance! += attendance
            dto.available! += totalCapacity
            dto.sold_reported_nights += nights
            }

            // ---------- Box-based ----------
            if (s.box_score) {
            dto.box_attendance! += attendance
            dto.box_score += s.box_score
            dto.box_reported_nights += nights
            }

            if (s.box_score || s.attendance)
                dto.reported_nights += nights

            // ---------- Averages ----------
            dto.avg_ticket = dto.box_attendance! > 0 ? dto.box_score / dto.box_attendance! : null
            dto.avg_sold = dto.available! > 0 ? Math.min(dto.sold_attendance! / dto.available!, 1) : null
            dto.avg_box = dto.box_reported_nights > 0 ? dto.box_score / dto.box_reported_nights : null
        }

        return Array.from(map.values())
    }

    const buildGroupFromShows = (shows: Show[]): GroupsResponseDTO | null => {
        if (shows.length === 0) return null

        const group = shows[0].group

        let totalNights = 0
        let reportedNights = 0

        let soldReportedNights = 0
        let boxReportedNights = 0

        let totalAttendance = 0
        let soldAttendance = 0
        let boxAttendance = 0

        let totalAvailable = 0
        let totalBox = 0

        shows.forEach(s => {
            const nights = s.nights || 0
            const attendance = s.attendance || 0

            totalNights += nights
            totalAttendance += attendance

            // ---------- Sold-based ----------
            if (attendance && s.sold_percentage) {
            const perNightAttendance = attendance / nights
            const perNightCapacity = perNightAttendance / s.sold_percentage
            const totalCapacity = perNightCapacity * nights

            soldAttendance += attendance
            totalAvailable += totalCapacity
            soldReportedNights += nights
            }

            // ---------- Box-based ----------
            if (s.box_score) {
            boxAttendance += attendance
            totalBox += s.box_score
            boxReportedNights += nights
            }

            if (s.box_score || s.attendance)
                reportedNights += nights
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

            sold_reported_nights: soldReportedNights,
            box_reported_nights: boxReportedNights,

            attendance: totalAttendance || null,
            sold_attendance: soldAttendance || null,
            box_attendance: boxAttendance || null,

            available: totalAvailable,
            box_score: totalBox,

            avg_ticket: boxAttendance > 0 ? totalBox / boxAttendance : null,
            avg_sold: totalAvailable > 0 ? Math.min(soldAttendance / totalAvailable, 1) : null,
            avg_box: boxReportedNights > 0 ? totalBox / boxReportedNights : null,
        }
    }

    const tours = useMemo(() => buildToursFromShows(shows), [shows])
    const group = useMemo(() => buildGroupFromShows(shows), [shows])

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

    const filterShowsByRegion = async (value: string, _method?: string, showOnlyReported?: boolean): Promise<void> => {
        
        if (_method !== 'region') return;

        setLoading(true);

        const { data: countriesObj, error: countryError } = await supabase.from('countries').select('*').in('id', [1, 2, 3]);
        const { data: continentsObj, error: continentError } = await supabase.from('continents').select('*');

        if (countryError || continentError) {
            setLoading(false);
            const msg = countryError?.message || continentError?.message || 'Error fetching regions';
            setApiError({ isError: true, message: msg });
            return;
        }

        const countries = countriesObj.map(d => d.name);
        const continents = continentsObj.map(d => d.name);

        let regionFiltered = allShows;

        if (value !== 'Worldwide') {
            if (countries.includes(value))
                regionFiltered = allShows.filter(s => s.venue.city.country.name === value);

            else if (continents.includes(value)) 
                regionFiltered = allShows.filter(s => s.venue.city.country.continent.name === value);
        }

        const reportedShows = regionFiltered.filter(s => s.attendance != null && s.attendance > 0);
        const unreported = regionFiltered.filter(s => s.attendance == null || s.attendance === 0);

        setUnreportedShows(unreported);
        setShows(showOnlyReported ? reportedShows : regionFiltered);

        setLoading(false);
    };


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

    return { shows, unreportedShows, allShows, tours, group, regions, getAllShowsByGroupId, getAllShowsByTourId, filterShowsByRegion, getShowsByVenueId, loading, apiError }

}

export default useShows