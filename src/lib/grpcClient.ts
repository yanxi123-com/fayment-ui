import { UserServicePromiseClient } from "proto/user_grpc_web_pb";
import { Error } from "grpc-web";
import config from "config";

export const userService = new UserServicePromiseClient(config.rpcService);
export type GrpcError = Error;
