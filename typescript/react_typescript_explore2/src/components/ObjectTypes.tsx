import React from 'react';
import './../css/Types.css';

interface PersonProps { // dosn't have to be props suffux. 
  name: string;
  age: number;
}

function ObjectType_simple({name, age}: PersonProps) {
  return (
    <div className="Test-container">
      <div> name: <em>{age}</em></div>
      <div> age: <em>{name}</em></div>
    </div>

  );
}


function ObjectTypes() {
  const obj = { name: 'Susan', age: 42 };

  return (
    <div className="Types">
      <h3>- ObjectTypes</h3>
      <ObjectType_simple {...obj} />
    </div>
  );
}

export default ObjectTypes;