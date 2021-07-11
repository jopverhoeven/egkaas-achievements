import { AuthProvider } from "../contexts/auth.context";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./authentication/Login";
import Home from "./home/Home";
import Achievement from "./achievements/Achievement";
import Navbar from "./navigation/Navbar";
import Scores from "./achievements/scores/Scores";

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="flex flex-col h-screen bg-gray-800 text-white">
          <Navbar />
          <Switch>
            <Route path="/" exact component={Home}></Route>
            <Route path="/achievements" exact component={Achievement}></Route>
            <Route path="/achievements/:id" component={Scores}></Route>
            <Route path="/login" component={Login}></Route>
          </Switch>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
