import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './loginPage/LoginPage';
import RegisterPage from './registerPage/RegisterPage';

function App() {
    const [token, setToken] = useState('');
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<RegisterPage />} />
                <Route path='/loginPage' element={<LoginPage setToken={setToken} />} />
                <Route path='/chatPage' element={ !token ?
                <ChatPage token={token} /> :
                <LoginPage setToken={setToken} />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App