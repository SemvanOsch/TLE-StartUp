import { useState } from 'react'
import {createBrowserRouter, RouterProvider} from "react-router";
import HomePage from "./pages/HomePage.jsx";
import StudentOverview from "./pages/StudentOverview.jsx";
import Student from "./pages/StudentDetails.jsx";
import CreateStudent from "./pages/CreateStudent.jsx";
import Multiplication from "./pages/Multiplication.jsx";
import UpgradePage from "/src/pages/UpgradePage.jsx"
import LoginPage from "./pages/LoginPage.jsx";
import PlusSums from "./pages/PlusSums.jsx";

import LevelSelector from "./pages/LevelSelector.jsx";
import Division from "./pages/Division.jsx";

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
                path: '/student/create',
                element: <CreateStudent/>,
            },
            {
                path: '/',
                element: <HomePage/>,
            },
            {
                path: '/multiplication',
                element: <Multiplication/>,
            },
            {
                path: '/division',
                element: <Division/>,
            },
            {
                path: '/upgrade',
                element: <UpgradePage/>
            },
            {
                path: '/levels',
                element: <LevelSelector />,
            },
            {
                path: '/login',
                element: <LoginPage/>
            },
            {
                path: '/plusSums',
                element: <PlusSums/>
            },
            {
                path: '/division',
                element: <Division/>
            }
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
