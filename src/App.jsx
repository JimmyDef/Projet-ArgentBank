import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import NotFound from "./pages/404";
import { Provider } from "react-redux";
import Home from "./pages/Home";
import Profile from "./pages/Profile copt";
import Signin from "./pages/SignIn";
import { store } from "./redux/store";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,

    children: [
      {
        index: "/",
        element: <Home />,
      },
      {
        path: "sign-in",
        element: <Signin />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "not-found",
        element: <NotFound />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
