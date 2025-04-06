import React, { useState } from 'react';

import Socials from './Socials';
import NavigationBar2 from '../components/NavigationBar2';
import TestComponent from './_test';
import ReisenBG from '../assets/backgrounds/reisen-bg/Reisen';
import AnimeList2 from './AnimeList2';

const paths = [
    {
        id: "home",
        label: "Home",
        isDefault: true,
        component: <TestComponent/>,
    },
    {
        id: "animelist",
        label: "AnimeList",
        isDefault: false,
        component: <AnimeList2/>,
    },
    {
        id: "socials",
        label: "Socials",
        isDefault: false,
        component: <Socials/>,
    },
]

const Main = () => {
    // const [search, setSearch] = useSearchParams();

    // const navigate = useNavigate();

    // const location = useLocation();
    // const queryParams = new URLSearchParams(location.search);
    // const startPageStr = "startPage";
    // const startPage = queryParams.get(startPageStr);

    // // booleans for each page
    // const [isSocialsOpen, setIsSocialsOpen] = useState(false);
    // const [isAnimeListOpen, setIsAnimeListOpen] = useState(false);

    // const closeAllPages = useCallback(() => {
    //     navigate(``);
    //     setIsSocialsOpen(false);
    //     setIsAnimeListOpen(false);
    // }, [navigate, setIsSocialsOpen, setIsAnimeListOpen])

    // const setOpenPage = useCallback((pageRefStr) => {
    //     closeAllPages();

    //     if (pageRefStr === "socials") { setIsSocialsOpen(true); navigate(`?${startPageStr}=${pageRefStr}`); }
    //     if (pageRefStr === "animelist") { setIsAnimeListOpen(true); navigate(`?${startPageStr}=${pageRefStr}`); }
    // }, [closeAllPages, setIsSocialsOpen, setIsAnimeListOpen, navigate])

    // useEffect(() => {
    //     setOpenPage(startPage);
    // }, [startPage, setOpenPage]);

    // return (
    //     <div>
    //         <ReisenBG/>
    //         <NavigationBar setOpenPage={setOpenPage} />

    //         <Container className='mt-20 mb-5'>
    //             {
    //                 isSocialsOpen ? <Socials /> :
    //                     isAnimeListOpen ? <AnimeList /> :
    //                         <TestComponent />
    //             }
    //         </Container>

    //     </div>
    // );

    const [selectedPath, setSelectedPath] = useState();
    const currentComponent = (paths.find(path => path.id === selectedPath) || paths?.[0])?.component;

    return (
        <div>
            <ReisenBG/>
            <NavigationBar2 paths={paths} selectedPath={selectedPath} setSelectedPath={setSelectedPath}/>
            <div className="flex flex-col h-full p-[80px_10%_20px]">
                {currentComponent}
            </div>
        </div>
    )
}

export default Main;