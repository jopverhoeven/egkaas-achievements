import { AuthProvider } from "../contexts/auth.context";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./authentication/Login";
import Home from "./home/Home";
import Achievement from "./achievements/Achievement";
import Navbar from "./navigation/Navbar";

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="h-screen bg-gray-800 text-white">
          <Navbar />
          <Switch>
            <Route path="/" exact component={Home}></Route>
            <Route path="/achievement" exact component={Achievement}></Route>
            <Route path="/achievement/:id" component={Achievement}></Route>
            <Route path="/login" component={Login}></Route>
          </Switch>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
