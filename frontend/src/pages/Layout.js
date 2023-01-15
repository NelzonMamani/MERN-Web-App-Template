//rafce 

import { Outlet, Link } from "react-router-dom";

// The "layout route" is a shared component that inserts common content on all pages, such as a navigation menu.
const Layout = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/blogs">Blogs</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </nav>

      <Outlet />  
    </>
  )
  // The <Outlet> renders the current route selected.
  // <Link> is used to set the URL and keep track of browsing history.
};

export default Layout;