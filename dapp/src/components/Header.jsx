import { ethers } from "ethers";
import { useState } from "react";

function Header() {
  const [signer, setSigner] = useState();

  const onClickLogOut = () => {
    setSigner(null);
  };

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

  return (
    <header className="bg-green-100 flex justify-between items-center p-8 h-20">
      <div className="text-2xl font-semibold">🌏 Earth & Run 🏃‍♀️</div>
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
          <button
            className="bg-blue-300 border-2 border-blue-500 px-4 py-2 text-xl font-semibold rounded-full hover:bg-blue-500"
            onClick={onClickMetamask}
          >
            🦊 Log In
          </button>
        )}
      </div>
    </header>
  );
}

export default Header;
