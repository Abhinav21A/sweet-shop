import React, { useEffect, useState } from "react";
import api from "../services/api";

export default function Dashboard() {
  const [sweets, setSweets] = useState<any[]>([]);
  const [query, setQuery] = useState("");

  const fetchSweets = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const res = await api.get("/sweets");
      setSweets(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(()=>{ fetchSweets(); }, []);

  const purchase = async (id: number) => {
    try {
      await api.post(`/sweets/${id}/purchase`);
      fetchSweets();
    } catch (err: any) {
      alert(err?.response?.data?.message || "Purchase failed");
    }
  };

  const filtered = sweets.filter(s=> s.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <div style={{maxWidth:800, margin:"1rem auto"}}>
      <h1>Sweets</h1>
      <input placeholder="Search" value={query} onChange={(e)=>setQuery(e.target.value)} />
      <ul>
        {filtered.map(s => (
          <li key={s.id} style={{margin:"0.5rem 0"}}>
            {s.name} - ₹{s.price} - {s.quantity}
            <button disabled={s.quantity <= 0} onClick={() => purchase(s.id)} style={{marginLeft:10}}>Purchase</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
