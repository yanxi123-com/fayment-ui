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

export class IdWrapper extends jspb.Message {
  getId(): number;
  setId(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): IdWrapper.AsObject;
  static toObject(includeInstance: boolean, msg: IdWrapper): IdWrapper.AsObject;
  static serializeBinaryToWriter(message: IdWrapper, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): IdWrapper;
  static deserializeBinaryFromReader(message: IdWrapper, reader: jspb.BinaryReader): IdWrapper;
}

export namespace IdWrapper {
  export type AsObject = {
    id: number,
  }
}

