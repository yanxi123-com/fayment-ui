import { JsonRpc } from "eosjs";

const rpc = new JsonRpc("https://mainnet.eos.dfuse.io");

export async function getAccountInfo(name: string) {
  return rpc.get_account(name);
}
