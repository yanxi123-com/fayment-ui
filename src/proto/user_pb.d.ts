import * as jspb from "google-protobuf"

import * as base_pb from './base_pb';

export class LoginReq extends jspb.Message {
  getEmail(): string;
  setEmail(value: string): void;

  getPassword(): string;
  setPassword(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): LoginReq.AsObject;
  static toObject(includeInstance: boolean, msg: LoginReq): LoginReq.AsObject;
  static serializeBinaryToWriter(message: LoginReq, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): LoginReq;
  static deserializeBinaryFromReader(message: LoginReq, reader: jspb.BinaryReader): LoginReq;
}

export namespace LoginReq {
  export type AsObject = {
    email: string,
    password: string,
  }
}

export class LoginRes extends jspb.Message {
  getEmail(): string;
  setEmail(value: string): void;

  getToken(): string;
  setToken(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): LoginRes.AsObject;
  static toObject(includeInstance: boolean, msg: LoginRes): LoginRes.AsObject;
  static serializeBinaryToWriter(message: LoginRes, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): LoginRes;
  static deserializeBinaryFromReader(message: LoginRes, reader: jspb.BinaryReader): LoginRes;
}

export namespace LoginRes {
  export type AsObject = {
    email: string,
    token: string,
  }
}

export class GetUserKvReq extends jspb.Message {
  getKey(): string;
  setKey(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetUserKvReq.AsObject;
  static toObject(includeInstance: boolean, msg: GetUserKvReq): GetUserKvReq.AsObject;
  static serializeBinaryToWriter(message: GetUserKvReq, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetUserKvReq;
  static deserializeBinaryFromReader(message: GetUserKvReq, reader: jspb.BinaryReader): GetUserKvReq;
}

export namespace GetUserKvReq {
  export type AsObject = {
    key: string,
  }
}

export class UserKvDTO extends jspb.Message {
  getKey(): string;
  setKey(value: string): void;

  getValue(): string;
  setValue(value: string): void;

  getCreatedat(): number;
  setCreatedat(value: number): void;

  getUpdatedat(): number;
  setUpdatedat(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UserKvDTO.AsObject;
  static toObject(includeInstance: boolean, msg: UserKvDTO): UserKvDTO.AsObject;
  static serializeBinaryToWriter(message: UserKvDTO, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UserKvDTO;
  static deserializeBinaryFromReader(message: UserKvDTO, reader: jspb.BinaryReader): UserKvDTO;
}

export namespace UserKvDTO {
  export type AsObject = {
    key: string,
    value: string,
    createdat: number,
    updatedat: number,
  }
}

