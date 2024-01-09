import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/Login/Login";
import AppRoutes from "./Router/Links";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Routes>
        <>
          {/* yesari nagara AppRoutes ma uta hera Route.jsx ma kasari gareko cha hera ani testo gara + App.jsx pani hera */}
          {AppRoutes.map(({ element, ...rest }, index) => {
            return <Route key={index} {...rest} element={element} />;
          })}
        </>
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
