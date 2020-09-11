import React, { lazy, Suspense } from "react";
import { Switch } from "react-router-dom";

import "./App.css";
import Header from "./components/header";
import { AuthProvider } from "./context";

import { AuthRoute, UserRoute, AdminRoute } from "./utilis/authRoute";

const HomePage = lazy(() => import("./pages/home-page"));
const AdminPage = lazy(() => import("./pages/admin-page"));
const PostsPage = lazy(() => import("./pages/posts-page"));
const PostPage = lazy(() => import("./pages/post-page"));
const CountryPage = lazy(() => import("./pages/country-page"));
const CountriesPage = lazy(() => import("./pages/countries-page"));
const LoginPage = lazy(() => import("./pages/login-page"));
const RegisterPage = lazy(() => import("./pages/register-page"));

function App() {
  return (
    <div className='App'>
      <AuthProvider>
      <Header />
      <Switch>
        <Suspense fallback={<div>Loading...</div>}>
          <UserRoute exact path='/' component={HomePage} />
          <AuthRoute exact path='/login' component={LoginPage} />
          <AuthRoute exact path='/register' component={RegisterPage} />
          <AdminRoute exact path='/admin' component={AdminPage} />
          <UserRoute exact path='/posts' component={PostsPage} />
          <UserRoute exact path='/posts/:id' component={PostPage} />
          <UserRoute exact path='/countries' component={CountriesPage} />
          <UserRoute exact path='/countries/:id' component={CountryPage} />
        </Suspense>
      </Switch>
      </AuthProvider>
    </div>
  );
}

export default App;
