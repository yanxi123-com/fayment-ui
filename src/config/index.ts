interface Config {
  apiGateway: string;
}

const configModule: Config =
  process.env.NODE_ENV === "development" ? require("./dev") : require("./prod");

export default configModule;
