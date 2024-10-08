import React, { useEffect, useRef, useState } from 'react';
import { Button, Col, Input, Label, Row } from 'reactstrap';
import axios from 'axios';
import flrowoUtils from '../utils/utils';

const useMediaQuery = (query) => {
    // testing if less than 500px
    const mediaMatch = window.matchMedia(query);
    const [matches, setMatches] = useState(mediaMatch.matches);

    useEffect(() => {
        const handler = e => setMatches(e.matches);
        mediaMatch.addListener(handler);
        return () => mediaMatch.removeListener(handler);
    });
    return matches;
};

const AnimeCard = ({
    isWatched,
    name,
    start = ["?", "?", "?"],
    end = ["?", "?", "?"],
    img,
    link,
    score = "?",
    comment = "",
    media = ""
}) => {

    let isNotValidDate = start.some(n => n == "?") || end.some(n => n == "?");
    let dateDiffInDays = isNotValidDate ? "?" : (new Date(end) - new Date(start)) / (1000 * 60 * 60 * 24);

    const commentDivRef = useRef(null);

    const [isCollapsed, setIsCollapsed] = useState(true);

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    }

    const [isOverflowing, setIsOverflowing] = useState(false);

    const divZIndex = 1;

    // styles
    const containerStyleHeight = isCollapsed ? 150 : "unset";
    const containerStyle = {
        position: "relative",
        overflow: "hidden",
        marginBottom: 5,
        height: containerStyleHeight,
        maxHeight: containerStyleHeight,

        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
        border: "1px solid #ffffff22",
        borderRadius: 10,
    };

    const backgroundStyle = {
        imageRendering: "pixelated",
        filter: "blur(5px)",

        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `url(${img})`,
        backgroundSize: "cover",
        backgroundPosition: "center",

        opacity: 0.2,
        zIndex: divZIndex
    };

    const contentStyle = {
        height: "100%",

        position: "relative",
        zIndex: divZIndex + 1,

        display: "flex",
        flexDirection: "row",
        gap: 10,

        background: "rgba(37, 32, 43, 0.667)",

        padding: 5,

        overflow: isCollapsed ? "hidden" : "visible",
    };

    useEffect(() => {
        // checks if the content overflows
        const element = commentDivRef.current;
        if (element) {
            const hasOverflowingContent = element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
            setIsOverflowing(hasOverflowingContent);
        }
    }, []);

    return (<>

        <div style={containerStyle}>

            <div style={backgroundStyle}></div>

            <div style={contentStyle}>

                {/* image */}
                <div style={{ height: "100%", width: 100, minWidth: 100, cursor: "pointer" }} onClick={() => { window.location = link }}>
                    <img
                        style={{
                            height: "100%",
                            width: "100%",
                            objectFit: "cover",
                            // objectPosition: "center",
                            borderRadius: 5,
                        }}
                        src={img}
                    />
                </div>

                {/* name and description */}
                <div ref={commentDivRef} style={{ flexGrow: 1 }}>

                    <div style={{ display: "flex" }}>
                        <a style={{textDecoration: "none"}} href={link}>
                            <div
                                style={{
                                    fontSize: 32, cursor: "pointer", display: '-webkit-box',
                                    WebkitBoxOrient: 'vertical',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    WebkitLineClamp: 1,
                                    lineClamp: 1
                                }}
                            >
                                {name + (media != "" ? " (" + media + ")" : "")}
                            </div>
                        </a>
                    </div>

                    <hr style={{ margin: "5px 0" }} />

                    <div style={{ opacity: comment == "" ? 0.15 : 0.8 }}>
                        {comment == "" ? "no comment" : comment}
                    </div>

                </div>

                {/* date (start, end), score - only if is `watched` */}
                {isWatched ?
                    <div style={{
                        minWidth: 150,
                        display: "flex",
                        flexDirection: "column",
                        paddingTop: 20,
                        paddingLeft: 10,
                    }}>
                        <div>
                            <div> {`start: ${start[0]}-${start[1]}-${start[2]}`} </div>
                            <div> {`end: ${end[0]}-${end[1]}-${end[2]}`} </div>
                        </div>
                        <div> {`${dateDiffInDays} days - ${score}/10`} </div>

                        {/* read more read less button */}
                        <div style={{ display: "flex" }}>
                            {isOverflowing ?
                                <div style={{ cursor: "pointer", color: "orange" }} onClick={toggleCollapse}>
                                    {isCollapsed ? "▼ Read more" : "▲ Read less"}
                                </div>
                                :
                                null
                            }

                        </div>
                    </div>
                    :
                    null}

            </div>

        </div>
    </>);
}

