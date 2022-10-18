import "./App.css";
import Routes from "./routes";
import Nav from "../src/components/Nav";
import Footer from "./components/Footer";
import ScrollButton from "../src/components/ScrollButton";
import { BrowserRouter } from "react-router-dom";
import { AdminProvider } from "./utils/context";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

function App() {
  return (
    <div className="App">
      <AdminProvider>
        <BrowserRouter>
          <Nav />
          <Routes />
          <Footer />
          <ScrollButton />
        </BrowserRouter>
      </AdminProvider>
    </div>
  );
}

export default App;
