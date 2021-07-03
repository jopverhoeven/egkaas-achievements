import ScoreboardComponent from "../components/scoreboard/scoreboard.component";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import HomeComponent from "../components/home/home.component";
import NavComponent from "../components/nav/nav.component";

export default function MainPage() {
  return (
    <div className="h-screen bg-gradient-to-br from-gray-600 via-teal-700 to-gray-800">
      <Router>
        <Link to="/">
          <div className="h-16 flex justify-center items-center bg-gray-800 text-gray-200 text-2xl font-semibold">
            EGKaaS Achievements
          </div>
        </Link>
        <NavComponent></NavComponent>
        <div className="flex flex-col text-white pt-8">
          <Switch>
            <Route path="/" exact>
              <HomeComponent></HomeComponent>
            </Route>
            <Route path="/atjes" exact>
              <ScoreboardComponent
                {...{
                  name: "Atjes",
                  collection: "atjes",
                  type: "tijd",
                  direction: "asc",
                  limit: 25,
                }}
              ></ScoreboardComponent>
            </Route>
            <Route path="/rietas" exact>
              <ScoreboardComponent
                {...{
                  name: "Rietas",
                  collection: "rietas",
                  type: "tijd",
                  direction: "asc",
                  limit: 25,
                }}
              ></ScoreboardComponent>
            </Route>
            <Route path="/gewicht" exact>
              <ScoreboardComponent
                {...{
                  name: "Zwaargewichten",
                  collection: "gewicht",
                  type: "gewicht",
                  direction: "desc",
                  limit: 10,
                }}
              ></ScoreboardComponent>
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}
