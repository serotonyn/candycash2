import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Dashboard } from "@/pages/Dashboard";
import Options from "@/pages/Options";
import Profile from "@/pages/Profile";
import Company from "@/pages/Company";
import Categories from "@/pages/Categories";
import Category from "@/pages/Category";
import Appearance from "@/pages/Appearance";
import Sales from "@/pages/Sales";
import { SaleDetails } from "./options/sales/SaleDetails";

export const Routes = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Dashboard />,
    },

    {
      path: "/options",
      element: <Options />,
      children: [
        {
          path: "profile",
          element: <Profile />,
        },
        {
          path: "company",
          element: <Company />,
        },
        {
          path: "categories",
          element: <Categories />,
          children: [
            {
              path: ":categoryId",
              element: <Category />,
            },
          ],
        },
        {
          path: "sales",
          element: <Sales />,
          children: [
            {
              path: ":saleId",
              element: <SaleDetails />,
            },
          ],
        },
        {
          path: "appearance",
          element: <Appearance />,
        },
      ],
    },
  ]);

  // Provide the router configuration using RouterProvider
  return <RouterProvider router={router} />;
};
