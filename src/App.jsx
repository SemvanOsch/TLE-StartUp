import { useState } from 'react'
import {createBrowserRouter, RouterProvider} from "react-router";
import HomePage from "./pages/homePage.jsx";

const router = createBrowserRouter([
    {
        children: [
            {
                path: '/',
                element: <HomePage/>,
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
