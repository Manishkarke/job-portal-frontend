import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/Login/Login";
import AppRoutes from "./Router/Links";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        {AppRoutes.map(({ element, ...rest }, index) => {
          return <Route key={index} {...rest} element={element} />;
        })}
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
