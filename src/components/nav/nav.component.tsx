import React from 'react'
import NavItemComponent from './nav.item.component'

export default function NavComponent() {
    return (
        <div className="h-24 flex justify-center items-center bg-gray-700 text-gray-200 overflow-x-auto px-10">
          <NavItemComponent {...{ name: "Atjes", to: "/atjes" }}></NavItemComponent>
          <NavItemComponent {...{ name: "Rietas", to: "/rietas" }}></NavItemComponent>
          <NavItemComponent {...{ name: "Gewicht", to: "/gewicht" }}></NavItemComponent>

        </div>
    )
}
