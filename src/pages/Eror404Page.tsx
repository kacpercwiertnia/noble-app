import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const Eror404Page = () => {
    const navigate = useNavigate();

    const handleOnClick = () => {
        navigate('/')
    }

    return (
        <div className="box404">
            <Typography variant="h1" gutterBottom>Zabłądziłeś?</Typography>
            <Button onClick={handleOnClick} variant="outlined">Zabierz mnie stąd</Button>
        </div>
    );
};

export default Eror404Page;