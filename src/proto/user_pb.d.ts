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

export class AddGroupReq extends jspb.Message {
  getName(): string;
  setName(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AddGroupReq.AsObject;
  static toObject(includeInstance: boolean, msg: AddGroupReq): AddGroupReq.AsObject;
  static serializeBinaryToWriter(message: AddGroupReq, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AddGroupReq;
  static deserializeBinaryFromReader(message: AddGroupReq, reader: jspb.BinaryReader): AddGroupReq;
}

export namespace AddGroupReq {
  export type AsObject = {
    name: string,
  }
}

export class ListGroupsReq extends jspb.Message {
  getType(): number;
  setType(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListGroupsReq.AsObject;
  static toObject(includeInstance: boolean, msg: ListGroupsReq): ListGroupsReq.AsObject;
  static serializeBinaryToWriter(message: ListGroupsReq, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListGroupsReq;
  static deserializeBinaryFromReader(message: ListGroupsReq, reader: jspb.BinaryReader): ListGroupsReq;
}

export namespace ListGroupsReq {
  export type AsObject = {
    type: number,
  }
}

export class GroupDTO extends jspb.Message {
  getId(): number;
  setId(value: number): void;

  getName(): string;
  setName(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GroupDTO.AsObject;
  static toObject(includeInstance: boolean, msg: GroupDTO): GroupDTO.AsObject;
  static serializeBinaryToWriter(message: GroupDTO, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GroupDTO;
  static deserializeBinaryFromReader(message: GroupDTO, reader: jspb.BinaryReader): GroupDTO;
}

export namespace GroupDTO {
  export type AsObject = {
    id: number,
    name: string,
  }
}

export class GroupsDTO extends jspb.Message {
  getGroupsList(): Array<GroupDTO>;
  setGroupsList(value: Array<GroupDTO>): void;
  clearGroupsList(): void;
  addGroups(value?: GroupDTO, index?: number): GroupDTO;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GroupsDTO.AsObject;
  static toObject(includeInstance: boolean, msg: GroupsDTO): GroupsDTO.AsObject;
  static serializeBinaryToWriter(message: GroupsDTO, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GroupsDTO;
  static deserializeBinaryFromReader(message: GroupsDTO, reader: jspb.BinaryReader): GroupsDTO;
}

export namespace GroupsDTO {
  export type AsObject = {
    groupsList: Array<GroupDTO.AsObject>,
  }
}

export class SwitchGroupReq extends jspb.Message {
  getIdA(): number;
  setIdA(value: number): void;

  getIdB(): number;
  setIdB(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SwitchGroupReq.AsObject;
  static toObject(includeInstance: boolean, msg: SwitchGroupReq): SwitchGroupReq.AsObject;
  static serializeBinaryToWriter(message: SwitchGroupReq, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SwitchGroupReq;
  static deserializeBinaryFromReader(message: SwitchGroupReq, reader: jspb.BinaryReader): SwitchGroupReq;
}

export namespace SwitchGroupReq {
  export type AsObject = {
    idA: number,
    idB: number,
  }
}

