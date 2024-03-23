
import { Routes, Route, Link } from "react-router-dom";
import "@aws-amplify/ui-react/styles.css";
import { ThemeProvider } from "@aws-amplify/ui-react";
import theme from "./theme";
import Login from "./components/Login/Login";
import Layout from "./components/Layout";
import Dashboard from "./pages/dashboard";
import Profile from "./pages/profile";
import ProductTable from "./pages/tables/ProductTable"
import OrderTable from "./pages/tables/OrdersTable"
import CustomersTable from "./pages/tables/CustomerTable";
import AuthorTable from "./pages/tables/AutorTable";
import EditProduct from "./pages/forms/EditProduct";
import AddAuthor from "./pages/forms/AddAuthor";
import AddProduct from "./pages/forms/AddProduct";
import Forgot from "./components/ForgotPassword/Forgot";
import NewPassword from "./components/ForgotPassword/SetNewPassword/NewPassword";
import EditAuthor from "./pages/forms/EditAuthor";
import { useSelector } from 'react-redux';



export default function App() {
  const authUser= useSelector((state) => state?.currentUser[0]?.user) || [];
  return (
    <ThemeProvider theme={theme}>
      <div>
        {/* Routes nest inside one another. Nested route paths build upon
            parent route paths, and nested route elements render inside
            parent route elements. See the note about <Outlet> below. */}
        <Routes>
          {authUser?.role?
             <Route path="/" element={<Layout />}>
             <Route index element={<Dashboard />} />
             <Route path="/admin/add-product" element={<AddProduct />} />
             <Route path="/admin/add-author" element={<AddAuthor />} />
             <Route path="/admin/edit-profile/:id" element={<EditAuthor />} />
             <Route path="/admin/edit-product" element={<EditProduct />} />
             <Route path="/admin/orders" element={<OrderTable />} />
             <Route path="/admin/products" element={<ProductTable />} />
             <Route path="/admin/customers" element={<CustomersTable />} />
             <Route path="/admin/author" element={<AuthorTable />} />
            
             {/* <Route path="users-table" element={<UsersTable />} /> */}
             <Route path="/profile" element={<Profile />} />
 
             {/* Using path="*"" means "match anything", so this route
                 acts like a catch-all for URLs that we don't have explicit
                 routes for. */}
             <Route path="*" element={<NoMatch />} />
           </Route>:
              <Route>
                  <Route index element={<Login />} />
                  <Route path="/admin/forgot-password" element={<Forgot />} />
                  <Route path="/admin/new-password" element={<NewPassword />} />
                  <Route path="*" element={<NoMatch />} />
              </Route>
          }
         
        </Routes>
      </div>
    </ThemeProvider>
  );
}

function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}
