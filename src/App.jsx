import { useState } from 'react'
import {createBrowserRouter, RouterProvider} from "react-router";
import Multiplication from "./pages/multiplication.jsx";

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
