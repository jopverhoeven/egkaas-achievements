import React from "react";
import { Link } from "react-router-dom";

export default function NavItemComponent(props: any) {
  return (
    <div className="mr-2">
      <Link to={props.to}>
        <div className="w-20 h-20 bg-gray-600 rounded flex items-center justify-center">
          {props.name}
        </div>
      </Link>
    </div>
  );
}
