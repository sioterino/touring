import { useMemo, useState } from "react"
import type { Show } from "../types/models"
import type { ApiError } from "../types/utils"
import supabase from "../api/supabase"
import { toast } from "sonner"
import type { GroupsResponseDTO, TourResponseDTO } from "../types/dtos"

const useShows = () => {

    const [ shows, setShows  ] = useState<Show[]>([])

    const [ loading, setLoading ] = useState(false)
    const [ apiError, setApiError ] = useState<ApiError>({ isError: false, message: '' })

    const buildToursFromShows = (shows: Show[]): TourResponseDTO[] => {
        if (shows.length === 0) return []

        const map = new Map<number, TourResponseDTO>()

        for (const s of shows) {
            const t = s.tour
            const continent = s.venue.city.country.continent.name

            if (!map.has(t.id)) {

                let performedVenues = 0
                let totalBox = 0
                let totalAttendance = 0
                let reportedNights = 0
                let sumSold = 0
                let sumPrice = 0

                if (s.box_score) {
                    performedVenues += 1
                    totalBox += s.box_score
                    totalAttendance += s.attendance || 0
                    reportedNights += s.nights
                    sumSold += s.sold_percentage || 0
                    sumPrice += s.attendance ? s.box_score / s.attendance : 0
                }

                map.set(t.id, {
                    id: t.id,
                    name: t.name,
                    begin: t.begin,
                    end: t.end,
                    group: t.group,
                    tour: t.tour,
                    continents: [continent],

                    box_score: totalBox,
                    attendance: totalAttendance,
                    total_nights: s.nights,
                    reported_nights: reportedNights,
                    sum_venues: performedVenues,
                    sum_sold: sumSold,
                    sum_price: sumPrice
                })
                continue
            }

            const dto = map.get(t.id)!

            if (!dto.continents.includes(continent))
                dto.continents.push(continent)

            dto.total_nights += s.nights
            
            if (s.box_score) {
                dto.sum_venues += 1
                dto.box_score += s.box_score
                dto.attendance += s.attendance || 0
                dto.reported_nights += s.nights
                dto.sum_sold += s.sold_percentage || 0
                dto.sum_price += s.attendance ? s.box_score / s.attendance : 0
            }
        }
        return Array.from(map.values())
    }

    const buildGroupFromShow = (shows: Show[]): GroupsResponseDTO | null => {
        if (shows.length === 0) return null
        const group = shows[0].group

        let totalBox = 0
        let totalAttendance = 0
        let totalNights = 0
        let reportedNights = 0
        let soldPercentage = 0
        let performedVenues = 0
        let accTicketPrice = 0

        shows.forEach(s => {
            totalBox += s.box_score || 0
            totalNights += s.nights || 0
            
            if (s.box_score && s.attendance) {
                reportedNights += s.nights
                soldPercentage += s.sold_percentage || 0
                totalAttendance += s.attendance || 0
                performedVenues += 1
                accTicketPrice += s.box_score / s.attendance
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

            box_score: totalBox,
            avg_sold: soldPercentage / performedVenues,
            total_nights: totalNights,
            reported_nights: reportedNights,
            avg_box: totalBox / performedVenues,
            net_att: totalAttendance,
            avg_ticket: accTicketPrice / performedVenues,
        }
    }

    const tours = useMemo(() => buildToursFromShows(shows), [shows])
    const group = useMemo(() => buildGroupFromShow(shows), [shows])

    const getAllShowsByGroupId = async (id: number): Promise<void> => {
        setLoading(true)

        const { data, error } = await supabase
            .from('shows')
            .select("*, tour:tour(*), group:group(*, company:company(*, parent_company:parent_company(*))), venue:venue(*, city:city(*, country:country(*, continent:continent(*))))")
            .eq('group', id)

        if (error || data.length === 0) {
            setLoading(false)
            setApiError({ isError: true, message: error ? error.message : 'No data available' })
            console.error("[ShowsHook] Error fetching group's concert shows: ", error || 'No data available of the selected groups')
            toast.error('There was an error while trying to load the concert shows...')
            return
        }

        setShows(data)
        setLoading(false)
    }

    return { shows, tours, group, getAllShowsByGroupId, loading, apiError }

}

export default useShows