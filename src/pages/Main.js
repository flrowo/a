import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardHeader, CardText, CardTitle, Col, Container, Row } from 'reactstrap';
import NavigationBar from '../components/NavigationBar';
import "../components/NavigationBar";
import "./Main.css";
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const Socials = () => {

  return (
    <Row>
      <Card
        className="my-2"
        color="dark"
        inverse
        style={{
          width: '18rem'
        }}
      >
        <CardHeader>
          Header
        </CardHeader>
        <CardBody>
          <CardTitle tag="h5">
            Special Title Treatment
          </CardTitle>
          <CardText>
            With supporting text below as a natural lead-in to additional content.
          </CardText>
        </CardBody>
      </Card>
    </Row>
  );
}

const AnimeCard = ({ isWatched, name, start, end, img, link, score, comment, media }) => {
  
  if(!start){ start = ["?","?","?"]; }
  if(!end){ end = ["?","?","?"]; }
  if(!score){ score = "?"; }
  if(!media){ media = ""; }
  if(!comment){ comment = ""; }

  return (
    <div style={{backgroundColor: "#2f2a35dd", border: "1px solid black", marginBottom: 10, boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)"}}>
      <Row>
        
        <Col>{name}</Col>

        {isWatched ?
          <>
            <Col>
              <Row> {`start: ${start[0]}-${start[1]}-${start[2]}`} </Row>
              <Row> {`end: ${end[0]}-${end[1]}-${end[2]}`} </Row>
            </Col> 
            <Col> {`score: ${score[0]}`} </Col>
          </>
        : null}

        <Col style={{display: "flex", justifyContent: "right"}}><a href={link}><img style={{height: 100}} src={img}/></a></Col>

      </Row>
    </div>
  );
}

const AnimeList = () => {

  const [planToWatchList, setPlanToWatchList] = useState([]);
  const [watchedList, setWatchedList] = useState([]);

  const requestAnimeList = () => {
    // LIMITAR A REQUISIÇÃO (POR 5 MINUTOS) CASO O LOCALSTORAGE JÁ TIVER OS ANIMES !!!!!
    axios.get("https://raw.githubusercontent.com/flrowo/db/master/app/animelist.json").then((res) => {
      console.log("animelist response", res);

      const hyphenIndex = res.data.indexOf('=');
      let jsonStr;
      if (hyphenIndex !== -1) {
        jsonStr = res.data.substring(hyphenIndex + 1);
      } else {
        jsonStr = res.data;
      }

      let list = (jsonStr);
      setPlanToWatchList(list[0]);
      setWatchedList(list[1]);

      sessionStorage.setItem("flrowo-animelist", JSON.stringify(jsonStr));
      sessionStorage.setItem("flrowo-animelist-last-get", Date.now());
    });
  }

  const callAnime = () => {
    console.log("temos anime");

    let localStr = sessionStorage.getItem("flrowo-animelist");
    let lastGet = sessionStorage.getItem("flrowo-animelist-last-get");

    let timeout = 10 * 60 * 1000; // 10 minutes
    if (localStr && lastGet && (Date.now() - Number(lastGet)) <= timeout) {
      let json = JSON.parse(localStr);
      setPlanToWatchList(json[0]);
      setWatchedList(json[1]);
    }
    else {
      requestAnimeList();
    }
  }

  useEffect(callAnime, []);

  return (
    <Col>
      <Row>
        <h1>PLAN TO WATCH</h1>
        {planToWatchList.map((anime, index) => {
          return (
            <AnimeCard
              key={`planToWatchAnime${index}`}
              isWatched={false}
              name={anime.name}
              img={anime.img}
              link={anime.link}
            />
          );
        })}
      </Row>
      <br/>
      <Row>
        <h1>WATCHED</h1>
        {watchedList.map((anime, index) => {
          return (
            <AnimeCard
              key={`animeToWatch${index}`}
              isWatched={true}
              name={anime.name}
              start={anime.start}
              end={anime.end}
              img={anime.img}
              link={anime.link}
              score={anime.score}
            />
          );
        })}
      </Row>
    </Col>

  );
}


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

  return (<>
    <div className="background-underlay" />
    <div className="background" />
    <NavigationBar setOpenPage={setOpenPage} />

    <Container style={{ marginTop: 100, marginBottom: 100 }}>
      {
        isSocialsOpen ? <Socials /> :
          isAnimeListOpen ? <AnimeList /> :
            null
      }
    </Container>

  </>);
}

export default Main;