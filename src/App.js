import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ChatPage from './chatPage/ChatPage';
import LoginPage from './loginPage/LoginPage';
import RegisterPage from './registerPage/RegisterPage';

function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [users, setUsers] = useState([]);
    const [me, setMe] = useState(null);
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<RegisterPage users={users} setUsers={setUsers} />} />
                <Route path='/loginPage' element={<LoginPage users={users} setLoggedIn={setLoggedIn} setMe={setMe} />} />
                <Route path='/chatPage' element={loggedIn ?
                <ChatPage users={users} setLoggedIn={setLoggedIn} me={me} /> :
                <LoginPage users={users} setLoggedIn={setLoggedIn} setMe={setMe} />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App