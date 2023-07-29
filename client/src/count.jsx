import { useState } from "react";

const Increment = ({initialCount}) => {
    const [count , setCount] = useState(initialCount);
    // Objects are not valid as a React child we need to pass them in curl braces
    return (
        <>
        count: {count}
         <button onClick={() => setCount(initialCount)}>Reset</button>
        <button onClick={() => setCount(prevCount => prevCount + 1)}>+</button>
        <button onClick={() => setCount(prevCount => prevCount -1)}>-</button>
        
        </>
        
        
    )
}
export default Increment