const AnimeList = () => {
    
    // testing if less than 500px
    const isLessThan = useMediaQuery('(min-width: 500px)');

    const [planToWatchList, setPlanToWatchList] = useState([]);
    const [planToWatchListToShow, setPlanToWatchListToShow] = useState([]);
    const [watchedList, setWatchedList] = useState([]);
    const [watchedListToShow, setWatchedListToShow] = useState([]);

    const [searchInputValue, setSearchInputValue] = useState("");

    const [isLoading, setIsLoading] = useState(false);


    // ------- setup -------

    const saveAnimeList = (jsonStr) => {
        // saves anime list to storage
        // saves the timestamp
        sessionStorage.setItem("flrowo-animelist", JSON.stringify(jsonStr));
        sessionStorage.setItem("flrowo-animelist-last-get", Date.now());
    }

    const loadAnimeList = (recursive = false) => {
        // loads anime list from storage

        let animeListLocalJsonStr = sessionStorage.getItem("flrowo-animelist");
        let animeListLastReq = sessionStorage.getItem("flrowo-animelist-last-get");

        // if sessionstorage already has the animelist, LIMITS REQUISITION
        let timeout = 30 * 60 * 1000; // 30 minutes
        if (animeListLocalJsonStr && animeListLastReq && (Date.now() - Number(animeListLastReq)) <= timeout) {
            let json = JSON.parse(animeListLocalJsonStr);

            setPlanToWatchList(json[0]); // plan to watch is [0] by default
            setWatchedList(json[1]); // watched is [1] by default
            console.log("loaded anime list", json);
        }
        else {
            if (recursive == false) {
                axios.get("https://raw.githubusercontent.com/flrowo/db/master/app/animelist.json").then((res) => {
                    console.log("animelist response", res);

                    // just in case it is a .js file, it transforms it into a .json file **hacky workaround**
                    const hyphenIndex = res.data.indexOf('=');
                    let jsonStr = hyphenIndex !== -1 ? res.data.substring(hyphenIndex + 1) : res.data;

                    saveAnimeList(jsonStr);
                    loadAnimeList(true);
                });
            }
            else {
                return false;
            }
        };
    }

    useEffect(() => {
        setPlanToWatchListToShow(planToWatchList);
    }, [planToWatchList]);

    useEffect(() => {
        setWatchedListToShow(watchedList);
    }, [watchedList]);

    const sortAnimeList = (key, asc = "asc") => {
        let tempPlanToWatchList = [...planToWatchListToShow];
        let tempWatchedList = [...watchedListToShow];

        const func = (anime1, anime2) => {
            if (key === "name") {
                return asc == "asc"
                    ? anime1.name.localeCompare(anime2.name)
                    : anime2.name.localeCompare(anime1.name);
            }
            else if (key === "end") {
                return asc == "asc"
                    ? new Date(anime1.start) - new Date(anime2.start)
                    : new Date(anime2.start) - new Date(anime1.start);
            }
            else if (key === "score") {
                return asc == "asc"
                    ? anime1.score - anime2.score
                    : anime2.score - anime1.score;
            }
        };

        tempPlanToWatchList.sort(func);
        tempWatchedList.sort(func);

        setPlanToWatchListToShow(tempPlanToWatchList);
        setWatchedListToShow(tempWatchedList);
    };

    const filter = (e) => {
        let valueToSet = e.target.value;
        let valueToSetLower = valueToSet.toLowerCase();

        const condition = (anime) => {
            return anime.name.toLowerCase().includes(valueToSetLower);
        }

        let tempPlanToWatchList = [];
        let tempWatchedList = [];

        console.log("planToWatchList", planToWatchList);

        if (valueToSet == "") {
            // won't filter, gets all anime loaded
            tempPlanToWatchList = planToWatchList;
            tempWatchedList = watchedList;
        }
        else {
            // filters the loaded anime
            tempPlanToWatchList = planToWatchList.filter(condition);
            tempWatchedList = watchedList.filter(condition);
        }

        setWatchedListToShow(tempWatchedList);
        setPlanToWatchListToShow(tempPlanToWatchList);

        setSearchInputValue(valueToSet);
    }

    useEffect(() => {
        // loads anime list upon render, only once
        loadAnimeList();
    }, []);


    let eaeList = [
        {
            label: "Name",
            sortBy: "name",
        },
        {
            label: "End Date",
            sortBy: "end",
        },
        {
            label: "Score",
            sortBy: "score",
        },
    ];

    return (<>
        <div style={{ display: 'flex', flexDirection: "column", justifyContent: "center" }}>

            {/* filters, search, sorters */}
            <Row style={{ gap: 20, backgroundColor: flrowoUtils.baseColor, padding: 10, borderRadius: 10, boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)" }}>
                <Col>
                    <Row style={{ textAlign: "center" }}>
                        <Label>Seach</Label>
                    </Row>
                    <Row>
                        <Input value={searchInputValue} onChange={filter} style={{ display: "inline", color: "white", borderColor: flrowoUtils.highlightsColor, backgroundColor: flrowoUtils.baseColor }} />
                    </Row>
                </Col>

                {eaeList.map((el) => {
                    return (<>
                        <Col>
                            <Row style={{ textAlign: "center" }}>
                                <Label>{el.label}</Label>
                            </Row>
                            <Row style={{ gap: 20 }}>
                                <Col>
                                    <Row>
                                        <Button
                                            style={{
                                                backgroundColor: flrowoUtils.baseColor,
                                                borderColor: flrowoUtils.highlightsColor
                                            }}
                                            onClick={() => { sortAnimeList(el.sortBy, "asc") }}>
                                            Asc
                                        </Button>
                                    </Row>
                                </Col>
                                <Col>
                                    <Row>
                                        <Button
                                            style={{
                                                backgroundColor: flrowoUtils.baseColor,
                                                borderColor: flrowoUtils.highlightsColor
                                            }}
                                            onClick={() => { sortAnimeList(el.sortBy, "desc") }}>
                                            Desc
                                        </Button>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                    </>);
                })}

            </Row>

            <br />

            {/* TODO make possible for categories to collapse and save its state somewhere, using useState, or url (later is cringe..) */}
            <h1>{`PLAN TO WATCH (${planToWatchListToShow.length})`}</h1>
            {planToWatchListToShow.map((anime, index) => {
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
            <br />
            <h1>{`WATCHED (${watchedListToShow.length})`}</h1>
            {watchedListToShow.map((anime, index) => {
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
                        comment={anime.comment}
                        media={anime.media}
                    />
                );
            })}
        </div>
    </>);
}

export default AnimeList;