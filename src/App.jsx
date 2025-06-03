import { useState } from 'react'
import {createBrowserRouter, RouterProvider} from "react-router";
import StudentOverview from "./pages/StudentOverview.jsx";
import Student from "./pages/StudentDetails.jsx";
import Multiplication from "./pages/multiplication.jsx";
import UpgradePage from "./pages/UpgradePage.jsx";


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
