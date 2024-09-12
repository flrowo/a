import React, { useEffect, useState } from "react";
import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from "reactstrap";

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

const NavigationBar = ({ setOpenPage }) => {
    
    const isLessThan500px = useMediaQuery('(min-width: 500px)');

    const [isOpen, setIsOpen] = useState(false);

    let navJson = [
        { url: "animelist", label: "Anime List" },
        { url: "socials", label: "Socials/Contact" },
    ]

    let navList = navJson.map((navObj) => {
        return (<>
            <NavItem key={navObj.url}>
                <NavLink style={{ cursor: 'pointer' }} onClick={() => setOpenPage(navObj.url)}>
                    {navObj.label}
                </NavLink>
            </NavItem>
        </>);
    });

    return (
        <Navbar fixed='top' dark={true} expand={isLessThan500px == false} style={{ backgroundColor: "#25202baa", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)" }}>
            <NavbarBrand style={{ cursor: 'pointer' }} onClick={() => setOpenPage(null)}>flrowo</NavbarBrand>
            <NavbarToggler onClick={() => setIsOpen(!isOpen)} />
            <Collapse isOpen={isOpen} navbar>
                <Nav className="me-auto" navbar>

                    {navList}

                    {/* <UncontrolledDropdown nav inNavbar>
                        <DropdownToggle nav caret>
                            Options
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem>Option 1</DropdownItem>
                            <DropdownItem>Option 2</DropdownItem>
                            <DropdownItem divider />
                            <DropdownItem>Reset</DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown> */}
                </Nav>
                {/* <NavbarText>Simple Text</NavbarText> */}
            </Collapse>
        </Navbar>
    );
}
export default NavigationBar;