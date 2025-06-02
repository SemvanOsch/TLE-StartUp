import { useState } from 'react'
import {createBrowserRouter, RouterProvider} from "react-router";
import UpgradePage from "/src/pages/UpgradePage.jsx"

const router = createBrowserRouter([
    {
        children: [
            {
                path: '/',
                element: <Home/>,
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
