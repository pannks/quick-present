import styled from "styled-components";
import { NavLink, Outlet } from "react-router-dom";

const Nav = styled.nav`
    display: flex;
    justify-content: center;
    gap: 2rem;
    font-family: var(--f-th);
    font-size: 12px;
    padding: 1.2rem 0;
    background-color: var(--c-white);
`;

const StNavLink = styled(NavLink)`
    color: inherit;
    text-decoration: none;

    &.active {
        font-weight: bold;
    }
`;

const Navigation = () => {
    return (
        <>
            <Nav>
                <StNavLink to="/">Home</StNavLink>
                <StNavLink to="/manage">Manage</StNavLink>
            </Nav>
            <Outlet />
        </>
    );
};

export default Navigation;
