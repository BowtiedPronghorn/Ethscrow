import './MakeTransaction.css'

const MakeTransaction = ({ value, onClick}) => {
    return (
        <div className="Container">
            <button className="MakeTransaction" onClick={onClick}>
                {value}
            </button>
            <form>
                <input className="TextInput" placeholder="Recipient" id="Recipient" name="Recipient"/>
                <input className="TextInput" placeholder="Manager" id="Manager" name="Manager"/>
                <input className="TextInput" placeholder="Amount (ETH)" id="Amount" name="Amount"/>
            </form>
        </div>
    );
};
export default MakeTransaction;