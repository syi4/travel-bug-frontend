import "mapbox-gl/dist/mapbox-gl.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./bootstrap.min.css";
import { NavBar } from "./components/NavBar";
import CreatePost from "./pages/CreatePost";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ProfilePage from "./pages/ProfilePage";
import SignUp from "./pages/SignUp";

const App = () => {
  return (
    <Router>
      <NavBar />
      <Route exact path="/" component={Home} />
      <Route exact path="/create-post" component={CreatePost} />
      <Route exact path="/signup" component={SignUp} />
      <Route exact path="/user/:user" component={ProfilePage} />
      <Route exact path="/login" component={Login} />
    </Router>
  );
};

export default App;
