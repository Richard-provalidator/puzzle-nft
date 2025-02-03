import { ethers } from "ethers";
import { Link } from "react-router-dom";

function Header({ signer, setSigner }) {
  const onClickMetamask = async () => {
    try {
      if (!window.ethereum) return;

      // get metamask
      var windowProvider = window.ethereum;
      var wantedProvider = "MetaMask"; // want to get MetaMask
      if (window.ethereum.providerMap) {
        for (let [key, value] of window.ethereum.providerMap.entries()) {
          if (key === wantedProvider) {
            windowProvider = value;
            break;
          }
        }
      }

      const provider = new ethers.BrowserProvider(windowProvider);

      setSigner(await provider.getSigner());
    } catch (error) {
      console.error(error);
    }
  };

  const onClickLogOut = () => {
    setSigner(null);
  };

  return (
    <header className="flex justify-between items-center px-8 h-20">
      <div className="text-2xl font-semibold">🌏 Earth & Run 🏃‍♀️</div>
      <div className="flex gap-4">
        <Link className="link-style" to="/">
          Home
        </Link>
        <Link className="link-style" to="/mint">
          Mint
        </Link>
      </div>
      <div>
        {signer ? (
          <button
            className="text-xl font-semibold hover:text-gray-600 hover:underline"
            onClick={onClickLogOut}
          >
            {signer.address.substring(0, 7)}...
            {signer.address.substring(signer.address.length - 5)}
          </button>
        ) : (
          <button className="btn-style" onClick={onClickMetamask}>
            🦊 Log In
          </button>
        )}
      </div>
    </header>
  );
}

export default Header;
