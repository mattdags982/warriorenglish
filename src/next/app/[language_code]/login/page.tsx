"use client";

import jwt_decode from "jwt-decode";
import {
  JWTAuthenticateUser,
  JWTRefreshToken,
  getTranslations,
} from "../../api/auth";
import { useRouter } from "next/navigation";
import { Button } from "@mui/material";

// some notes:
// 1. you should log a user out if they get an Unauthorized response from a protected route
// 2. You should refresh your access token every time a user re-enters your site (if they have a refresh token)
// 3. You should periodically be refreshing your access token. You need to determine proper expiration times and a good method to have this running in the background
export default function Login({ params: { language_code } }) {
  const router = useRouter();

  let submitLogin = async (e) => {
    e.preventDefault();
    let username = e.target.username.value;
    let password = e.target.password.value;
    const res = await JWTAuthenticateUser(username, password);
    if (res.status === 200) {
      const data = await res.json();
      //example to get user info from jwt
      // const decode = jwt_decode(data.access);
      localStorage.setItem("authTokens", JSON.stringify(data));
      router.push(`/${language_code}`);
    } else {
      alert("invalid username or password");
      return false;
    }
  };

  let Logout = () => {
    localStorage.removeItem("authTokens");
    router.push("/");
  };

  // this needs to be triggered every certain number of minutes (maybe 1 or 2 min before the token would expire)
  // need to figure out the best way to trigger a task in next
  let updateToken = async () => {
    const authTokens = JSON.parse(localStorage.getItem("authTokens"));
    const refreshToken = authTokens.refresh;
    if (!refreshToken) {
      return;
    }
    const res = await JWTRefreshToken(refreshToken);
    if (res.status === 200) {
      const data = await res.json();
      localStorage.setItem("authTokens", JSON.stringify(data));
    } else {
      alert("invalid refresh token");
      return false;
    }
  };

  let testProtectedRoute = async () => {
    const authTokens = JSON.parse(localStorage.getItem("authTokens"));
    if (!authTokens) {
      return;
    }
    const token = authTokens.access;
    const res = await getTranslations(token);
    if (res.status === 200) {
      const data = await res.json();
      console.log("data: ", data);
    } else {
      alert("invalid token");
      return false;
    }
  };

  return (
    <div className="w-full flex flex-col items-center gap-10 justify-center mt-24">
      <form className="flex flex-col gap-8 w-[50%]" onSubmit={submitLogin}>
        <input type="text" name="username" placeholder="enter username"></input>
        <input
          type="password"
          name="password"
          placeholder="enter password"
        ></input>
        <input type="submit" />
      </form>
      <Button onClick={Logout}>Logout</Button>
      <Button onClick={updateToken}>Refresh</Button>
      <Button onClick={testProtectedRoute}>
        Test Protected Route (Get Translations)
      </Button>
    </div>
  );
}
