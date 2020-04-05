import { AppError } from "lib/error";

// export function parseGrpcError(grpcError: any): { code: string; msg: string } {
//   if (grpcError.code !== 2) {
//     // grpc status 非 OTHER
//     return { code: grpcError.code.toString(), msg: grpcError.message };
//   }
//   const originMsg: string = decodeURIComponent(grpcError.message);
export function parseGrpcError(grpcError: any): AppError {
  if (grpcError.code !== 2) {
    // grpc status 非 OTHER
    return new AppError([grpcError.code.toString(), grpcError.message]);
  }
  const originMsg: string = decodeURIComponent(grpcError.message);
  const i = originMsg.indexOf(",");
  return new AppError([originMsg.substring(0, i), originMsg.substring(i + 1)]);
}

export function handleGrpcError(grpcError: any) {
  throw parseGrpcError(grpcError);
}
