import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../../contexts/auth.context";

//@ts-ignore
export default function PrivateRoute({ component: Component, ...rest }) {
  //@ts-ignore
  const { currentUser } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) => {
        return currentUser ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        );
      }}
    ></Route>
  );
}
