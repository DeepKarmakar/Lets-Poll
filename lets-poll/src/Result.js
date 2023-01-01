import { useState } from 'react';
import facebook from './assets/facebook.png';
import instagram from './assets/instagram.png';
import twitter from './assets/twitter.png';
import whatsapp from './assets/whatsapp.png';
import { Link } from 'react-router-dom';


const Result = () => {
    const [isPopupShown, setIsPopupShown] = useState(false);

    const togglePopup = () => {
        setIsPopupShown(!isPopupShown);
    }

    // const stop = (e) => {
    //     e.stopPropagation();
    // }


    return (
        <section>

            <div className="card">
                <h1 className="card-heading">
                    What would you like to ask?
                </h1>
                <div className="result-wrapper mt-10">
                    <div className="d-flex justify-content-between p-10 br-b">
                        <span>Option</span>
                        <span>Votes</span>
                    </div>
                    <div className="option mt-5 p-10">
                        <div className="d-flex justify-content-between">
                            <span>Option 1</span>
                            <span>100%</span>
                        </div>
                        <div className="bar mt-5">
                            <div className="percent" style={{width:'calc(100% + 1px)'}}></div>
                        </div>
                    </div>
                    <div className="option mt-5 p-10">
                        <div className="d-flex justify-content-between">
                            <span>Option 1</span>
                            <span>10%</span>
                        </div>
                        <div className="bar mt-5">
                            <div className="percent" style={{width:'calc(10% + 1px)'}}></div>
                        </div>
                    </div>
                </div>
                
                <div className="d-flex mt-30 justify-content-center">
                    <Link to="/poll"><button className="btn btn-secondary btn-sml mr-10">Vote</button></Link> 
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
export default Result;