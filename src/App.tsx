import { createSignal } from "solid-js";
import "./App.css";

function App() {

    const [count, setCount] = createSignal(0);
    return (
        <>
            <div class="text-center">
                <h1>{count()}</h1>
                <button class="btn" onClick={() => setCount(count() + 1)}>count</button>
            </div>
        </>
    );
}

export default App;
