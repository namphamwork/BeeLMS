// App.tsx
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import NotFoundPage from "./pages/404/NotFoundPage";
import { MainRouter, PublicRouter, SubRouter } from "./router";
import PrivateRoutes from "./router/PrivateRoutes";
import theme from "./theme";


import AuthRoutes from "./router/AuthRoutes";
import ScrollToTop from "./layout/ScrollToTop/ScrollToTop";
const MainLayout = lazy(() => import('./components/MainLayout/MainLayout'))

const App: React.FC = () => {

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ScrollToTop>
        <Routes >
          <Route element={<PrivateRoutes />}>
            {/* Protected routes */}
            <Route element={<MainLayout />}>
              {MainRouter.map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  element={route.element}
                />
              ))}
            </Route>

            {SubRouter.map((route) => (
              <Route key={route.path} path={route.path} element={route.element} />
            ))}
          </Route>
          <Route element={<AuthRoutes />}>
            {PublicRouter.map((route) => (
              <Route key={route.path} path={route.path} element={route.element} />
            ))}
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </ScrollToTop>
    </ThemeProvider>
  );
};

export default App;
