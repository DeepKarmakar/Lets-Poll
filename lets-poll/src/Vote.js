import { useEffect, useState } from 'react';
import facebook from './assets/facebook.png';
import instagram from './assets/instagram.png';
import twitter from './assets/twitter.png';
import whatsapp from './assets/whatsapp.png';
import { Link } from 'react-router-dom';
import { db } from "./firebase";
import { getDoc, doc, addDoc, collection } from "@firebase/firestore";
import { useNavigate, useParams } from "react-router";
import { toast } from 'react-toastify';



const Vote = () => {
    const pollId = useParams().pollId;
    const navigate = useNavigate();
    const [isPopupShown, setIsPopupShown] = useState(false);
    const [pollDetails, setPollDetails] = useState({}) 

    const togglePopup = () => {
        setIsPopupShown(!isPopupShown);
    }
    const navigateToHome = () => {
        toast.error("No such Poll, Create one");
        navigate("/");
    }
    if (!pollId) {
        navigateToHome()
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        // read the form data
        const form = e.target;
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());
        console.log(formJson);

        try {
            const colRef = collection(db, 'polls', pollDetails.id, 'poll');
            addDoc(colRef, formJson)
                .then(res => {
                    toast.success("Your Vote submitted successfully");
                    navigate(`/result/${pollDetails.id}`);
                    console.log(res);

                })
                .catch(err => {
                    console.log(err);
                })
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const getPoll = async () => {
            const snap = await getDoc(doc(db, 'polls', pollId))

            if (snap.exists()) {
              console.log('signle ',snap.data())
              const data = snap.data();
              data.id = snap.id;
              setPollDetails(data);
            }
            else {
                navigateToHome();
            }
            
        }

        getPoll()
    }, [])


    return (
        <section>
            {/* { pollDetails && (
                {pollDetails}
            )} */}
            
            <div className="card">
                <h1 className="card-heading">{pollDetails.question}</h1>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <div className="radio-group">
                            <label htmlFor="vote_option1">
                                <input type="radio" name="answer" id="vote_option1" defaultValue={pollDetails.option1} required />
                                <span>{pollDetails.option1}</span>
                            </label>
                        </div>
                        <div className="radio-group">
                            <label htmlFor="vote_option2">
                                <input type="radio" name="answer" id="vote_option2" defaultValue={pollDetails.option2} />
                                <span>{pollDetails.option2}</span>
                            </label>
                        </div>
                        <div className="radio-group">
                            <label htmlFor="vote_option3">
                                <input type="radio" name="answer" id="vote_option3" defaultValue={pollDetails.option3} />
                                <span>{pollDetails.option3}</span>
                            </label>
                        </div>
                        <div className="radio-group">
                            <label htmlFor="vote_option4">
                                <input type="radio" name="answer" id="vote_option4" defaultValue={pollDetails.option4} />
                                <span>{pollDetails.option4}</span>
                            </label>
                        </div>
                        <input type="text" name='pollBy' placeholder='Enter your Name' className='mt-10' required />
                    </div>
                    <button className="btn w-100 mt-30">Submit</button>
                </form>
                <div className="d-flex mt-30 justify-content-center">
                    <Link to={`/result/${pollDetails.id}`}><button className="btn btn-secondary btn-sml mr-10">Result</button></Link>
                    <button className="btn btn-secondary btn-sml ml-10" onClick={togglePopup}>Share</button>
                </div>
            </div>
            {isPopupShown && 
                <div className="popup-holder d-flex align-items-center justify-content-center" onClick={togglePopup}>
                    <div className="popup-content relative" onClick={(e) => e.stopPropagation()}>
                        <h1 className="ta-c">Share the Poll</h1>
                        <span className='absolute top right m-10 cur-point' onClick={togglePopup}>x</span>

                        <div className="input-group d-flex">
                            <input
                                type="text"
                                placeholder="Copy the link"
                                defaultValue={window.location.href}
                                readOnly
                            />
                            <button className="btn btn-sml ml-10" onClick={togglePopup}>Copy</button>
                        </div>
                        <div className="d-flex justify-content-center mt-10">
                        <a href={`https://wa.me/?text=${window.location.href}`} data-action="share/whatsapp/share" target="_blank"><img src={whatsapp} alt="whatsapp" width="40" className="m-10" /></a>
                            <img src={facebook} alt="Facebook" width="40" className="m-10" />
                            <img src={instagram} alt="instagram" width="40" className="m-10" />
                            <img src={twitter} alt="twitter" width="40" className="m-10" />
                        </div>
                    </div>
                </div>
            }
        </section>
    )
}
export default Vote;