import { useEffect, useState } from 'react';
import facebook from './assets/facebook.png';
import instagram from './assets/instagram.png';
import twitter from './assets/twitter.png';
import whatsapp from './assets/whatsapp.png';
import { Link } from 'react-router-dom';
import { db } from "./firebase";
import { getDoc, doc } from "@firebase/firestore";


const Vote = () => {
    const [isPopupShown, setIsPopupShown] = useState(false);

    const togglePopup = () => {
        setIsPopupShown(!isPopupShown);
    }

    useEffect(() => {
        const getPoll = async () => {
            const snap = await getDoc(doc(db, 'polls', 'RcT9lMV18FsaXRNfEkT2'))

            if (snap.exists()) {
              console.log('signle ',snap.data())
            }
            else {
              console.log("No such document")
            }
            
        }

        getPoll()
    }, [])


    return (
        <section>

            <div className="card">
                <h1 className="card-heading">
                    What would you like to ask?
                </h1>
                <div className="input-group">
                    <div className="radio-group">
                        <label htmlFor="vote_option1">
                            <input type="radio" name="vote-option" id="vote_option1" />
                            <span>Option 1</span>
                        </label>
                    </div>
                    <div className="radio-group">
                        <label htmlFor="vote_option2">
                            <input type="radio" name="vote-option" id="vote_option2" />
                            <span>Option 2</span>
                        </label>
                    </div>
                    <div className="radio-group">
                        <label htmlFor="vote_option3">
                            <input type="radio" name="vote-option" id="vote_option3" />
                            <span>Option 3</span>
                        </label>
                    </div>
                </div>
            <button className="btn w-100 mt-30">Submit</button>
                <div className="d-flex mt-30 justify-content-center">
                    <Link to="/result"><button className="btn btn-secondary btn-sml mr-10">Result</button></Link>
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
                                value="https://colorlib.com/wp/one-page-psd-web-templates/"
                            />
                            <button className="btn btn-sml ml-10" onClick={togglePopup}>Copy</button>
                        </div>
                        <div className="d-flex justify-content-center mt-10">
                            <img src={whatsapp} alt="whatsapp" width="40" className="m-10" />
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