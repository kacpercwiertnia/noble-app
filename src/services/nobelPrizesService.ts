import { NobelPrize, SortingParams } from "../interfaces/nobelPrizeInterface";

type lng = "en" | "se" | "no";
const lngs = ["en", "se", "no"]
type col = "categoryFullName" | "dateAwarded" | "prizeAmount"
const TableHeaders: Array<SortingParams> = [
    {title: "Kategoria", columnName: "categoryFullName", ascSort: "categoryFullNameasc", descSort: "categoryFullNamedesc"},
    {title: "Data przyznania", columnName: "dateAwarded", ascSort: "dateAwardedasc", descSort: "dateAwardeddesc"},
    {title: "Kwota nagordy", columnName: "prizeAmount", ascSort: "prizeAmountasc", descSort: "prizeAmountdesc"}]

export const getNobelPrizes = async () => {
    return fetch("https://api.nobelprize.org/2.1/nobelPrizes", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    }).then((res => res.json()))
};

export const getNoblePrizeUniqueYears = (data: Array<NobelPrize>) => {
    let years = data.map((prize: NobelPrize) => prize.awardYear)
    let uniqueYears = years.filter((value: string, index: number) => years.indexOf(value) === index)

    return uniqueYears;
}

export const getNobelPrizesFromGivenYear = (data: Array<NobelPrize>, year: string | undefined) =>{
    let prizesFromGivenYear = data.filter((prize: NobelPrize) => prize.awardYear === year);
    prizesFromGivenYear.forEach((element) => {
        if(element.dateAwarded === undefined){
            element.dateAwarded = "Brak danych"
        }
    })

    return prizesFromGivenYear;
}

export const formatNoblePrizeDate = (data: NobelPrize) => {
    let formatedYear = data.dateAwarded?.split("-").reverse().join(".");

    return formatedYear;
}

export const formatNoblePrizeAmount = (data: NobelPrize) => {
    let formatedAmount = data.prizeAmount.toLocaleString("fr");
    
    return formatedAmount;
}

export const getCategoryNameByLanguage = (data: NobelPrize, language: string | undefined) => {
    let categoryName = "-"

    if(language) {
        categoryName = data.categoryFullName[language as lng]
    }

    return categoryName;
}

export const sortNobelPrizes = (data: Array<NobelPrize>, column: string, direction: string, language: string | undefined) => {
    let sortedData: Array<NobelPrize> = []
    
    if(column !== "categoryFullName")
        if(direction === "asc")
            sortedData = data.sort((a,b) => (a[column as col] > b[column as col]) ? 1 : ((a[column as col] < b[column as col]) ? -1 : 0))
        else
            sortedData = data.sort((a,b) => (a[column as col] > b[column as col]) ? -1 : ((a[column as col] < b[column as col]) ? 1 : 0))
    else
        if(direction === "asc")
            sortedData = data.sort((a,b) => (a.categoryFullName[language as lng] > b.categoryFullName[language as lng]) ? 1 : ((a.categoryFullName[language as lng] < b.categoryFullName[language as lng]) ? -1 : 0))
        else
            sortedData = data.sort((a,b) => (a.categoryFullName[language as lng] > b.categoryFullName[language as lng]) ? -1 : ((a.categoryFullName[language as lng] < b.categoryFullName[language as lng]) ? 1 : 0))
    
    return sortedData;
}

export const isLanguageValid = (language: string | undefined ) => {

    return language && lngs.includes(language);
}

export const isYearValid = (data: Array<NobelPrize>, year: string | undefined ) => {
    let uniqueYears = getNoblePrizeUniqueYears(data);
    
    return year && uniqueYears.includes(year);
}

export const getSortingParams = () => {
    return TableHeaders;
}