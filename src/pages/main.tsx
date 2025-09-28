import { ThemeProvider } from "@/context/ThemeProvider";
import ErrorPage from "@/pages/Error";
import "@/styles/index.css";
import { RouteDefinition } from "@/types/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createRoot } from "react-dom/client";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import App from "./App";
import Index from "./Index";
import Login from "./Login";
import Users from "./Users";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route errorElement={<ErrorPage />} element={<App />}>
        <Route element={<Index />} path={RouteDefinition.INDEX} />
        <Route element={<Users />} path={RouteDefinition.USERS} />
      </Route>

      <Route element={<Login />} path={RouteDefinition.LOGIN} />
    </>
  )
);

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>

    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);
