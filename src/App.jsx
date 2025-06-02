import { useState } from 'react'
import {createBrowserRouter, RouterProvider} from "react-router";
import HomePage from "./pages/HomePage.jsx";
import Multiplication from "./pages/multiplication.jsx";
import UpgradePage from "./pages/UpgradePage.jsx";


const router = createBrowserRouter([
    {
        children: [
            {
                path: '/',
                element: <HomePage/>,
            },
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
