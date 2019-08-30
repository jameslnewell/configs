import { useState } from "react";

export const Counter = () => {
  const [count, setCount] = useState(0);
  return (
    <>
      The button has been clicked {count} times!
      <button onClick={() => setCount(state => state + 1)}>Click me!</button>
    </>
  );
};
