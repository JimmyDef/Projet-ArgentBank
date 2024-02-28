import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import SignIn from "./pages/SignIn";
import NotFound from "./pages/404";
// import { Provider } from "react-redux";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
// import { store } from "./redux/store";

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
        index: "/sign-in",
        element: <SignIn />,
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
    // <Provider store={store}>
    <RouterProvider router={router} />
    // </Provider>
  );
}

export default App;
