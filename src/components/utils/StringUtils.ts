const sanitizeString = (str: string): string => {
    return str.replace(/[^a-zA-Z0-9]/g, "").toLowerCase()
}

const compareValues = (value1: string, value2: string) => {
    value1 = value1.trim().toLowerCase()
    value2 = value2.trim().toLowerCase()
    return sanitizeString(value1).includes(value2) || value1.includes(value2)
}

export { sanitizeString, compareValues }