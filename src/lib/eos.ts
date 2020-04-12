import { JsonRpc } from "eosjs";

// https://mainnet.eos.dfuse.io
// https://api1.eosasia.one
const rpc = new JsonRpc("https://api1.eosasia.one");

export async function getAccountInfo(name: string) {
  return rpc.get_account(name);
}
