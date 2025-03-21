import React from "react";
import axios from "axios";
import "./App.css";

class App extends React.Component {
    state = {
        advice: "",
        loading: false
    };

    componentDidMount(){
        this.fetchAdvice();
    }

    fetchAdvice = async () => {
        const startTime = performance.now();
        this.setState({ loading: true });
        try {
            const response = await axios.get("https://api.adviceslip.com/advice");
            const { advice } = response.data.slip;
            this.setState({ advice });
        } catch (error) {
            console.log(error);
        } finally {
            const endTime = performance.now();
            console.log(`Data fetched and state updated in ${endTime - startTime}ms`);
            this.setState({ loading: false });
        }
    };

    render() {
        const { advice, loading } = this.state;

        return (
            <div className="app">
                <div className="card">
                    <h1 className="heading">{loading ? "Loading..." : advice}</h1>
                    <button className="button" onClick={this.fetchAdvice}>
                        <span> GIVE ME ADVICE! </span>
                    </button>
                </div>
            </div>
        );
    }
}

export default App;