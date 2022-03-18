import { FC } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import { Login } from "../pages/Login";
import { Main } from "../pages/Main";
import { ProductFile } from "../pages/ProductFile";
import { Account } from "../pages/Account";
import { NotFound } from "../pages/Error/404";

export const AppRoutes: FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Main />} />
          <Route path="/product-file" element={<ProductFile />} />
          <Route path="/user/account" element={<Account />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};
