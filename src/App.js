import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './loginPage/LoginPage';
import RegisterPage from './registerPage/RegisterPage';

function App() {
    const [token, setToken] = useState('');
    const [myUsername, setMyUsername] = useState(null);
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<RegisterPage />} />
                <Route path='/loginPage' element={<LoginPage setToken={setToken} setMyUsername={setMyUsername} />} />
                <Route path='/chatPage' element={ token ?
                <ChatPage token={token} myUsername={myUsername} /> :
                <LoginPage setToken={setToken} setMyUsername={setMyUsername} />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App