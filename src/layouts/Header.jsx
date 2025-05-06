import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import styled from "@emotion/styled";
import Logo from "/logo@2x.png";
import Profile from "/profile@3x.png";

const Header = () => {
  return (
    <HeaderContainer>
      <Section>
        <Link to="/">
          <LogoImg src={Logo} />
        </Link>
        <NavSection>
          <StyledNavLink to="/boards">자유게시판</StyledNavLink>
          <StyledNavLink to="/items">중고마켓</StyledNavLink>
        </NavSection>
      </Section>
      <Section>
        <ProfileImg src={Profile} />
      </Section>
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.div`
  width: 100vw;
  padding: 1rem 10vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--line100);
  background-color: var(--white);
  position: sticky;
  top: 0;
`;

const Section = styled.section`
  display: flex;
  width: fit-content;
  flex: 0 0 auto;
`;

const LogoImg = styled.img`
  height: 4rem;
  flex-shrink: 0;
`;

const NavSection = styled.section`
  margin-left: 3rem;
  display: flex;
  align-items: center;
  flex: 0 0 auto;
  gap: 1.5rem;
`;

const StyledNavLink = styled(NavLink)`
  color: var(--secondary600);
  text-decoration: none;
  font-weight: bold;

  &.active {
    color: var(--blue);
  }

  &:hover {
    opacity: 0.7;
  }
`;

const ProfileImg = styled.img`
  height: 4rem;
  flex-shrink: 0;
`;
