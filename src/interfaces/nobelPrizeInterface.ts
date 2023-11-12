export interface NobelPrize {
    awardYear: string,
    categoryFullName: {
        en: string,
        no: string,
        se: string
    },
    dateAwarded: string,
    prizeAmount: number
}

export interface SortingParams {
    title: string,
    columnName: string,
    ascSort: string,
    descSort: string
}