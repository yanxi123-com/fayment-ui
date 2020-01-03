interface Config {
  rpcService: string;
}

const configModule: Config =
  process.env.NODE_ENV === "development"
    ? require("./dev")
    : process.env.REACT_APP_STAGE === "beta"
    ? require("./beta")
    : require("./prod");

export default configModule;
