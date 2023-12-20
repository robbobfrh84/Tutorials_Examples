
### 🤓 Bob, this is kinda just a... test and use/add as needed kinda thing ;)

Things to add:
- // const API = async (endPoint: string, setMoviesResult: Dispatch<SetStateAction<Array<moviesResultProps>>>) => {
- We didn't do it like this. but i wanna do an example that shows how you can have hook events with arrays of objects this way, but allso with just <any>

type vs interfaces: 
- One major difference between type aliases vs interfaces are that interfaces 
are open and type aliases are closed. This means you can extend an interface 
by declaring it a second time.In the other case a type cannot be changed outside 
of its declaration.

Mostly, following this:
- https://www.w3schools.com/typescript/typescript_intro.php

Resources: 
- https://www.w3schools.com/typescript/typescript_simple_types.php
- https://bobbyhadz.com/blog/react-typescript-pass-object-as-props
- https://react.dev/learn/typescript
- https://www.codementor.io/@jesselangford472/building-a-simple-react-hook-api-call-with-typescript-1dpji3wcyt
- Fetch Example: https://codesandbox.io/s/react-fetch-api-with-typescript-0z1ex?file=/src/App.tsx:0-798
- Why it's ok for 2x requests: https://stackoverflow.com/questions/72406486/react-fetch-api-being-called-2-times-on-page-load
- Promise.all : https://stackoverflow.com/questions/46241827/fetch-api-requesting-multiple-get-requests
- Adding Bearer Tokens: https://reqbin.com/code/javascript/ricgaie0/javascript-fetch-bearer-token