// 🚨 NOTE: This is structered differently than Fetch.tsx, it's ok just different. 
import { useState, useEffect } from "react";
import { log } from 'console';
import React from 'react';
import './../css/Fetch.css';

type moviesResultProps = {
  name: string;
  _id: string;
};

type charactersResultProps = {
  name: string;
  race: string;
  _id: string;
};

type quotesResultProps = {
  character: string;
  dialog: string;
  _id: string;
}

function FetchLOR() {

  const [moviesResult, setMoviesResult] = useState<moviesResultProps[]>([]);
  const [charactersResult, setCharactersResult] = useState<charactersResultProps[]>([]);
  const [quotesResult, setQuotesResult] = useState<quotesResultProps[]>([]);
  // 🔥 Maybe to make this more dynamic, we just have one results with sub.results???
  // I think you can useState to only update prop.movies etc...

  useEffect(() => {
    const api = async (endPoint: string) => {
      const data = await fetch("https://the-one-api.dev/v2/"+endPoint+"?limit=10", {
        method: "GET",
        headers: { 
          Authorization: 'Bearer rH8tv7ym61IwE_vgaev0'
        }
      });
      const jsonData = await data.json();
      console.log("jsonData: ", jsonData)
      switch(endPoint) {
        case "movie":
          setMoviesResult(jsonData.docs);
          break;
        case "character":
          setCharactersResult(jsonData.docs);
          break;
        case "quote":
          setQuotesResult(jsonData.docs);
          break;
      }
    };

    api('movie');
    api('character');
    api('quote');

  }, []);

  return (
    <div className="Fetch">
      <h3>- FetchLOR (Lord of the Rings API Example)</h3>

      <div>
        <h4>🍿 movies</h4>
        {moviesResult.map((value, key) => {
          return (
            <div key={key}>
              <div>name: {value.name}</div>
              <hr />
            </div>
          );
        })}
      </div>

      <div>
        <h4>🧙‍♂️ characters</h4>
        {charactersResult.map((value, key) => {
          return (
            <div key={key}>
              <div>name: {value.name}</div>
              <div>race: {value.race}</div>
              <hr />
            </div>
          );
        })}
      </div>

      <div>
        <h4>🧙‍♂️ quotes</h4>
        {quotesResult.map((value, key) => {
          return (
            <div key={key}>
              {/* <div>character: {value.character}</div> */}
              <div>dialog: {value.dialog}</div>
              <hr />
            </div>
          );
        })}
      </div>

    </div>
  );
}

export default FetchLOR;