import React, { useEffect, useState, useCallback } from "react";
import {
  Routes,
  Route,
  useLocation,
  useNavigate,
  Navigate,
  Outlet,
} from "react-router-dom";
import AuthStorage from "../helper/AuthStorage";
import AuthLayOut from "../layout/AuthLayOut";
import Layout from "../layout/Layout";
import Home from "./home/Home";
import Dashboard from "./home/Dashboard";
import SignIn from "./signIn/SignIn";
import SignUp from "./signUp/SignUp";
import { useDispatch } from "react-redux";
import { changeLoginState } from "../redux/actions/loginAction";
// import Product from './product/Product';
import Add_Edit_Product from "./administration/masterData/products/Add_Edit_Product";
import Products from "./administration/masterData/products/Products";
import Entities from "./administration/entities/Entities";
import Users from "./administration/users/Users";
import Add_Edit_User from "./administration/users/Add_Edit_User";
import RatingAgencies from "./administration/masterData/ratingAgency/RatingAgencies";
import RatingAgenciesEdit from "./administration/masterData/ratingAgency/RatingAgenciesEdit";
import Countries from "./administration/masterData/countries/Countries";
import Transactions from "./transactions/Transactions";
import Add_Edit_Entities from "./administration/entities/addEditEntities/Add_Edit_Entities";
import Edit_Transactions from "./transactions/Edit_Transactions";
import FinalPage from "./transactions/FinalPage";
import AdminLogin from "./admin/AdminLogin";
import FunctionalAdmin from "./functionalAdmin/FunctionalAdmin";
import EntitiesRole from "./administration/EntitiesRole";
import STORAGEKEY from "../config/APP/app.config";
import RiskAssessment from "./transactions/riskAssessment/RiskAssessment";
import Ports from "./administration/masterData/ports/Ports";
import AirBases from "./administration/masterData/airBases/AirBases";
import { ApiGet, ApiPost } from "../helper/API/ApiData";
import { Create_new_password } from "./administration/users/CreatePassword";
import CreateAdmin from "./functionalAdmin/CreateAdmin";
import Admin from "./functionalAdmin/AdminTable";
import ForgetPassword from "./functionalAdmin/ForgetPassword";
import UserForgetPassword from "./signIn/UserForgetPassword";
import EditAdmin from "./functionalAdmin/EditAdmin";

