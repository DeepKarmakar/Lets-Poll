import "./App.scss";

function App() {
    return (
        <div className="App">
            <header className="App-header d-flex align-items-center">
                <div className="container d-flex justify-content-between">
                    <span className="logo">Let's Poll</span>
                    <div className="form-check form-switch">
                        <input type="checkbox" id="switch" defaultChecked />
                        <label htmlFor="switch">Dak</label>
                    </div>
                </div>
            </header>
            <section>
                <div className="container">
                    <div className="card">
                        <h1 className="card-heading">
                            What would you like to ask?
                        </h1>
                        <div className="input-group">
                            <label htmlFor="">Question</label>
                            <input
                                type="text"
                                placeholder="What would you like to ask?"
                            />
                        </div>
                        <div className="input-group multuple-inp">
                            <label htmlFor="">Options</label>
                            <input type="text" placeholder="Option 1" />
                            <input type="text" placeholder="Option 2" />
                            <input type="text" placeholder="Option 3" />
                            <input type="text" placeholder="Option 4" />
                        </div>
                        <div className="separator"></div>
                        <div className="poll-settings mb-30">
                            <h2>Poll Settings</h2>
                            <div className="input-group">
                                <label
                                    htmlFor="singleChoice"
                                    className="d-block smaller-font"
                                >
                                    <input
                                        type="radio"
                                        name="pollType"
                                        id="singleChoice"
                                        defaultChecked
                                    />
                                    Single Choice
                                </label>
                                <label
                                    htmlFor="multipleChoice"
                                    className="d-block smaller-font"
                                >
                                    <input
                                        type="radio"
                                        name="pollType"
                                        id="multipleChoice"
                                    />
                                    Multiple Choice
                                </label>
                            </div>
                        </div>
                        <button className="btn w-100">Create Poll</button>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default App;
