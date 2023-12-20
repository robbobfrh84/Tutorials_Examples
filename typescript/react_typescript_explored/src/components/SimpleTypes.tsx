import React from 'react';
import './../css/Types.css';


function SimpleTypeString({ myStr }: { myStr: string }) {
  return (
    <div className="Test-container">SimpleTypeString: <em>{myStr}</em></div>
  );
}

function SimpleTypeNumber({ myNum }: { myNum: number }) {
  return (
    <div className="Test-container">SimpleTypeNumber: <em>{myNum}</em></div>
  );
}
// * * * Other Simple Types
// - https://www.w3schools.com/typescript/typescript_simple_types.php
// * boolean
// * bigint - whole numbers and floating point values, but allows larger negative and positive numbers than the number type.
// * symbol are used to create a globally unique identifier.

//  BOB!!!! Add passing multiple simple types, different than object
//  const test: string = "hi"
//  const test2: number = 10
//  return ( ... 
//    <SomeComponent test={test} test2={test2}/> 
//    <SomeComponent {...{test,test2}}/> // just interesting to understand it works this way too

// 
// ---
//  function Content({ test, test2 }: { test: string, test2: number }) {
// 

function SimpleTypes() {
  let intro: string = "Hello World!";
  let favNum: number = 49;  
  return (
    <div className="Types">
      <h3>- SimpleTypes</h3>
      <SimpleTypeString myStr={intro} />
      <SimpleTypeNumber myNum={favNum} />
    </div>
  );
}

export default SimpleTypes;