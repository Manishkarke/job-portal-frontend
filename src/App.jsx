import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/Login/Login";
import AppRoutes from "./Router/Links";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        {AppRoutes.map(({ element, ...rest }, index) => {
          return <Route key={index} {...rest} element={element} />;
        })}
      </Routes>
    </>
  );
}

export default App;
