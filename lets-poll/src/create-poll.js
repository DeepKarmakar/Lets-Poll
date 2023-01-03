import { db } from "./firebase";
import { addDoc, collection } from "@firebase/firestore";


const CreatePoll = () => {
    const firebaseRef = collection(db, 'polls');


    const handleSubmit = (e) => {
        e.preventDefault();

        // read the form data
        const form = e.target;
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());

        try {
            addDoc(firebaseRef, formJson)
        } catch (error) {
            console.log(error);
        }

    }
    return (
        <section>
            <div className="card">
                <form onSubmit={handleSubmit}>
                    <h1 className="card-heading">
                        What would you like to ask?
                    </h1>
                    <div className="input-group">
                        <label htmlFor="">Question</label>
                        <input
                            type="text"
                            placeholder="What would you like to ask?"
                            name="question"
                        />
                    </div>
                    <div className="input-group multuple-inp">
                        <label htmlFor="">Options</label>
                        <input type="text" placeholder="Option 1" name="option1" />
                        <input type="text" placeholder="Option 2" name="option2" />
                        <input type="text" placeholder="Option 3" name="option3" />
                        <input type="text" placeholder="Option 4" name="option4" />
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
                                    value="single_choice"
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
                                    value="multiple_choice"
                                />
                                Multiple Choice
                            </label>
                        </div>
                    </div>
                    <button className="btn w-100">Create Poll</button>
                </form>
            </div>
        </section>
    );
};

export default CreatePoll;
