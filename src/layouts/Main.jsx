import { Outlet, useLoaderData } from "react-router-dom";
import { fetchData } from "../functions/helpers.js";
import Nav from "../components/Nav.jsx";

// loader
export function mainLoader() {
  const userName = fetchData("userName");
  return { userName };
}

const Main = () => {
  const { userName } = useLoaderData();

  return (
    <div>
      <Nav userName={userName} />
      <main>
        <Outlet />
      </main>
    </div>
  );
};
export default Main;
