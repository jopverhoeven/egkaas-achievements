import NavItemComponent from "./nav.item.component";
import BeerBanner from "../../assets/images/beerbanner.jpg";
import { Link } from "react-router-dom";

import NavProfileComponent from "./profile/nav_profile.component";

export default function NavComponent() {
  return (
    <div
      className="h-72 flex flex-col"
      style={{
        backgroundImage: "url(" + BeerBanner + ")",
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="h-32 flex flex-col justify-center items-center text-gray-900 text-2xl font-semibold bg-gray-600 bg-opacity-70 rounded">
        <Link to="/">
          <h1 className="p-2 flex flex-auto justify-center items-center">
            EGKaaS Achievements
          </h1>
        </Link>
        <NavProfileComponent />
      </div>
      <div className="flex flex-auto flex-row overflow-x-auto px-10 justify-center items-center text-gray-100">
        <NavItemComponent
          {...{ name: "Atjes", to: "/atjes" }}
        ></NavItemComponent>
        <NavItemComponent
          {...{ name: "Rietas", to: "/rietas" }}
        ></NavItemComponent>
        <NavItemComponent
          {...{ name: "Gewicht", to: "/gewicht" }}
        ></NavItemComponent>
      </div>
    </div>
  );
}
