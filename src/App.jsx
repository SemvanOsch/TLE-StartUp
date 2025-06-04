import { createBrowserRouter, RouterProvider } from "react-router";
import Multiplication from "./pages/multiplication.jsx";
import LevelSelector from "./pages/LevelSelector.jsx";

const router = createBrowserRouter([
    {
        children: [
            // {
            //   path: '/',
            //   element: <Home />,
            // },
            {
                path: '/multiplication',
                element: <Multiplication />,
            },
            {
                path: '/levels',
                element: <LevelSelector />,
            },
        ]
    }
]);

function App() {
    return (
        <RouterProvider router={router} />
    );
}

export default App;
