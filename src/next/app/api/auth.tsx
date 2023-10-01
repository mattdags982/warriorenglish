export async function JWTAuthenticateUser(username, password) {
  console.log("usrname: ", username, "password: ", password);
  const res = await fetch(`http://127.0.0.1:8000/api/token/`, {
    cache: "no-store",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });
  console.log("res:", res);
  return res;
}
