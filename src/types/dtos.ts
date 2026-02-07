import type { Company, Gender, Generation, Group } from "./models"

interface StatsDTO {
    total_nights: number
    reported_nights: number
    box_reported_nights: number
    sold_reported_nights: number
    
    attendance: number | null
    sold_attendance: number | null
    box_attendance: number | null

    available: number | null
    box_score: number
    
    avg_ticket: number | null
    avg_sold: number | null
    avg_box: number | null
}

interface TourResponseDTO extends StatsDTO {
    id: number
    name: string
    begin: string
    end: string
    group: Group
    tour: string
    continents: string[]
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