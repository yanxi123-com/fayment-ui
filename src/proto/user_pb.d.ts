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

  getGroupType(): number;
  setGroupType(value: number): void;

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
    groupType: number,
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

export class ImportGroupsReq extends jspb.Message {
  getGroups(): string;
  setGroups(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ImportGroupsReq.AsObject;
  static toObject(includeInstance: boolean, msg: ImportGroupsReq): ImportGroupsReq.AsObject;
  static serializeBinaryToWriter(message: ImportGroupsReq, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ImportGroupsReq;
  static deserializeBinaryFromReader(message: ImportGroupsReq, reader: jspb.BinaryReader): ImportGroupsReq;
}

export namespace ImportGroupsReq {
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

export class ListAccountLogsReq extends jspb.Message {
  getAccountId(): number;
  setAccountId(value: number): void;

  getMax(): number;
  setMax(value: number): void;

  getFromId(): number;
  setFromId(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListAccountLogsReq.AsObject;
  static toObject(includeInstance: boolean, msg: ListAccountLogsReq): ListAccountLogsReq.AsObject;
  static serializeBinaryToWriter(message: ListAccountLogsReq, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListAccountLogsReq;
  static deserializeBinaryFromReader(message: ListAccountLogsReq, reader: jspb.BinaryReader): ListAccountLogsReq;
}

export namespace ListAccountLogsReq {
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

  getCreatedAt(): number;
  setCreatedAt(value: number): void;

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
    createdAt: number,
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

export class AddStockAccountReq extends jspb.Message {
  getGroupId(): number;
  setGroupId(value: number): void;

  getSite(): string;
  setSite(value: string): void;

  getSym(): string;
  setSym(value: string): void;

  getName(): string;
  setName(value: string): void;

  getAmount(): number;
  setAmount(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AddStockAccountReq.AsObject;
  static toObject(includeInstance: boolean, msg: AddStockAccountReq): AddStockAccountReq.AsObject;
  static serializeBinaryToWriter(message: AddStockAccountReq, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AddStockAccountReq;
  static deserializeBinaryFromReader(message: AddStockAccountReq, reader: jspb.BinaryReader): AddStockAccountReq;
}

export namespace AddStockAccountReq {
  export type AsObject = {
    groupId: number,
    site: string,
    sym: string,
    name: string,
    amount: number,
  }
}

export class StockAccountDTO extends jspb.Message {
  getId(): number;
  setId(value: number): void;

  getSite(): string;
  setSite(value: string): void;

  getSym(): string;
  setSym(value: string): void;

  getName(): string;
  setName(value: string): void;

  getAmount(): number;
  setAmount(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): StockAccountDTO.AsObject;
  static toObject(includeInstance: boolean, msg: StockAccountDTO): StockAccountDTO.AsObject;
  static serializeBinaryToWriter(message: StockAccountDTO, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): StockAccountDTO;
  static deserializeBinaryFromReader(message: StockAccountDTO, reader: jspb.BinaryReader): StockAccountDTO;
}

export namespace StockAccountDTO {
  export type AsObject = {
    id: number,
    site: string,
    sym: string,
    name: string,
    amount: number,
  }
}

export class StockAccountsDTO extends jspb.Message {
  getAccountsList(): Array<StockAccountDTO>;
  setAccountsList(value: Array<StockAccountDTO>): void;
  clearAccountsList(): void;
  addAccounts(value?: StockAccountDTO, index?: number): StockAccountDTO;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): StockAccountsDTO.AsObject;
  static toObject(includeInstance: boolean, msg: StockAccountsDTO): StockAccountsDTO.AsObject;
  static serializeBinaryToWriter(message: StockAccountsDTO, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): StockAccountsDTO;
  static deserializeBinaryFromReader(message: StockAccountsDTO, reader: jspb.BinaryReader): StockAccountsDTO;
}

export namespace StockAccountsDTO {
  export type AsObject = {
    accountsList: Array<StockAccountDTO.AsObject>,
  }
}

export class AddTradeReq extends jspb.Message {
  getGroupId(): number;
  setGroupId(value: number): void;

  getTradedAt(): number;
  setTradedAt(value: number): void;

  getBuySym(): string;
  setBuySym(value: string): void;

  getBuyAmount(): number;
  setBuyAmount(value: number): void;

  getSellSym(): string;
  setSellSym(value: string): void;

  getSellAmount(): number;
  setSellAmount(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AddTradeReq.AsObject;
  static toObject(includeInstance: boolean, msg: AddTradeReq): AddTradeReq.AsObject;
  static serializeBinaryToWriter(message: AddTradeReq, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AddTradeReq;
  static deserializeBinaryFromReader(message: AddTradeReq, reader: jspb.BinaryReader): AddTradeReq;
}

export namespace AddTradeReq {
  export type AsObject = {
    groupId: number,
    tradedAt: number,
    buySym: string,
    buyAmount: number,
    sellSym: string,
    sellAmount: number,
  }
}

export class TradeDTO extends jspb.Message {
  getId(): number;
  setId(value: number): void;

  getTradedAt(): number;
  setTradedAt(value: number): void;

  getBuySym(): string;
  setBuySym(value: string): void;

  getBuyAmount(): number;
  setBuyAmount(value: number): void;

  getSellSym(): string;
  setSellSym(value: string): void;

  getSellAmount(): number;
  setSellAmount(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TradeDTO.AsObject;
  static toObject(includeInstance: boolean, msg: TradeDTO): TradeDTO.AsObject;
  static serializeBinaryToWriter(message: TradeDTO, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TradeDTO;
  static deserializeBinaryFromReader(message: TradeDTO, reader: jspb.BinaryReader): TradeDTO;
}

export namespace TradeDTO {
  export type AsObject = {
    id: number,
    tradedAt: number,
    buySym: string,
    buyAmount: number,
    sellSym: string,
    sellAmount: number,
  }
}

export class TradesDTO extends jspb.Message {
  getTradesList(): Array<TradeDTO>;
  setTradesList(value: Array<TradeDTO>): void;
  clearTradesList(): void;
  addTrades(value?: TradeDTO, index?: number): TradeDTO;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TradesDTO.AsObject;
  static toObject(includeInstance: boolean, msg: TradesDTO): TradesDTO.AsObject;
  static serializeBinaryToWriter(message: TradesDTO, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TradesDTO;
  static deserializeBinaryFromReader(message: TradesDTO, reader: jspb.BinaryReader): TradesDTO;
}

export namespace TradesDTO {
  export type AsObject = {
    tradesList: Array<TradeDTO.AsObject>,
  }
}

export class AddStockTradeReq extends jspb.Message {
  getGroupId(): number;
  setGroupId(value: number): void;

  getTradedAt(): number;
  setTradedAt(value: number): void;

  getStockSym(): string;
  setStockSym(value: string): void;

  getStockName(): string;
  setStockName(value: string): void;

  getStockNum(): number;
  setStockNum(value: number): void;

  getDirection(): string;
  setDirection(value: string): void;

  getAmount(): number;
  setAmount(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AddStockTradeReq.AsObject;
  static toObject(includeInstance: boolean, msg: AddStockTradeReq): AddStockTradeReq.AsObject;
  static serializeBinaryToWriter(message: AddStockTradeReq, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AddStockTradeReq;
  static deserializeBinaryFromReader(message: AddStockTradeReq, reader: jspb.BinaryReader): AddStockTradeReq;
}

export namespace AddStockTradeReq {
  export type AsObject = {
    groupId: number,
    tradedAt: number,
    stockSym: string,
    stockName: string,
    stockNum: number,
    direction: string,
    amount: number,
  }
}

export class StockTradeDTO extends jspb.Message {
  getId(): number;
  setId(value: number): void;

  getTradedAt(): number;
  setTradedAt(value: number): void;

  getStockSite(): string;
  setStockSite(value: string): void;

  getStockSym(): string;
  setStockSym(value: string): void;

  getStockName(): string;
  setStockName(value: string): void;

  getStockNum(): number;
  setStockNum(value: number): void;

  getDirection(): string;
  setDirection(value: string): void;

  getAmount(): number;
  setAmount(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): StockTradeDTO.AsObject;
  static toObject(includeInstance: boolean, msg: StockTradeDTO): StockTradeDTO.AsObject;
  static serializeBinaryToWriter(message: StockTradeDTO, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): StockTradeDTO;
  static deserializeBinaryFromReader(message: StockTradeDTO, reader: jspb.BinaryReader): StockTradeDTO;
}

export namespace StockTradeDTO {
  export type AsObject = {
    id: number,
    tradedAt: number,
    stockSite: string,
    stockSym: string,
    stockName: string,
    stockNum: number,
    direction: string,
    amount: number,
  }
}

export class StockTradesDTO extends jspb.Message {
  getTradesList(): Array<StockTradeDTO>;
  setTradesList(value: Array<StockTradeDTO>): void;
  clearTradesList(): void;
  addTrades(value?: StockTradeDTO, index?: number): StockTradeDTO;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): StockTradesDTO.AsObject;
  static toObject(includeInstance: boolean, msg: StockTradesDTO): StockTradesDTO.AsObject;
  static serializeBinaryToWriter(message: StockTradesDTO, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): StockTradesDTO;
  static deserializeBinaryFromReader(message: StockTradesDTO, reader: jspb.BinaryReader): StockTradesDTO;
}

export namespace StockTradesDTO {
  export type AsObject = {
    tradesList: Array<StockTradeDTO.AsObject>,
  }
}

