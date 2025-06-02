import { useState } from 'react'
import {createBrowserRouter, RouterProvider} from "react-router";


const router = createBrowserRouter([
    {
        children: [
            {
                path: '/',
                element: <Home/>,
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
