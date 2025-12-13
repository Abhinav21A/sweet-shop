import React, { useState } from "react";
import api, { setAuthToken } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { email, password });
      const { token } = res.data;
      localStorage.setItem("token", token);
      setAuthToken(token);
      nav("/");
    } catch (err: any) {
      alert(err?.response?.data?.message || "Login failed");
    }
  };

  return (
    <form onSubmit={submit} style={{maxWidth:400, margin:"2rem auto"}}>
      <h1>Login</h1>
      <div><input value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="email" /></div>
      <div><input value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="password" type="password" /></div>
      <button type="submit">Login</button>
    </form>
  );
}
