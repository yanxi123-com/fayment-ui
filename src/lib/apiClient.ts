import config from "config";
import querystring from "querystring";

export async function httpGet(name: string, query?: { [key: string]: string }) {
  const body = await fetch(
    config.apiGateway + "?" + querystring.stringify({ name, ...query })
  ).then(res => res.json());

  if (body.success) {
    return body.data;
  }
  throw new Error(body.errorMsg);
}