const pathForLayout = [
  "/",
  "/signin",
  "/signup",
  "/admin-login",
  "/fa-login",
  "/verify-user",
  "/forget-password",
  "/user/forget",
];
const Index = () => {
  const location = useLocation();
  const token = AuthStorage.getToken();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userRoutes = [
    {
      path: "/dashboard",
      component: Dashboard,
    },
    {
      path: "/transactions",
      component: Transactions,
    },
    {
      path: "/edit-transactions",
      component: Edit_Transactions,
    },
    {
      path: "/risk-assessment",
      component: RiskAssessment,
    },
    {
      path: "/final-page",
      component: FinalPage,
    },
  ];

  const AdminRoutes = [
    {
      path: "/dashboard",
      component: Dashboard,
    },
    {
      path: "/admins",
      component: Admin,
    },
    // {
    //   path: "/entities-role",
    //   component: EntitiesRole,
    // },
    {
      path: "/admin-edit",
      component: EditAdmin,
    },
    {
      path: "/transactions",
      component: Transactions,
    },
    {
      path: "/edit-transactions",
      component: Edit_Transactions,
    },
    {
      path: "/add-user",
      component: Add_Edit_User,
    },
    {
      path: "/edit-user",
      component: Add_Edit_User,
    },
    {
      path: "/users",
      component: Users,
    },
  ];
  const superAdminRoutes = [
    {
      path: "/dashboard",
      component: Dashboard,
    },
    {
      path: "/add-product",
      component: Add_Edit_Product,
    },
    {
      path: "/edit-product",
      component: Add_Edit_Product,
    },
    {
      path: "/products",
      component: Products,
    },
    {
      path: "/entities",
      component: Entities,
    },
    {
      path: "/entities-role",
      component: EntitiesRole,
    },
    {
      path: "/add-edit-entities",
      component: Add_Edit_Entities,
    },
    {
      path: "/admins",
      component: Admin,
    },
    {
      path: "/create-admin",
      component: CreateAdmin,
    },
    {
      path: "/admin-edit",
      component: EditAdmin,
    },
    {
      path: "/transactions",
      component: Transactions,
    },
    {
      path: "/edit-transactions",
      component: Edit_Transactions,
    },
    {
      path: "/rating-agencies",
      component: RatingAgencies,
    },
    {
      path: "/rating-agencies-edit",
      component: RatingAgenciesEdit,
    },
    {
      path: "/add-user",
      component: Add_Edit_User,
    },
    {
      path: "/edit-user",
      component: Add_Edit_User,
    },
    {
      path: "/users",
      component: Users,
    },
    {
      path: "/countries",
      component: Countries,
    },
    {
      path: "/ports",
      component: Ports,
    },
    {
      path: "/airports",
      component: AirBases,
    },
    {
      path: "/risk-assessment",
      component: RiskAssessment,
    },
    {
      path: "/final-page",
      component: FinalPage,
    },
  ];

  let primaryLinks = [];

  const handleInvalidToken = () => {
    if (pathForLayout.includes(location.pathname)) {
      navigate(location.pathname);
    } else {
      navigate("/");
    }
    localStorage.clear();
  };

  const checkUserRoleAndNavigate = () => {
    if (AuthStorage.isUserAuthenticated()) {
      ApiGet("user/validateToken")
        .then((res) => {
          if (res.status === 200) {
            const currentRole = AuthStorage.getStorageData(STORAGEKEY.roles);
            const currentPath = location.pathname;

            if (
              currentRole === "superAdmin" ||
              currentRole === "admin" ||
              currentRole === "user"
            ) {
              const validPaths = primaryLinks.map((link) => link.path);

              // Only redirect to the dashboard if the current path isn't valid for the role
              if (!validPaths.includes(currentPath)) {
                navigate("/dashboard");
              }
            }
          } else {
            handleInvalidToken();
          }
        })
        .catch((e) => {
          handleInvalidToken();
        });
    }
  };

  useEffect(() => {
    checkUserRoleAndNavigate();
  }, []);

  if (AuthStorage.getStorageData(STORAGEKEY.roles) === "user") {
    primaryLinks = userRoutes;
    console.log(primaryLinks);
  } else if (AuthStorage.getStorageData(STORAGEKEY.roles) === "admin") {
    primaryLinks = AdminRoutes;
  } else if (AuthStorage.getStorageData(STORAGEKEY.roles) === "superAdmin") {
    primaryLinks = superAdminRoutes;
    console.log(primaryLinks);
  }

  return (
    <>
      {pathForLayout.length > 0 &&
        pathForLayout.includes(location.pathname) && (
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/admin-login" element={<AdminLogin />} />
              <Route path="/fa-login" element={<FunctionalAdmin />} />
              <Route path="/verify-user" element={<Create_new_password />} />
              <Route path="/forget-password" element={<ForgetPassword />} />
              <Route path="/user/forget" element={<UserForgetPassword />} />
            </Routes>
          </Layout>
        )}
      {primaryLinks.length > 0 &&
        primaryLinks.find((obj) => obj.path === location.pathname) && (
          <AuthLayOut>
            <Routes>
              {primaryLinks.map((item) => (
                <Route
                  key={item.path}
                  path={`/${item.path}`}
                  element={<item.component />}
                />
              ))}
            </Routes>
          </AuthLayOut>
        )}
      <Routes></Routes>
    </>
  );
};

export default Index;

const RouteProtecter = () => {
  const isAuthenticated = AuthStorage.isUserAuthenticated();
  return !isAuthenticated ? (
    <Navigate to={"/"} />
  ) : (
    <AuthLayOut>
      <Outlet />
    </AuthLayOut>
  );
};

const PublicRoutes = () => {
  const isAuthenticated = AuthStorage.isUserAuthenticated();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    !isAuthenticated ? (
      pathForLayout.includes(location.pathname) ? (
        <Navigate to={location} />
      ) : (
        <Navigate to="/" />
      )
    ) : pathForLayout.includes(location.pathname) ? (
      navigate(-1)
    ) : location.pathname === "/" ? (
      navigate("/products")
    ) : (
      navigate("/")
    );
  }, [isAuthenticated]);

  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};
