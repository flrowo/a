import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import AnimeCard from "./AnimeCard";
import { Button, Input, Label } from "reactstrap";
import { flrowoUtils } from "../utils/utils";

const sorts = {
    name: {
        id: "name",
        label: "Name",
    },
    date: {
        id: "date",
        label: "Date",
    },
    score: {
        id: "score",
        label: "Score",
    },
}

export default function AnimeList2 () {
    const [planToWatchList, setPlanToWatchList] = useState([]);
    const [watchedList, setWatchedList] = useState([]);
    const [search, setSearch] = useState("");
    
    const [sortId, setSortId] = useState(sorts.date.id);
    const [isSortAscDirection, setIsSortAscDirection] = useState(false);

    const loadAnimeList = useCallback((stopRecursive = false) => {
        // loads anime list from storage

        const animeListSessionStorageStr = sessionStorage.getItem("flrowo-animelist");
        const animeListLastReq = sessionStorage.getItem("flrowo-animelist-last-get");

        // if animelist is already in sessionStorage, use the sessionStorage data
        const timeout = 30 * 60 * 1000; // 30 minutes
        if (
            animeListSessionStorageStr != null &&
            animeListLastReq != null &&
            (Date.now() - Number(animeListLastReq)) <= timeout
        ) {
            const animeList = JSON.parse(animeListSessionStorageStr);

            setPlanToWatchList(animeList[0]); // `plan to watch` is [0] by default
            setWatchedList(animeList[1]); // `watched` is [1] by default
        }
        else {
            if (stopRecursive === false) {
                axios.get("https://raw.githubusercontent.com/flrowo/db/master/app/animelist.json").then((res) => {
                    if (res.status === 200) {
                        // **workaround** to get a unique id for each item, since there is no unique identifier for the rendering/mapping 
                        let id = 0;
                        res.data.forEach(list => {
                            list.forEach((item) => item.id = id++);
                        });

                        // **workaround** just in case it is a .js file, it transforms it into a .json file
                        const hyphenIndex = res.data.indexOf('=');
                        const jsonStr = hyphenIndex !== -1 ? res.data.substring(hyphenIndex + 1) : res.data;
    
                        // saves anime list to storage and the timestamp 
                        sessionStorage.setItem("flrowo-animelist", JSON.stringify(jsonStr));
                        sessionStorage.setItem("flrowo-animelist-last-get", Date.now());
    
                        loadAnimeList(true);
                    }
                    else {
                        console.error("there was an error while trying to fetch animelist data, res.status:", res.status)
                        alert("there was an error while trying to fetch animelist data");
                    }
                });
            }
            else {
                return false;
            }
        };
    }, []);

    useEffect(() => {
        loadAnimeList();
    }, [loadAnimeList]);

    // apply sorts and filters

    let tempPlanToWatchList = planToWatchList;
    let tempWatchedList = watchedList;

    const sortByName = (list, asc = false) => list.sort((a, b) => {
        return asc === true
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name);
    });
    
    const sortByScore = (list, asc = false) => list.sort((a, b) => {
        return asc === true
            ? a.score - b.score
            : b.score - a.score;
    });

    const sortByEndDate = (list, asc = false) => list.sort((a, b) => {
        if (asc) {
            if (a.end?.[0] !== b.end?.[0]) { return a.end?.[0] > b.end?.[0] ? 1 : -1; }
            if (a.end?.[1] !== b.end?.[1]) { return a.end?.[1] > b.end?.[1] ? 1 : -1; }
            if (a.end?.[2] !== b.end?.[2]) { return a.end?.[2] > b.end?.[2] ? 1 : -1; }
            return -1;
        }
        else {
            if (a.end?.[0] !== b.end?.[0]) { return a.end?.[0] < b.end?.[0] ? 1 : -1; }
            if (a.end?.[1] !== b.end?.[1]) { return a.end?.[1] < b.end?.[1] ? 1 : -1; }
            if (a.end?.[2] !== b.end?.[2]) { return a.end?.[2] < b.end?.[2] ? 1 : -1; }
            return -1;
        }
    });

    if (sortId === sorts.name.id) {
        sortByName(tempPlanToWatchList, isSortAscDirection);
        sortByName(tempWatchedList, isSortAscDirection);
    }
    else if (sortId === sorts.date.id) {
        sortByEndDate(tempPlanToWatchList, isSortAscDirection);
        sortByEndDate(tempWatchedList, isSortAscDirection);
    }
    else if (sortId === sorts.score.id) {
        sortByScore(tempPlanToWatchList, isSortAscDirection);
        sortByScore(tempWatchedList, isSortAscDirection);
    }

    if (search !== "" && search != null) {
        tempPlanToWatchList = tempPlanToWatchList.filter((anime) => anime.name.toLowerCase().includes(search.toLowerCase()));
        tempWatchedList = tempWatchedList.filter((anime) => anime.name.toLowerCase().includes(search.toLowerCase()));
    }

    const SortButton = ({ id, asc = false }) => {
        const isActive = sortId === id && isSortAscDirection === asc;
        const tempClassName = isActive ? "!bg-[#46315baa]" : "!bg-[#2f2a35aa]";
        const onClick = () => { setIsSortAscDirection(asc); setSortId(id); };
        return (
            <Button className={`!border-[#fff2] flex-1  ${tempClassName}`} onClick={onClick}>
                {asc ? "Asc ↑" : "Desc ↓"}
            </Button>
        )
    }
    
    return (<>

        {/* filters, search, sorters */}
        <div className="flex flex-row justify-between !gap-3 bg-[#2f2a35aa] p-[10px] rounded-lg shadow-[0_4px_8px_0_rgba(0,0,0,0.2)]">
            <div className="flex flex-col flex-1">
                <div className="flex flex-row justify-center">
                    <Label>Search</Label>
                </div>
                <div className="flex flex-row">
                    <Input value={search} onChange={(e) => setSearch(e.target.value)} className={`!inline !text-white !border-[${flrowoUtils.highlightsColor}] !bg-[${flrowoUtils.baseColor}]`}/>
                </div>
            </div>

            <div className="flex flex-col flex-1">
                <div className="flex flex-row justify-center">
                    <Label>{sorts.date.label}</Label>
                </div>
                <div className='flex flex-row w-full !gap-3'>
                    <SortButton id={sorts.date.id} asc={true}/>
                    <SortButton id={sorts.date.id} asc={false}/>
                </div>
            </div>

            <div className="flex flex-col flex-1">
                <div className="flex flex-row justify-center">
                    <Label>{sorts.name.label}</Label>
                </div>
                <div className='flex flex-row w-full !gap-3'>
                    <SortButton id={sorts.name.id} asc={true}/>
                    <SortButton id={sorts.name.id} asc={false}/>
                </div>
            </div>

            <div className="flex flex-col flex-1">
                <div className="flex flex-row justify-center">
                    <Label>{sorts.score.label}</Label>
                </div>
                <div className='flex flex-row w-full !gap-3'>
                    <SortButton id={sorts.score.id} asc={true}/>
                    <SortButton id={sorts.score.id} asc={false}/>
                </div>
            </div>

        </div>

        <br/>

        {/* anime list */}
        {/* TODO make possible for categories to collapse and save its state somewhere, using useState, or url (later is cringe..) */}
        <h1>{`PLAN TO WATCH (${planToWatchList.length})`}</h1>
        {tempPlanToWatchList.map((anime) => {
            return (
                <AnimeCard
                    key={anime.id}
                    isWatched={false}
                    name={anime.name}
                    img={anime.img}
                    link={anime.link}
                />
            );
        })}
        <br />
        <h1>{`WATCHED (${watchedList.length})`}</h1>
        {tempWatchedList.map((anime) => {
            return (
                <AnimeCard
                    key={anime.id}
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
    </>);
}