/* eslint-disable react/no-unescaped-entities */
"use client";
import deployedContracts from "@/contracts/deployedContracts";
import { useState, useEffect } from "react";
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
import { pinJsontoIPFS } from "@/utils/pinPinata";
import toast from "react-hot-toast";

const Debug = () => {
  //useState Variables
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [url, setURL] = useState("");
  const [loading, setLoading] = useState(false);
  const [transactionHash, setTransactionHash] = useState<any>("");
  const { address: account } = useAccount();
  const [publicClient, setPublicClient] = useState<any>(null);
  const [walletClient, setWalletClient] = useState<any>(null);
  const isEmpty = (obj: any) => {
    return Object.keys(obj).length === 0;
  };
  // const publicClient = createPublicClient({
  //   chain: assetchain_testnet,
  //   transport: http(),
  // });

  // const walletClient = createWalletClient({
  //   chain: assetchain_testnet,
  //   transport: custom(window.ethereum!),
  // });

  useEffect(() => {
    if (typeof window !== "undefined") {
      setPublicClient(
        createPublicClient({
          chain: assetchain_testnet,
          transport: http(),
        })
      );

      setWalletClient(
        createWalletClient({
          chain: assetchain_testnet,
          transport: custom(window.ethereum!),
        })
      );
    }
  }, []);

  const MintNFt = async () => {
    if (url.trim() == "" || name.trim() == "" || description.trim() == "") {
      toast.error(
        "❗Please make sure all fields are completed before minting."
      );
      setLoading(false);
    }

    setLoading(true);
    const metaData = {
      url: url,
      name: name,
      description: description,
    };
    const pinataResponse = await pinJsontoIPFS(metaData);

    toast.success("Successfully Upload Metadata to IPFS", {
      duration: 4000,
    });
    toast.loading("Minting Nft.........", {
      duration: 8000,
    });

     if (!account || !publicClient || !walletClient) return;
    const { request } = await publicClient.simulateContract({
      address: deployedContracts.assetchain_testnet.address as `0x${string}`,
      abi: deployedContracts.assetchain_testnet.abi,
      functionName: "mintNft",
      args: [account, pinataResponse],
      account,
    });
    console.log("pinataResponse", pinataResponse);
    const hash = await walletClient.writeContract(request);
    setTransactionHash(hash);
    toast.success("Successfully Minted your NFT", {
      duration: 4000,
    });
    setLoading(false);
  };

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
                        // Example: https://gateway.pinata.cloud/ipfs/QmeGSgQAUGExsmFRfURvwuaDoyA4TCLmtLWvtuq7DNeMvB
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
                        placeholder="e.g. This is my nft"
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                        disabled={disableButton}
                      />
                    </div>
                    <button
                      onClick={MintNFt}
                      className="bottom-2 right-2 bg-blue-500 text-white py-2 px-4 rounded disabled:cursor-not-allowed disabled:bg-slate-200"
                      disabled={disableButton}
                    >
                      {loading ? "Loading.........." : "Mint NFT📡"}
                    </button>
                    {transactionHash && (
                      <Link
                        href={`https://testnet.assetchain.org/transactions/${transactionHash}`}
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
