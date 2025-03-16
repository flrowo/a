import React, { useEffect, useState } from "react";
import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from "reactstrap";

const useMediaQuery = (query) => {
    const mediaMatch = window.matchMedia(query);
    const [matches, setMatches] = useState(mediaMatch.matches);

    useEffect(() => {
        const handler = e => setMatches(e.matches);
        mediaMatch.addListener(handler);
        return () => mediaMatch.removeListener(handler);
    });
    return matches;
};

const navs = [
    { url: "animelist", label: "Anime List" },
    { url: "socials", label: "Socials/Contact" },
]

const NavigationBar = ({ setOpenPage }) => {
    // testing if less than 500px
    const isMobile = useMediaQuery('(min-width: 500px)');
    const [isOpen, setIsOpen] = useState(false);
    return (
        <Navbar fixed='top' dark={true} expand={isMobile === true} className="bg-[#25202baa] shadow-[0_4px_8px_0_rgba(0,0,0,0.2)]">
            <NavbarBrand className="cursor-pointer" onClick={() => setOpenPage(null)}>flrowo</NavbarBrand>
            <NavbarToggler onClick={() => setIsOpen(!isOpen)} />
            <Collapse isOpen={isOpen} navbar>
                <Nav className="visible" navbar>
                    {navs.map(({ url, label }) => (
                        <NavItem key={url}>
                            <NavLink className="cursor-pointer" onClick={() => { setIsOpen(false); setOpenPage(url); }}>
                                {label}
                            </NavLink>
                        </NavItem>
                    ))}
                </Nav>
            </Collapse>
        </Navbar>
    );
}
export default NavigationBar;