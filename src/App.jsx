import { BrowserRouter, HashRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Router from "./Router/Router";
import "react-toastify/dist/ReactToastify.css";

function RouterManager() {
  return (
    <BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Router />
    </BrowserRouter>
  );
}

function App() {
  return RouterManager();
}

export default App;
