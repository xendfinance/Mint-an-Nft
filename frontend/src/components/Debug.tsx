/* eslint-disable react/no-unescaped-entities */
"use client";
import deployedContracts from "@/contracts/deployedContracts";
import { useState } from "react";
import {
  createPublicClient,
  createWalletClient,
  http,
  custom,
  getContract,
} from "viem";
import { useAccount } from "wagmi";
import { assetchain_testnet } from "@/utils/assetchainTestnetChain";
import Link from "next/link";

const Debug = () => {
  //useState Variables
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [url, setURL] = useState("");
  const [transactionHash, setTransactionHash] = useState<any>("");
  const { address: account } = useAccount();
  const isEmpty = (obj: any) => {
    return Object.keys(obj).length === 0;
  };
  const publicClient = createPublicClient({
    chain: assetchain_testnet,
    transport: http(),
  });

  const walletClient = createWalletClient({
    chain: assetchain_testnet,
    transport: custom(window.ethereum!),
  });

  const contract = getContract({
    address: deployedContracts.assetchain_testnet.address as `0x${string}`,
    abi: deployedContracts.assetchain_testnet.abi,
    client: publicClient,
  });

  const MintNFt = () => {};
  const disableButton = !account;
  return (
    <div className="flex items-center flex-col w-full">
      {isEmpty(deployedContracts) ? (
        <p className="text-center text-3xl font-extrabold">
          No Deployed Contracts
        </p>
      ) : (
        <div>
          <p className="text-center text-3xl font-extrabold">
            {deployedContracts.assetchain_testnet.contractName} Minter 🔗
          </p>

          <div className="py-8 w-full">
            {/* Implement the Contract Write Functions Here */}
            <div className="w-full pt-8">
              <div className="bg-white rounded-3xl shadow-md shadow-secondary border border-base-300 flex flex-col mt-10 relative">
                <div className="h-[5rem] w-[5.5rem] bg-[#DAE8FF] absolute self-start rounded-[22px] -top-[38px] -left-[1px] -z-10 py-[0.65rem] shadow-lg shadow-base-300">
                  <div className="flex items-center justify-center space-x-2">
                    <p className="my-0 text-sm">Write</p>
                  </div>
                </div>
                <div className="p-5 w-96">
                  <div className="flex flex-col gap-3 py-5 first:pt-0 last:pb-1">
                    <p className="my-0 break-words font-extrabold">mintNft</p>
                    <div>
                      <h2> Link to asset: </h2>
                      <input
                        type="text"
                        className="input input-ghost focus-within:border-transparent focus:outline-none focus:bg-transparent focus:text-gray-400 h-[2.2rem] min-h-[2.2rem] px-4 border w-full font-medium placeholder:text-accent/50 text-gray-400"
                        placeholder="e.g. https://gateway.pinata.cloud/ipfs/<hash>"
                        value={url}
                        onChange={(event) => setURL(event.target.value)}
                        disabled={disableButton}
                      />
                    </div>
                    <div>
                      <h2> Name: </h2>
                      <input
                        type="text"
                        className="input input-ghost focus-within:border-transparent focus:outline-none focus:bg-transparent focus:text-gray-400 h-[2.2rem] min-h-[2.2rem] px-4 border w-full font-medium placeholder:text-accent/50 text-gray-400"
                        placeholder="e.g. My Nft"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        disabled={disableButton}
                      />
                    </div>
                    <div>
                      <h2> Description </h2>
                      <input
                        type="text"
                        className="input input-ghost focus-within:border-transparent focus:outline-none focus:bg-transparent focus:text-gray-400 h-[2.2rem] min-h-[2.2rem] px-4 border w-full font-medium placeholder:text-accent/50 text-gray-400"
                        placeholder="e.g. My Nft"
                        value={description}
                        onChange={(event) => setName(event.target.value)}
                        disabled={disableButton}
                      />
                    </div>
                    <button
                      onClick={MintNFt}
                      className="bottom-2 right-2 bg-blue-500 text-white py-2 px-4 rounded disabled:cursor-not-allowed disabled:bg-slate-200"
                      disabled={disableButton}
                    >
                      Mint NFT📡
                    </button>
                    {transactionHash && (
                      <Link
                        href={`https://testnet.xendrwachain.com/transactions/${transactionHash}`}
                        target="_blank"
                      >
                        view transaction hash here
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Debug;
