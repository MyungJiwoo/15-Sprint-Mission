import { Outlet } from "react-router-dom";
import styled from "@emotion/styled";
import GlobalStyle from "./GlobalStyle";
import Header from "@/layouts/Header";

const breakpoints = {
  mobile: "480px",
  tablet: "768px",
  desktop: "1024px",
};

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const Main = styled.main`
  // 모바일 & 전체
  width: 95vw;

  // 태블릿
  @media (min-width: ${breakpoints.mobile}) {
    width: 95vw;
  }

  // 데스크탑
  @media (min-width: ${breakpoints.desktop}) {
    width: 60vw;
  }
`;

const App = () => {
  return (
    <Layout>
      <GlobalStyle />
      <Header />
      <Main>
        <Outlet />
      </Main>
    </Layout>
  );
};

export default App;
