import { useState } from 'react'
import {createBrowserRouter, RouterProvider} from "react-router";
import StudentOverview from "./pages/StudentOverview.jsx";
import Student from "./pages/StudentDetails.jsx";


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
