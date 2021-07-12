import { AuthProvider } from "../contexts/auth.context";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./authentication/Login";
import Home from "./home/Home";
import Achievement from "./achievements/Achievement";
import Navbar from "./navigation/Navbar";
import Scores from "./achievements/scores/Scores";
import PrivateRoute from "./authentication/PrivateRoute";
import NewScore from "./achievements/scores/NewScore";
import NewAchievement from "./achievements/NewAchievement";
import ScoreDetails from "./achievements/scores/ScoreDetails";
import EditScore from "./achievements/scores/EditScore";

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="flex flex-col h-screen bg-gray-800 text-white">
          <Navbar />
          <Switch>
            <Route path="/" exact component={Home}></Route>
            <Route path="/achievements" exact component={Achievement}></Route>
            <PrivateRoute
              path="/achievements/new"
              exact
              component={NewAchievement}
            ></PrivateRoute>
            <Route path="/achievements/:type" exact component={Scores}></Route>
            <PrivateRoute
              path="/achievements/:type/new"
              exact
              component={NewScore}
            ></PrivateRoute>
            <Route
              path="/achievements/:type/:id"
              exact
              component={ScoreDetails}
            ></Route>
            <PrivateRoute
              path="/achievements/:type/:id/edit"
              exact
              component={EditScore}
            ></PrivateRoute>
            <Route path="/login" component={Login}></Route>
          </Switch>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
