export function parseGrpcError(grpcError: any): { code: string; msg: string } {
  if (grpcError.code !== 2) {
    // grpc status 非 OTHER
    return { code: grpcError.code.toString(), msg: grpcError.message };
  }
  const originMsg: string = decodeURIComponent(grpcError.message);
  const i = originMsg.indexOf(",");
  return { code: originMsg.substring(0, i), msg: originMsg.substring(i + 1) };
}
