import React from "react";
import { Icon } from "@aws-amplify/ui-react";
import {
  MdDashboard,
  MdAccountBox,
  MdOutlineTableChart,
  MdShoppingCart,
  MdPeople
} from "react-icons/md";

export const baseConfig = {
  projectLink: "/", // GitHub link in the navbar
  docsRepositoryBase: "", // base URL for the docs repository
  titleSuffix: "",
  search: true,
  header: true,
  headerText: "Logo",
  footer: true,
  footerText: (
    <>
      <span>
        © MIT {new Date().getFullYear()}, Made with ❤️ by {""}
        <a href="https://er-manishgupta.netlify.app" target="_blank" rel="noreferrer">
         Er. Manish Gupta
        </a>
      </span>
    </>
  ),

  logo: (
    <>
      <img
        src={process.env.PUBLIC_URL + "/logo.png"}
        alt="logo"
        width="30"
        height="22"
      />
    </>
  ),
};

// /// Navigation sidebar
export const appNavs = [
  {
    eventKey: "dashboard",
    icon: <Icon as={MdDashboard} />,
    title: "Dashboard",
    to: "/",
  },

  {
    eventKey: "tables",
    icon: <Icon as={MdOutlineTableChart} />,
    title: "Products",
    to: "/admin/products",
  
  },
  {
    eventKey: "tables",
    icon: <Icon as={MdShoppingCart} />,
    title: "Orders",
    to: "/admin/orders",
  },
  {
    eventKey: "forms",
    icon: <Icon as={MdPeople} />,
    title: "Customers",
    to: "/admin/customers",
    children: [
      {
        eventKey: "form-basic",
        title: "users",
        to: "/admin/customers",
      },
      {
        eventKey: "form-wizard",
        title: "Admin",
        to: "/admin/author",
      },
    ],
  },
  {
    eventKey: "profile",
    icon: <Icon as={MdAccountBox} />,
    title: "Settings",
    to: "/settings",
  },
];

export const BASE_URL='http://localhost:8000';
