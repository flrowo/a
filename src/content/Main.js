import React, { useCallback, useEffect, useState } from 'react';
import { Container } from 'reactstrap';
import { useLocation, useNavigate } from 'react-router-dom';

import Socials from './Socials';
import AnimeList from './AnimeList';
import NavigationBar from '../components/NavigationBar';
import TestComponent from './_test';
import ReisenBG from '../assets/backgrounds/reisen-bg/Reisen';

const Main = () => {
    // const [search, setSearch] = useSearchParams();

    const navigate = useNavigate();

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const startPageStr = "startPage";
    const startPage = queryParams.get(startPageStr);

    // booleans for each page
    const [isSocialsOpen, setIsSocialsOpen] = useState(false);
    const [isAnimeListOpen, setIsAnimeListOpen] = useState(false);

    const closeAllPages = useCallback(() => {
        navigate(``);
        setIsSocialsOpen(false);
        setIsAnimeListOpen(false);
    }, [navigate, setIsSocialsOpen, setIsAnimeListOpen])

    const setOpenPage = useCallback((pageRefStr) => {
        closeAllPages();

        if (pageRefStr === "socials") { setIsSocialsOpen(true); navigate(`?${startPageStr}=${pageRefStr}`); }
        if (pageRefStr === "animelist") { setIsAnimeListOpen(true); navigate(`?${startPageStr}=${pageRefStr}`); }
    }, [closeAllPages, setIsSocialsOpen, setIsAnimeListOpen, navigate])

    useEffect(() => {
        console.log(startPage);
        setOpenPage(startPage);
    }, [startPage, setOpenPage]);

    return (
        <div>
            <div><ReisenBG/></div>
            <NavigationBar setOpenPage={setOpenPage} />

            <Container className='mt-20 mb-5'>
                {
                    isSocialsOpen ? <Socials /> :
                        isAnimeListOpen ? <AnimeList /> :
                            <TestComponent />
                }
            </Container>

        </div>
    );
}

export default Main;