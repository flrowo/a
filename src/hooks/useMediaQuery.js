import { useState, useEffect } from 'react';

export default function useMediaQuery (query) {
    // used to get css condition like 'max-height: 500px'
    // so checking if the screen is narrower than 500px
    // if it is, returns true
    const mediaMatch = window.matchMedia(query);
    const [matches, setMatches] = useState(mediaMatch.matches);

    useEffect(() => {
        const handler = e => setMatches(e.matches);
        mediaMatch.addListener(handler);
        return () => mediaMatch.removeListener(handler);
    });
    return matches;
};