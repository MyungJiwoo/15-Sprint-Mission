import { Outlet } from "react-router-dom";
import GlobalStyle from "./GlobalStyle";
import Header from "@/layouts/Header";

const App = () => {
  return (
    <>
      <GlobalStyle />
      <header>
        <Header />
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default App;
