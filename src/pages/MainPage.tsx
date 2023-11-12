import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getNobelPrizes, getNoblePrizeUniqueYears } from '../services/nobelPrizesService'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Button from '@mui/material/Button';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';

const MainPage = () => {
    const navigate = useNavigate();
    const [year, setYear] = useState<string>("");
    const [language, setLanguage] = useState<string>("en");
    const [nobelPrizeAawardYears, setNobelPrizeAawardYears] = useState<string[]>([]);
   
    useEffect(() => {
        getNobelPrizes()
            .then(data => setNobelPrizeAawardYears(getNoblePrizeUniqueYears(data.nobelPrizes)))
            .catch(error => console.log(error));
    }, [])

    const handleYearChange = (event: SelectChangeEvent) => {
        setYear(event.target.value as string);
    };

    const handleLanguageChange = (event: any) => {
        setLanguage(event.target.value)
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        navigate('/nagrody/'+language+'/'+year)
      };

    return (
       <Box component="form" onSubmit={handleSubmit} sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
            <InputLabel id="year-select-label">Rok</InputLabel>
            <Select
            labelId="year-select-label"
            id="year-select"
            value={year}
            label="Rok"
            onChange={handleYearChange}
            >{nobelPrizeAawardYears.map((value, index) => 
                <MenuItem key={index} value={value}>{value}</MenuItem>
            )}
            </Select>
            <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={language}
                onChange={handleLanguageChange}
                className='radio-button-group'
            >
                <FormControlLabel value="en" control={<Radio />} className={language === "en" ? "selectedLanguage" : "unselectedLanguage"} label="🇬🇧" />
                <FormControlLabel value="no" control={<Radio />} className={language === "no" ? "selectedLanguage" : "unselectedLanguage"} label="🇳🇴" />
                <FormControlLabel value="se" control={<Radio />} className={language === "se" ? "selectedLanguage" : "unselectedLanguage"} label="🇸🇪" />
            </RadioGroup>
            <Button disabled={year === ""} variant="outlined" type="submit">Wyszukaj Nagordy</Button>
        </FormControl>
     </Box>
    );
};

export default MainPage;