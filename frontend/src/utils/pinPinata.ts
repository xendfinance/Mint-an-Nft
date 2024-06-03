import axios from "axios";
import toast from "react-hot-toast";

const key = process.env.NEXT_PUBLIC_PINATA_KEY;
const secret = process.env.NEXT_PUBLIC_PINATA_SECRET;


export const pinJsontoIPFS = async (JsonFile: any) => {
  const url = "https://api.pinata.cloud/pinning/pinJSONToIPFS";


  try {
    const res = await axios.post(url, JsonFile, {
      headers: {
        'pinata_api_key': key,
        'pinata_secret_api_key': secret,
      },
    });
    return "https://gateway.pinata.cloud/ipfs/" + res.data.IpfsHash;

  } catch (e: any) {
    toast.error(e.message);
  }
};
