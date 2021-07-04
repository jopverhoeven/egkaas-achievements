import ScoreboardComponent from "../components/scoreboard/scoreboard.component";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomeComponent from "../components/home/home.component";
import NavComponent from "../components/nav/nav.component";
import ProfileComponent from "../components/profile/profile.component";
import AchievementName from "../abstraction/achievementname.enum";
import AchievementCollection from "../abstraction/achievementcollection.enum";
import AchievementType from "../abstraction/achievementtype.enum";

export default function MainPage() {
  return (
    <div className="h-screen bg-gradient-to-br from-gray-600 via-teal-700 to-gray-800">
      <Router>
        <NavComponent></NavComponent>
        <div className="text-gray-100 mt-4">
          <Switch>
            <Route path="/" exact>
              <HomeComponent></HomeComponent>
            </Route>
            <Route path="/profile" exact>
              <ProfileComponent />
            </Route>
            <Route path={["/atjes", "/atjes/new", "/atjes/:id"]} exact>
              <ScoreboardComponent
                {...{
                  name: AchievementName.Atjes,
                  collection: AchievementCollection.atjes,
                  type: AchievementType.tijd,
                  direction: "asc",
                  limit: 25,
                }}
              ></ScoreboardComponent>
            </Route>
            <Route path={["/rietas", "/rietas/new", "/rietas/:id"]} exact>
              <ScoreboardComponent
                {...{
                  name: AchievementName.Rietas,
                  collection: AchievementCollection.rietas,
                  type: AchievementType.tijd,
                  direction: "asc",
                  limit: 25,
                }}
              ></ScoreboardComponent>
            </Route>
            <Route path={["/gewicht", "/gewicht/new", "/gewicht/:id"]} exact>
              <ScoreboardComponent
                {...{
                  name: AchievementName.Zwaargewichten,
                  collection: AchievementCollection.gewicht,
                  type: AchievementType.gewicht,
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
