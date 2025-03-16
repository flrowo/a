import reisenImg from "./reisen.png";

const reisenAnimationClassName = "reisen-bg-scroll-animation";
const underlayClassName = "reisen-bg-underlay";

export default function ReisenBG() {
    return (<>
        <style>
            {`
                .reisen-bg-underlay{
                    position: fixed;
                    z-index: -2;
                    top: 0;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    opacity: 1;
                    /* filter: grayscale(100%) brightness(120%); */

                    background-size: 100px;
                    background-repeat: repeat;
                    background-color: #2f2a35;
                }

                .${reisenAnimationClassName} {
                    position: fixed;
                    z-index: -1;
                    top: 0;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    opacity: 0.1;
                    background: url(${reisenImg}) center center;
                    background-size: 100px;
                    background-repeat: repeat;
                    animation: scroll 20s linear infinite;
                    image-rendering: pixelated;
                }

                @keyframes scroll {
                    from {
                        background-position: 0 0;
                    }

                    to {
                        background-position: -200px -100px;
                    }
                }
            `}
        </style>
        <div className={underlayClassName} />
        <div className={reisenAnimationClassName} />
    </>)
}