import React from 'react';

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
        backgroundImage: 'url("https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/a3a6e7d4-9293-4ef7-8c7a-ebf6f1fe701e/original=true,quality=90/Winter.jpeg")', // Replace with your image path
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

    return (
        <div style={containerStyle}>
            <div style={backgroundStyle}></div>
            <div style={contentStyle}>
                <h1>example text</h1>
            </div>
        </div>
    );
};

export default TestComponent;