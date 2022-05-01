import './GetTxnId.css'

const GetTxnId = ({ value, onClick }) => {
    return (
        <div>
        <button className="GetTxnId" onClick={onClick}>
            Get TxnId
        </button>
        <p className="TxnText">Current TxnId: {value}</p>
        </div>
    );
};
export default GetTxnId;