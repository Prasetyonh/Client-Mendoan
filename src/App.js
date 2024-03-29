import React, { useState, useEffect } from "react";
import axios from "axios";

import Login from "./Pages/user/Login";
import Mendoans from "./Mendoans";

import { API_URL } from "./Utils/Constant";
import { ForgotPassword } from "./Pages/user";
import { BrowserRouter, Route } from "react-router-dom";

function App() {
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    const checkLogin = async () => {
      const token = localStorage.getItem("tokenStore");
      if (token) {
        const verified = await axios.get(API_URL + "/token", {
          headers: { Authorization: token },
        });
        setIsLogin(verified.data);
        if (verified.data === false) return localStorage.clear();
      } else {
        setIsLogin(false);
      }
    };
    checkLogin();
  }, []);

  return (
    <div>
      {isLogin ? (
        <Mendoans setIsLogin={setIsLogin} />
      ) : (
        <BrowserRouter>
          <div>
            <Login setIsLogin={setIsLogin} />

            <Route path="/forgot">
              <ForgotPassword setIsLogin={setIsLogin} />
            </Route>
          </div>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
