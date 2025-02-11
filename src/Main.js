import React, { Component } from 'react';
import { createRoot } from 'react-dom/client';

import HomePage from "./HomePage"
import Nav from "./Nav"
import CoasterForm from "./components/CoasterForm"
import CoasterList from "./components/CoasterList"
import CoasterDetails from "./components/CoasterDetails"
import WagonForm from "./components/WagonForm"

import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

export default class Main extends Component {
    render() {
        return (
            <BrowserRouter>
                <Nav/>
                <main>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/coasters" element={<CoasterList />} />
                        <Route path="/coasters/form" element={<CoasterForm />} />
                        <Route path="/coasters/:uuid/edit" element={<CoasterForm />} />
                        <Route path="/coasters/:uuid" element={<CoasterDetails />} />
                        <Route path="/coasters/:coasterUuid/create-wagon" element={<WagonForm />} />
                        <Route path="/coasters/:coasterUuid/edit-wagon/:uuid" element={<WagonForm />} />
                    </Routes>
                </main>
            </BrowserRouter>
        )
    }
}

const root = createRoot(document.getElementById('main-customer'));
root.render(<Main />);