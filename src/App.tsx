import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import PrizePage from './pages/PrizePage';
import MainPage from './pages/MainPage';
import Eror404Page from './pages/Eror404Page';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<MainPage/>}></Route>
        <Route path='/nagrody/:language/:year' element={<PrizePage/>}></Route>
        <Route path='/404' element={<Eror404Page/>}></Route>
        <Route path='*' element={<Navigate to='/404'/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
