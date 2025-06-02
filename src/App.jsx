import { useState } from 'react'
import {createBrowserRouter, RouterProvider} from "react-router";


const router = createBrowserRouter([
    {
        children: [
            {
                path: '/overview',
                element: <StudentOverview/>,
            },
            {
                path: '/student/:id',
                element: <Student/>,
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
