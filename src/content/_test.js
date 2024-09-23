import React, { useEffect, useState } from 'react';

const BPMCounterComponent = () => {
    const [bpm, setBpm] = useState(null);
    const [keysPressed, setKeysPressed] = useState(null);

    let timestampList = [];

    useEffect(() => {

        const handleKeyPress = (e) => {
            // cancels if tabs, enters, alts, shifts
            if (e.key.length > 1) return;

            timestampList.push(Date.now());

            let beats = timestampList.length;

            if (beats >= 2) {

                let timeSinceLastPressedMs = timestampList[beats - 1] - timestampList[beats - 2];

                if (Number(timeSinceLastPressedMs) > 2000) {
                    timestampList = [Date.now()]; // resets timestampList
                } else {
                    // sets bpm

                    let periodSumMs = 0;

                    let i = 1;

                    while (i < beats) {

                        let timestampA = timestampList[i];
                        let timestampB = timestampList[i - 1];

                        let periodMs = timestampA - timestampB;
                        periodSumMs += periodMs;
                        i++;
                    };

                    let minutes = periodSumMs / 1000 / 60;
                    let tempBpm = (beats - 1) / minutes;

                    setBpm(tempBpm);
                }
            }
            setKeysPressed(timestampList.length);
        };

        window.addEventListener('keydown', handleKeyPress);

        return () => { window.removeEventListener('keydown', handleKeyPress); };
    }, []);

    return (
        <div>
            <h3>Press any key!</h3>
            {bpm && <p>bpm: {bpm == 0 ? "-" : bpm.toFixed(2)}</p>}
            {keysPressed && <p>keysPressed: {keysPressed == 0 ? "-" : keysPressed}</p>}
        </div>
    );
};

const Counter = () => {
    let count = 0;
    const [eae, setEae] = useState(0);
    console.log("count", count);

    const buttonFunc = (n) => {
        if (n == 1) {
            count = count + 1;
        }
        if (n == 0) {
            count = 0;
        }
        if (n == -1) {
            count = count - 1;
        }
    }

    const eaeFunc = () => {
        setEae(eae + 1);
    }

    return (
        <div>
            <p>{count}</p>
            <div>
                <button className="btn btn-danger" onClick={() => { buttonFunc(-1) }}>-</button>
                <button className="btn btn-warning" onClick={() => { buttonFunc(0) }}>0</button>
                <button className="btn btn-success" onClick={() => { buttonFunc(1) }}>+</button>
            </div>
            <button className="btn btn-secondary" onClick={eaeFunc}>eae</button>
            {eae}
        </div>
    );
}

const TestComponent = () => {

    const containerStyle = {
        position: 'relative',
        height: 300,
        width: 300,
    };

    const backgroundStyle = {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: 'url("https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/a3a6e7d4-9293-4ef7-8c7a-ebf6f1fe701e/original=true,quality=90/Winter.jpeg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: 0.5,
        zIndex: 1
    };

    const contentStyle = {
        position: 'relative',
        zIndex: 2,
        color: 'white',
        textAlign: 'center',
        paddingTop: '20px'
    };



    return (<>

        <div style={containerStyle}>
            <div style={backgroundStyle}></div>
            <div style={contentStyle}>
                <h1>example text</h1>
            </div>
        </div>

        <BPMCounterComponent />

        <Counter />

    </>);
};

export default TestComponent;