import * as jspb from "google-protobuf"

export class Empty extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Empty.AsObject;
  static toObject(includeInstance: boolean, msg: Empty): Empty.AsObject;
  static serializeBinaryToWriter(message: Empty, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Empty;
  static deserializeBinaryFromReader(message: Empty, reader: jspb.BinaryReader): Empty;
}

export namespace Empty {
  export type AsObject = {
  }
}

export class Limit extends jspb.Message {
  getSkip(): number;
  setSkip(value: number): void;

  getMax(): number;
  setMax(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Limit.AsObject;
  static toObject(includeInstance: boolean, msg: Limit): Limit.AsObject;
  static serializeBinaryToWriter(message: Limit, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Limit;
  static deserializeBinaryFromReader(message: Limit, reader: jspb.BinaryReader): Limit;
}

export namespace Limit {
  export type AsObject = {
    skip: number,
    max: number,
  }
}

export class IdWrapper extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): IdWrapper.AsObject;
  static toObject(includeInstance: boolean, msg: IdWrapper): IdWrapper.AsObject;
  static serializeBinaryToWriter(message: IdWrapper, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): IdWrapper;
  static deserializeBinaryFromReader(message: IdWrapper, reader: jspb.BinaryReader): IdWrapper;
}

export namespace IdWrapper {
  export type AsObject = {
    id: string,
  }
}

