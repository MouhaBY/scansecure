import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Employees from './Employees';
import NotFoundPage from "./NotFoundPage";
import Users from './Users';
import UserCreate from './UserCreate';


export default function Urlhandler() {
    return (
            <Routes>
                <Route path='*' element={<NotFoundPage />} />
                <Route path="/" element={<div>{"Hello"}</div>}/>
                <Route path="/users" element={<Users/>}/>
                <Route path="/users/add" element={<UserCreate/>}/>
                <Route path="/employees" element={<Employees/>}/>
            </Routes>
    )
}
