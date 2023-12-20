// 🚨 NOTE: This is structered differently than FetchLOR.tsx, it's ok just different. 
import { useState, useEffect } from "react";
import { log } from 'console';
import React from 'react';
import './../css/Fetch.css';

type resultProps = {
  email: string;
  gender: string;
};

export default function Fetch() {
  const [result, setResult] = useState<resultProps[]>([]);

  useEffect(() => {
    const api = async () => {
      const data = await fetch("https://randomuser.me/api", {
        method: "GET"
      });
      const jsonData = await data.json();
      // console.log("jsonData: ", jsonData)
      setResult(jsonData.results);
    };

    api();
  }, []);

  return (
    <div className="Fetch">
      <h3>- Fetch</h3>
      <div>
        {result.map((value, key) => {
          return (
            <div key={key}>
              <div>email: {value.email}</div>
              <div>gender: {value.gender}</div>
            </div>
          );
        })}
      </div>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}
