import { HashRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Router from "./Router/Router";
import "react-toastify/dist/ReactToastify.css";

function RouterManager() {
  return (
    <div className="container mx-auto mt-8">
      <HashRouter>
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
        />
        <Router />
      </HashRouter>
    </div>
  );
}

function App() {
  return RouterManager();
}

export default App;
