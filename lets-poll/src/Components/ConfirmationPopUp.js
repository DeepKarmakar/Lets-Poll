import "./ConfirmationPopUp-style.css";
const ConfirmationPopUp = ({detail, confirmEventHandeler}) => {
    return ( 
        <div className="confirmation-popup">
            <div className="popup-wrapper">
                <div className="popup-content">
                    <p>{detail || 'Are you Sure?'}</p>
                </div>
                <div className="popup-action">
                    <div className="bg-red" onClick={() => confirmEventHandeler('no')}>No</div>
                    <div className="bg-green" onClick={() => confirmEventHandeler('yes')}>Yes</div>
                </div>
            </div>
        </div>
    );
}
 
export default ConfirmationPopUp;