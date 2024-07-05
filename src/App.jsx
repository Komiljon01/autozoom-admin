import "./App.css";
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import Dashboard from "./components/dashboard/Dashboard";
import Brands from "./components/brands/Brands";
import Cars from "./components/cars/Cars";
import Categories from "./components/categories/Categories";
import Cities from "./components/cities/Cities";
import Locations from "./components/locations/Locations";
import Models from "./components/models/Models";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
        <Route index element={<Login />} />
        <Route path="home" element={<Home />}>
          <Route index element={<Dashboard />} />
          <Route path="cars" element={<Cars />} />
          <Route path="locations" element={<Locations />} />
          <Route path="brands" element={<Brands />} />
          <Route path="models" element={<Models />} />
          <Route path="cities" element={<Cities />} />
          <Route path="categories" element={<Categories />} />
        </Route>
      </Route>
    )
  );
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
