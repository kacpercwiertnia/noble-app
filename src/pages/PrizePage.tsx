import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { NobelPrize, SortingParams } from '../interfaces/nobelPrizeInterface'
import { getNobelPrizes, getNobelPrizesFromGivenYear, formatNoblePrizeAmount, formatNoblePrizeDate, getCategoryNameByLanguage, sortNobelPrizes, isLanguageValid, isYearValid, getSortingParams} from '../services/nobelPrizesService'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

const PrizePage = () => {
    const navigate = useNavigate();
    const {year, language} = useParams();
    const [nobelPrizes, setNobelPrizes] = useState<NobelPrize[]>([]);
    const [currentSort, setCurrentSort] = useState<string>("");
    const TableHeaders: Array<SortingParams> = getSortingParams();

    useEffect(() => {
        getNobelPrizes()
            .then(data =>{
                setNobelPrizes(getNobelPrizesFromGivenYear(data.nobelPrizes, year));
                
                if( !isLanguageValid(language) || !isYearValid(data.nobelPrizes, year) ){
                    navigate('/404');
                }
            })
            .catch(error => console.log(error));
    }, [year, language, navigate])

    const handleSortTable = (column: string, direction: string) => {
        setCurrentSort(column+direction)
        setNobelPrizes(sortNobelPrizes(nobelPrizes, column, direction, language));
    }

    const handleOnClick = () => {
        navigate('/')
    }

    return (
        <>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell>Rok przyznania</TableCell>
                    {TableHeaders.map((element, index) =>
                        <TableCell key={index} align="right">{element.title}<span className={currentSort === element.ascSort ? "selectedSort" : "unselectedSort"} onClick={()=>handleSortTable(element.columnName, "asc")}>⬆️</span><span className={currentSort === element.descSort ? "selectedSort" : "unselectedSort"} onClick={()=>handleSortTable(element.columnName, "desc")}>⬇️</span></TableCell>
                    )}
                </TableRow>
                </TableHead>
                <TableBody>
                {nobelPrizes.map((prize, index) => (
                    <TableRow
                    key={index}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                    <TableCell>{prize.awardYear}</TableCell>
                    <TableCell align="right">{getCategoryNameByLanguage(prize, language)}</TableCell>
                    <TableCell align="right">{formatNoblePrizeDate(prize)}</TableCell>
                    <TableCell align="right">{formatNoblePrizeAmount(prize)}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
        <Button onClick={handleOnClick} variant="contained">Powrót</Button>
        </>
    );
};

export default PrizePage;