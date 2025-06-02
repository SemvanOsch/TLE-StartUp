import { useState } from 'react'
import {createBrowserRouter, RouterProvider} from "react-router";
import Multiplication from "./pages/multiplication.jsx";
import UpgradePage from "/src/pages/UpgradePage.jsx"


const router = createBrowserRouter([
    {
        children: [
            // {
            //     path: '/',
            //     element: <Home/>,
            // },
            {
                path: '/multiplication',
                element: <Multiplication/>,
            },
            {
                path: '/upgrade',
                element: <UpgradePage/>
            },
        ]
    }
]);

function App() {
  return (
      <>
          <RouterProvider router={router}/>
      </>
  )
}

export default App
