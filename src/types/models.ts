type Gender = 'female' | 'male' | 'coed'
 
type Generation = 1 | 2 | 3 | 4 | 5

interface Group {
    id: number
    name: string
    debut: string
    company: Company
    gender: Gender
    generation: Generation
    colors?: string[]
}

interface Company {
    id: number
    name: string
    colors?: string[]
    parent_company: Company | ParentCompany[] | null
}

interface ParentCompany {
    id: number
    name: string
}

interface Tour {
    id: number
    name: string
    begin: string
    end: string
    group: Group
    tour: string
}

interface Continent {
    id: number
    name: string
}

interface Country {
    id: number
    name: string
    continent: Continent
}

interface City {
    id: number
    name: string
    country: Country
}

interface Venue {
    id: number
    name: string
    city: City
}

interface Show {
    id: number
    group: Group
    tour: Tour
    day_1: string
    day_2?: string
    day_3?: string
    day_4?: string
    day_5?: string
    venue: Venue
    nights: number
    attendance: number | null
    sold_percentage: number | null
    box_score: number | null
    reported: Reported
}

type Reported = null | 'touring data' | 'touring asia' | 'touring kpop' | 'pollstar'

export type { Group, Gender, Generation, Company, Tour, Continent, Country, City, Venue, Show, Reported }