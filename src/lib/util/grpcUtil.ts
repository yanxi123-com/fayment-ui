export function parseGrpcError(grpcError: any): { code: string; msg: string } {
  const originMsg: string = decodeURIComponent(grpcError.message);
  const [code, msg] = originMsg.split(",", 2);
  return { code, msg };
}
