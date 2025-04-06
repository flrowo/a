export default () => {
    // loads anime list from storage

    const storageAnimeList = sessionStorage.getItem("flrowo-animelist");
    const lastReq = sessionStorage.getItem("flrowo-animelist-last-get");

    // if animelist is already in sessionStorage, use the sessionStorage data
    const timeout = 30 * 60 * 1000; // 30 minutes
    if (storageAnimeList != null && lastReq != null && ((Date.now() - Number(lastReq)) <= timeout)) {
        const animeList = JSON.parse(storageAnimeList);

        setPlanToWatchList(animeList[0]); // `plan to watch` is [0] by default
        setWatchedList(animeList[1]); // `watched` is [1] by default
        console.log("loaded anime list", animeList);
    }
    else {
        if (recursive === false) {
            axios.get("https://raw.githubusercontent.com/flrowo/db/master/app/animelist.json").then((res) => {
                console.log("animelist response", res);

                // just in case it is a .js file, it transforms it into a .json file **workaround**
                const hyphenIndex = res.data.indexOf('=');
                const jsonStr = hyphenIndex !== -1 ? res.data.substring(hyphenIndex + 1) : res.data;

                saveAnimeList(jsonStr);
                loadAnimeList(true);
            });
        }
        else {
            return false;
        }
    };
}