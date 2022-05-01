import './ExecuteTransaction.css'

const ExecuteTransaction = ({ value, onClick }) => {
    return (
        <div className="ExecuteTxnContainer">
            <button className="MakeTransaction" onClick={onClick}>
                {value}
            </button>
            <form>
                <input className="TextInput"  type="checkbox" id="ExecTrue" value="ExecTrue" name="Execute"/>
                <label className="RadioValue" for="ExecTrue"><b>Approve</b></label>
                <input className="TextInput" placeholder="Transaction Id" id="TransactionId" name="TransactionId"/>
            </form>
        </div>
    );
};
export default ExecuteTransaction;