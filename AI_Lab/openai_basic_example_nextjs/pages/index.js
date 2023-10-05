import Head from "next/head";
import { useState } from "react";
import main from "./main.module.css";

export default function Home() {
  const [promptType, setPromptType] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ promptType: promptType }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }
      console.log('data.result:',JSON.parse(data.result))
      setResult(data.result);
      setPromptType("");
    } catch(error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div >

      <style jsx global>{`
        body {
          background-color: red;
          background: url('bg.png');
        }
      `}</style>

      <Head>
        <title>OpenAI Quickstart</title>
        link
      </Head>

      <main>
        <h3> Open A.I. Card Builder </h3>
        {/* <form onSubmit={onSubmit}>
          <input
            type="text"
            name="animal"
            placeholder="Enter an animal"
            value={animalInput}
            onChange={(e) => setAnimalInput(e.target.value)}
          />
          <input type="submit" value="Generate names" />
        </form>
        <br/> */}
        <form onSubmit={onSubmit}>
          <input
            type="submit"
            value="Create New Object"
            onClick={(e) => setPromptType("createObject")}
          />
        </form>
        <form onSubmit={onSubmit}>
          <input
            type="submit"
            value="Update Object Value"
            onClick={(e) => setPromptType("updateField")}
          />
        </form>
        <div>{result}</div>
        <div className={main.blue}> HI BLUE </div>
      </main>
    </div>
  );
}
