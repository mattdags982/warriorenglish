"use client";

import jwt_decode from "jwt-decode";
import { JWTAuthenticateUser } from "../../api/auth";
import { redirect } from "next/navigation";

export default function Login({ params: { language_code } }) {
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
    } else {
      alert("invalid username or password");
      return false;
    }
  };
  return (
    <div className="w-full flex justify-center mt-24">
      <form className="flex flex-col gap-8 w-[50%]" onSubmit={submitLogin}>
        <input type="text" name="username" placeholder="enter username"></input>
        <input
          type="password"
          name="password"
          placeholder="enter password"
        ></input>
        <input type="submit" />
      </form>
    </div>
  );
}
