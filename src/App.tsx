import React, { useState } from "react";

function App(): JSX.Element {
  const [count, setCount] = useState<number>(0);

  return (
    <div>
      <h1>Hello from React + Parcel + TypeScript!</h1>
      <p>Your app is running successfully.</p>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
    </div>
  );
}

export default App;
