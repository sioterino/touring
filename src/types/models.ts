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

export type { Group, Gender, Generation, Company }