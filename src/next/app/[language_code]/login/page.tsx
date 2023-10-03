"use client";

import jwt_decode from "jwt-decode";
import { JWTAuthenticateUser, JWTRefreshToken } from "../../api/auth";
import { useRouter } from "next/navigation";
import { Button } from "@mui/material";

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
    </div>
  );
}
