import React, { useEffect, useState } from 'react';

const BPMCounterComponent = () => {
    const [bpm, setBpm] = useState(null);

    let timestampList = [];

    useEffect(() => {

        const resetBpm = () => {
            console.log("reset");
            timestampList = [];
            setBpm(null);
        }

        const handleKeyPress = (e) => {
            // cancels if tabs, enters, alts, shifts
            if (e.key.length > 1) return;
            
            timestampList.push(Date.now());
            console.log(timestampList);

            let beats = timestampList.length;
            
            if(beats >= 2){

                let timeSinceLastPressedMs = timestampList[beats-1] - timestampList[beats-2];
                
                if (Number(timeSinceLastPressedMs) > 2000) {
                    resetBpm();
                } else {
                    // sets bpm
                    
                    let periodSumMs = 0;
                    
                    let i = 1;

                    while( i < beats ){

                        let timestampA = timestampList[i];
                        let timestampB = timestampList[i-1];

                        let periodMs = timestampA - timestampB;
                        periodSumMs += periodMs;
                        i++;
                    };

                    let minutes = periodSumMs / 1000 / 60;
                    let tempBpm = (beats-1) / minutes;

                    console.log("tempBpm", tempBpm)
                    console.log("beats", beats)

                    setBpm(tempBpm);
                }
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        
        return () => { window.removeEventListener('keydown', handleKeyPress); };
    }, []);

    return (
        <div>
            <h3>Press any key!</h3>
            {bpm && <p>You pressed: {bpm.toFixed(2)}</p>}
        </div>
    );
};

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

        <BPMCounterComponent/>

    </>);
};

export default TestComponent;