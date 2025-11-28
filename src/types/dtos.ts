import type { Company, Gender, Generation, Group } from "./models"

interface TourResponseDTO {
    id: number
    name: string
    begin: string
    end: string
    group: Group
    tour: string
    continents: string[]

    box_score: number
    attendance: number
    total_nights: number
    reported_nights: number
    sum_venues: number
    sum_sold: number
    sum_price: number
}

interface GroupsResponseDTO {
    id: number
    name: string
    debut: string
    company: Company
    gender: Gender
    generation: Generation
    colors?: string[]

    avg_ticket: number
    box_score: number
    avg_box: number
    net_att: number
    avg_sold: number
    total_nights: number
    reported_nights: number
}

export type { TourResponseDTO, GroupsResponseDTO }