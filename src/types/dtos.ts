import type { Company, Gender, Generation, Group } from "./models"

interface StatsDTO {
    avg_ticket: number | null
    box_score: number
    avg_box: number | null
    attendance: number | null
    avg_sold: number | null
    reported_nights: number
    total_nights: number
}

interface TourResponseDTO extends StatsDTO {
    id: number
    name: string
    begin: string
    end: string
    group: Group
    tour: string
    continents: string[]

    sum_venues: number
    sum_sold: number
    sum_price: number
}

interface GroupsResponseDTO extends StatsDTO {
    id: number
    name: string
    debut: string
    company: Company
    gender: Gender
    generation: Generation
    colors?: string[]
}


export type { TourResponseDTO, GroupsResponseDTO, StatsDTO }