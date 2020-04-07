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

export class SwitchOrderReq extends jspb.Message {
  getIdA(): number;
  setIdA(value: number): void;

  getIdB(): number;
  setIdB(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SwitchOrderReq.AsObject;
  static toObject(includeInstance: boolean, msg: SwitchOrderReq): SwitchOrderReq.AsObject;
  static serializeBinaryToWriter(message: SwitchOrderReq, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SwitchOrderReq;
  static deserializeBinaryFromReader(message: SwitchOrderReq, reader: jspb.BinaryReader): SwitchOrderReq;
}

export namespace SwitchOrderReq {
  export type AsObject = {
    idA: number,
    idB: number,
  }
}

export class ImportCoinGroupsReq extends jspb.Message {
  getGroups(): string;
  setGroups(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ImportCoinGroupsReq.AsObject;
  static toObject(includeInstance: boolean, msg: ImportCoinGroupsReq): ImportCoinGroupsReq.AsObject;
  static serializeBinaryToWriter(message: ImportCoinGroupsReq, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ImportCoinGroupsReq;
  static deserializeBinaryFromReader(message: ImportCoinGroupsReq, reader: jspb.BinaryReader): ImportCoinGroupsReq;
}

export namespace ImportCoinGroupsReq {
  export type AsObject = {
    groups: string,
  }
}

export class AddCoinAccountReq extends jspb.Message {
  getGroupId(): number;
  setGroupId(value: number): void;

  getName(): string;
  setName(value: string): void;

  getSym(): string;
  setSym(value: string): void;

  getAmount(): number;
  setAmount(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AddCoinAccountReq.AsObject;
  static toObject(includeInstance: boolean, msg: AddCoinAccountReq): AddCoinAccountReq.AsObject;
  static serializeBinaryToWriter(message: AddCoinAccountReq, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AddCoinAccountReq;
  static deserializeBinaryFromReader(message: AddCoinAccountReq, reader: jspb.BinaryReader): AddCoinAccountReq;
}

export namespace AddCoinAccountReq {
  export type AsObject = {
    groupId: number,
    name: string,
    sym: string,
    amount: number,
  }
}

export class ListCoinAccountsReq extends jspb.Message {
  getGroupId(): number;
  setGroupId(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListCoinAccountsReq.AsObject;
  static toObject(includeInstance: boolean, msg: ListCoinAccountsReq): ListCoinAccountsReq.AsObject;
  static serializeBinaryToWriter(message: ListCoinAccountsReq, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListCoinAccountsReq;
  static deserializeBinaryFromReader(message: ListCoinAccountsReq, reader: jspb.BinaryReader): ListCoinAccountsReq;
}

export namespace ListCoinAccountsReq {
  export type AsObject = {
    groupId: number,
  }
}

export class CoinAccountDTO extends jspb.Message {
  getId(): number;
  setId(value: number): void;

  getName(): string;
  setName(value: string): void;

  getSym(): string;
  setSym(value: string): void;

  getAmount(): number;
  setAmount(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CoinAccountDTO.AsObject;
  static toObject(includeInstance: boolean, msg: CoinAccountDTO): CoinAccountDTO.AsObject;
  static serializeBinaryToWriter(message: CoinAccountDTO, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CoinAccountDTO;
  static deserializeBinaryFromReader(message: CoinAccountDTO, reader: jspb.BinaryReader): CoinAccountDTO;
}

export namespace CoinAccountDTO {
  export type AsObject = {
    id: number,
    name: string,
    sym: string,
    amount: number,
  }
}

export class CoinAccountsDTO extends jspb.Message {
  getAccountsList(): Array<CoinAccountDTO>;
  setAccountsList(value: Array<CoinAccountDTO>): void;
  clearAccountsList(): void;
  addAccounts(value?: CoinAccountDTO, index?: number): CoinAccountDTO;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CoinAccountsDTO.AsObject;
  static toObject(includeInstance: boolean, msg: CoinAccountsDTO): CoinAccountsDTO.AsObject;
  static serializeBinaryToWriter(message: CoinAccountsDTO, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CoinAccountsDTO;
  static deserializeBinaryFromReader(message: CoinAccountsDTO, reader: jspb.BinaryReader): CoinAccountsDTO;
}

export namespace CoinAccountsDTO {
  export type AsObject = {
    accountsList: Array<CoinAccountDTO.AsObject>,
  }
}

export class ListCoinAccountLogsReq extends jspb.Message {
  getAccountId(): number;
  setAccountId(value: number): void;

  getMax(): number;
  setMax(value: number): void;

  getFromId(): number;
  setFromId(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListCoinAccountLogsReq.AsObject;
  static toObject(includeInstance: boolean, msg: ListCoinAccountLogsReq): ListCoinAccountLogsReq.AsObject;
  static serializeBinaryToWriter(message: ListCoinAccountLogsReq, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListCoinAccountLogsReq;
  static deserializeBinaryFromReader(message: ListCoinAccountLogsReq, reader: jspb.BinaryReader): ListCoinAccountLogsReq;
}

export namespace ListCoinAccountLogsReq {
  export type AsObject = {
    accountId: number,
    max: number,
    fromId: number,
  }
}

export class CoinAccountLogDTO extends jspb.Message {
  getId(): number;
  setId(value: number): void;

  getName(): string;
  setName(value: string): void;

  getSym(): string;
  setSym(value: string): void;

  getAmount(): number;
  setAmount(value: number): void;

  getCreatedat(): number;
  setCreatedat(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CoinAccountLogDTO.AsObject;
  static toObject(includeInstance: boolean, msg: CoinAccountLogDTO): CoinAccountLogDTO.AsObject;
  static serializeBinaryToWriter(message: CoinAccountLogDTO, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CoinAccountLogDTO;
  static deserializeBinaryFromReader(message: CoinAccountLogDTO, reader: jspb.BinaryReader): CoinAccountLogDTO;
}

export namespace CoinAccountLogDTO {
  export type AsObject = {
    id: number,
    name: string,
    sym: string,
    amount: number,
    createdat: number,
  }
}

export class CoinAccountLogsDTO extends jspb.Message {
  getLogsList(): Array<CoinAccountLogDTO>;
  setLogsList(value: Array<CoinAccountLogDTO>): void;
  clearLogsList(): void;
  addLogs(value?: CoinAccountLogDTO, index?: number): CoinAccountLogDTO;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CoinAccountLogsDTO.AsObject;
  static toObject(includeInstance: boolean, msg: CoinAccountLogsDTO): CoinAccountLogsDTO.AsObject;
  static serializeBinaryToWriter(message: CoinAccountLogsDTO, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CoinAccountLogsDTO;
  static deserializeBinaryFromReader(message: CoinAccountLogsDTO, reader: jspb.BinaryReader): CoinAccountLogsDTO;
}

export namespace CoinAccountLogsDTO {
  export type AsObject = {
    logsList: Array<CoinAccountLogDTO.AsObject>,
  }
}

