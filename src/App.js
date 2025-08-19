import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
    const [advice, setAdvice] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchAdvice();
    }, []);

    const fetchAdvice = async () => {
        const startTime = performance.now();
        setLoading(true);
        try {
            const response = await axios.get("https://api.adviceslip.com/advice");
            const { advice } = response.data.slip;
            setAdvice(advice);
        } catch (error) {
            console.error(error);
        } finally {
            const endTime = performance.now();
            console.log(`Data fetched and state updated in ${endTime - startTime}ms`);
            setLoading(false);
        }
    };

    return (
        <div className="app">
            <div className="card">
                <h1 className="heading">{loading ? "Loading..." : advice}</h1>
                <button className="button" onClick={fetchAdvice}>
                    <span> GIVE ME ADVICE! </span>
                </button>
            </div>
        </div>
    );
}

export default App;
