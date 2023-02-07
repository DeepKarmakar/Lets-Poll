import { Link, Route, BrowserRouter as Router, Routes, Navigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import "./App.scss";
import CreatePoll from "./create-poll";
import Vote from "./Vote";
import Result from "./Result";

const App = () => {
    return (
        <Router>
            <div className="App">
                <header className="App-header d-flex align-items-center">
                    <div className="container d-flex justify-content-between">
                        <Link to="/"><span className="logo">Let's Poll</span></Link>
                        <Link to="/poll">Poll</Link>
                        <div className="form-check form-switch">
                            <input type="checkbox" id="switch" defaultChecked />
                            <label htmlFor="switch">Dak</label>
                        </div>
                    </div>
                </header>
                <div className="container">
                    <Routes>
                        <Route path="/" exact element={<CreatePoll />} />
                        <Route path="/poll" element={<Navigate to="/" />} />
                        <Route path="/poll/:pollId" element={<Vote />} />
                        <Route path="/result/:pollId" element={<Result />} />
                    </Routes>
                </div>
                <ToastContainer
                    position="bottom-center"
                    autoClose={3000}
                    hideProgressBar
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="dark"
                />
            </div>
        </Router>
    );
};

export default App;
