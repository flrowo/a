import React, { useRef, useState, useEffect } from 'react';

export default function AnimeCard ({
    isWatched,
    name,
    start = ["?", "?", "?"],
    end = ["?", "?", "?"],
    img,
    link,
    score = "?",
    comment = "",
    media = ""
}) {

    let isNotValidDate = start.some(n => n === "?") || end.some(n => n === "?");
    let dateDiffInDays = isNotValidDate ? "?" : (new Date(end) - new Date(start)) / (1000 * 60 * 60 * 24);

    const commentDivRef = useRef(null);

    const [isCollapsed, setIsCollapsed] = useState(true);
    const toggleCollapse = () => setIsCollapsed(!isCollapsed);

    const [isOverflowing, setIsOverflowing] = useState(false);

    const divZIndex = 1;

    // styles
    const containerStyleHeight = isCollapsed ? "h-[150px] max-h-[150px]" : "";

    const containerClassName = `relative overflow-hidden mb-1 ${containerStyleHeight} shadow-[0_4px_8px_0_rgba(0,0,0,0.2)] rounded-[10px]`;
    const backgroundClassName = `absolute inset-0 bg-cover bg-center opacity-20 z-[${divZIndex}] blur-sm [image-rendering:pixelated] bg-[${img}]`;
    const contentClassNames = `flex flex-row p-1 h-full relative z-[${divZIndex+1}] gap-2 bg-[rgba(37,32,43,0.667)] ${isCollapsed ? "overflow-hidden" : "overflow-visible"}`;

    useEffect(() => {
        // checks if the content overflows
        const element = commentDivRef.current;
        if (element) {
            const hasOverflowingContent = element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
            setIsOverflowing(hasOverflowingContent);
        }
    }, []);

    return (<>

        <div className={containerClassName} style={{ borderColor: "#ffffff21" }}>

            <div className={backgroundClassName}/>

            <div className={contentClassNames}>

                {/* image */}
                <div className="h-full w-[100px] min-w-[100px] cursor-pointer" onClick={() => { window.location = link }}>
                    <img className="h-full w-full object-cover rounded-[5px]" alt="" src={img}/>
                </div>

                {/* name and description */}
                <div ref={commentDivRef} className="grow">

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
                                {name + (media !== "" ? " (" + media + ")" : "")}
                            </div>
                        </a>
                    </div>

                    <hr style={{ margin: "5px 0" }} />

                    <div style={{ opacity: comment === "" ? 0.15 : 0.8 }}>
                        {comment === "" ? "no comment" : comment}
                    </div>

                </div>

                {/* date (start, end), score - only if is `watched` */}
                {isWatched ?
                    <div className="flex flex-col pt-[20px] pl-[10px] min-w-[150px]">
                        <div>
                            <div> {`start: ${start[0]}-${start[1]}-${start[2]}`} </div>
                            <div> {`end: ${end[0]}-${end[1]}-${end[2]}`} </div>
                        </div>
                        <div> {`${dateDiffInDays} days - ${score}/10`} </div>

                        {/* read more read less button */}
                        <div className="flex">
                            {isOverflowing ?
                                <div className="cursor-pointer text-rose-300" onClick={toggleCollapse}>
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