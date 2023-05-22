import { useEffect, useState } from 'react';
import facebook from './assets/facebook.png';
import instagram from './assets/instagram.png';
import twitter from './assets/twitter.png';
import whatsapp from './assets/whatsapp.png';
import { Link } from 'react-router-dom';
import { useNavigate, useParams } from "react-router";
import { db, streamPollListItems } from "./firebase";
import { getDoc, doc, collection, getDocs, } from "@firebase/firestore";
import { toast } from 'react-toastify';

import { getDatabase, ref, onValue } from "firebase/database";



const Result = () => {
	const pollId = useParams().pollId;
	const navigate = useNavigate();
	const [isPopupShown, setIsPopupShown] = useState(false);
	const [pollDetails, setPollDetails] = useState({});
	const [pollResult, setPollResult] = useState({ totalCount: 1, data: [] });
	let initialResult;

	let result = {}
	let totalCount = 0;

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

	const getBarWidth = (percentage) => {
		return Number(percentage).toFixed() != 0 ? `calc(${percentage}% + 1px)` : 0;
	}

	const copyLink = () => {
		navigator.clipboard.writeText(window.location.href)
		toast.success("Coppied")
		togglePopup()
	}

	useEffect(() => {
		const getPollDetails = async () => {
			const snap = await getDoc(doc(db, 'polls', pollId))

			if (snap.exists()) {
				console.log('signle ', snap.data())
				const data = snap.data();
				data.id = snap.id;
				setPollDetails(data);
				result[data.option1] = {
					count: 0,
					pollBy: []
				};
				result[data.option2] = {
					count: 0,
					pollBy: []
				};
				result[data.option3] = {
					count: 0,
					pollBy: []
				};
				result[data.option4] = {
					count: 0,
					pollBy: []
				};
				initialResult = JSON.parse(JSON.stringify(result));
			}
			else {
				navigateToHome();
			}

		}
		const getPolls = async () => {
			await streamPollListItems(pollId, (querySnapshot) => {
				totalCount = querySnapshot.size;
				result = JSON.parse(JSON.stringify(initialResult));
				querySnapshot.docs.map(docSnapshot => {
					result[docSnapshot.data().answer].count += 1;
					result[docSnapshot.data().answer].pollBy.push(docSnapshot.data().pollBy);
					console.log(docSnapshot.data().answer);
				});
				console.log(result);
				makeResult();
			},
				(error) => { console.log(error); }

			);
			await console.log('1');
		}

		const makeResult = async () => {
			let data = []
			Object.entries(result).map(item => {
				const obj = {
					'name': item[0],
					'count': item[1].count,
					'percentage': getPercentage(item[1].count),
					'pollBy': item[1].pollBy.join(',')
				}
				data.push(obj);
			})
			console.log(data);
			setPollResult({ totalCount, data })
		}

		const getPercentage = (value) => {
			if (!value) {
				return value
			}
			return ((value / totalCount) * 100).toFixed(2);
		}

		const executerFun = async () => {
			await getPollDetails()
			await getPolls()
		}

		executerFun()


	}, [])


	return (
		<section>
			<div className="card">
				<h1 className="card-heading">{pollDetails.question}</h1>
				<div className="result-wrapper mt-10">
					<div className="d-flex justify-content-between p-10 br-b">
						<span>Option</span>
						<span>Votes</span>
					</div>
					{pollResult.data.length && pollResult.data.map((item, index) => (
						<div className="option mt-5 p-10" key={index}>
							<div className="d-flex justify-content-between relative">
								<span className='pr-10'>{item.name}</span>
								<div className='colord8 pollByDetails' title={item.pollBy}>
									<span>{item.percentage}% </span>
									<span> ({item.count} votes)</span>
								</div>
							</div>
							<div className="bar mt-5">
								<div className="percent" style={{ width: getBarWidth(item.percentage) }}></div>
							</div>
						</div>
					)
					)}
					{/*                     
                    <div className="option mt-5 p-10">
                        <div className="d-flex justify-content-between">
                            <span>{pollDetails.option2}</span>
                            <span>10%</span>
                        </div>
                        <div className="bar mt-5">
                            <div className="percent" style={{width:'calc(10% + 1px)'}}></div>
                        </div>
                    </div>
                    <div className="option mt-5 p-10">
                        <div className="d-flex justify-content-between">
                            <span>{pollDetails.option3}</span>
                            <span>10%</span>
                        </div>
                        <div className="bar mt-5">
                            <div className="percent" style={{width:'calc(10% + 1px)'}}></div>
                        </div>
                    </div>
                    <div className="option mt-5 p-10">
                        <div className="d-flex justify-content-between">
                            <span>{pollDetails.option4}</span>
                            <span>10%</span>
                        </div>
                        <div className="bar mt-5">
                            <div className="percent" style={{width:'calc(10% + 1px)'}}></div>
                        </div>
                    </div> */}
				</div>

				<div className="d-flex mt-30 justify-content-center">
					<Link to={`/poll/${pollId}`}><button className="btn btn-secondary btn-sml mr-10">Vote</button></Link>
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
							<button className="btn btn-sml ml-10" onClick={copyLink}>Copy</button>
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
export default Result;