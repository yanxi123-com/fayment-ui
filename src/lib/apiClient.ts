import config from "config";
import querystring from "querystring";
import { globalStore } from "stores/GlobalStore";

function getHeaders(): HeadersInit {
  const token = globalStore.user && globalStore.user.token;
  const headers: HeadersInit = {
    "Content-Type": "application/json"
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  return headers;
}

function getUrl(name: string, query?: { [name: string]: string }) {
  return (
    config.apiGateway +
    "?" +
    querystring.stringify({
      name,
      ...query
    })
  );
}

export async function httpGet(
  name: string,
  query?: { [name: string]: string }
) {
  const resBody = await fetch(getUrl(name, query), {
    method: "GET",
    headers: getHeaders()
  }).then(res => res.json());

  if (resBody.success) {
    return resBody.data;
  }
  throw new Error(resBody.errorMsg);
}

export async function httpPost(name: string, body: { [key: string]: string }) {
  const resBody = await fetch(getUrl(name), {
    method: "post",
    body: JSON.stringify(body),
    headers: getHeaders()
  }).then(res => res.json());

  if (resBody.success) {
    return resBody.data;
  }
  throw new Error(resBody.errorMsg);
}
