import React, { useEffect, useState } from 'react';
import { Collapse, Container, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import "./Main.css";
import { useLocation, useNavigate } from 'react-router-dom';

import Socials from './Socials';
import AnimeList from './AnimeList';
import NavigationBar from '../components/NavigationBar';
import TestComponent from './_test';

const Main = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const startPageStr = "startPage";
  const startPage = queryParams.get(startPageStr);

  // booleans for each page
  const [isSocialsOpen, setIsSocialsOpen] = useState(false);
  const [isAnimeListOpen, setIsAnimeListOpen] = useState(false);

  const setOpenPage = (pageRefStr) => {
    closeAllPages();

    if (pageRefStr == "socials") { setIsSocialsOpen(true); navigate(`?${startPageStr}=${pageRefStr}`); }
    if (pageRefStr == "animelist") { setIsAnimeListOpen(true); navigate(`?${startPageStr}=${pageRefStr}`); }
  }

  const closeAllPages = () => {
    navigate(``);
    setIsSocialsOpen(false);
    setIsAnimeListOpen(false);
  }

  useEffect(() => {
    console.log(startPage);
    setOpenPage(startPage);
  }, [startPage]);

  return (<div style={{userSelect: "unset"}}>
    <div className="background-underlay" />
    <div className="background" />
    <NavigationBar setOpenPage={setOpenPage} />

    <Container style={{ marginTop: 100, marginBottom: 100 }}>
      {
        isSocialsOpen ? <Socials /> :
          isAnimeListOpen ? <AnimeList /> :
            <TestComponent/>
      }
    </Container>

  </div>);
}

export default Main;