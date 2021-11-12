import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import Search from "./Search";
import Login from "./Login";

const code = new URLSearchParams(window.location.search).get("code");

const App = () => {
  return code ? <Search code={code} /> : <Login />;
};

export default App;
