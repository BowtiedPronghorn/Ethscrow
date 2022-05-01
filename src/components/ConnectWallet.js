import './ConnectWallet.css'

const ConnectWallet = ({ value, onClick }) => {
    return (
        <button className="ConnectWallet" onClick={onClick}>
            {value}
        </button>
    );
};
export default ConnectWallet;