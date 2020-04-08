import * as grpcWeb from 'grpc-web';

import * as base_pb from './base_pb';

import {
  AddCoinAccountReq,
  AddGroupReq,
  AddTradeReq,
  CoinAccountDTO,
  CoinAccountLogsDTO,
  CoinAccountsDTO,
  GetUserKvReq,
  GroupDTO,
  GroupsDTO,
  ImportGroupsReq,
  ListCoinAccountLogsReq,
  ListCoinAccountsReq,
  ListGroupsReq,
  LoginReq,
  LoginRes,
  SwitchOrderReq,
  TradeDTO,
  TradesDTO,
  UserKvDTO} from './user_pb';

export class UserServiceClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: string; });

  register(
    request: LoginReq,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: LoginRes) => void
  ): grpcWeb.ClientReadableStream<LoginRes>;

  login(
    request: LoginReq,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: LoginRes) => void
  ): grpcWeb.ClientReadableStream<LoginRes>;

  saveUserKv(
    request: UserKvDTO,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: base_pb.Empty) => void
  ): grpcWeb.ClientReadableStream<base_pb.Empty>;

  getUserKv(
    request: GetUserKvReq,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: UserKvDTO) => void
  ): grpcWeb.ClientReadableStream<UserKvDTO>;

  addGroup(
    request: AddGroupReq,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: base_pb.Empty) => void
  ): grpcWeb.ClientReadableStream<base_pb.Empty>;

  updateGroup(
    request: GroupDTO,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: base_pb.Empty) => void
  ): grpcWeb.ClientReadableStream<base_pb.Empty>;

  deleteGroup(
    request: base_pb.IdWrapper,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: base_pb.Empty) => void
  ): grpcWeb.ClientReadableStream<base_pb.Empty>;

  listGroups(
    request: ListGroupsReq,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: GroupsDTO) => void
  ): grpcWeb.ClientReadableStream<GroupsDTO>;

  switchGroup(
    request: SwitchOrderReq,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: base_pb.Empty) => void
  ): grpcWeb.ClientReadableStream<base_pb.Empty>;

  importCoinGroups(
    request: ImportGroupsReq,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: base_pb.Empty) => void
  ): grpcWeb.ClientReadableStream<base_pb.Empty>;

  addCoinAccount(
    request: AddCoinAccountReq,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: base_pb.Empty) => void
  ): grpcWeb.ClientReadableStream<base_pb.Empty>;

  updateCoinAccount(
    request: CoinAccountDTO,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: base_pb.Empty) => void
  ): grpcWeb.ClientReadableStream<base_pb.Empty>;

  deleteCoinAccount(
    request: base_pb.IdWrapper,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: base_pb.Empty) => void
  ): grpcWeb.ClientReadableStream<base_pb.Empty>;

  listCoinAccounts(
    request: ListCoinAccountsReq,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: CoinAccountsDTO) => void
  ): grpcWeb.ClientReadableStream<CoinAccountsDTO>;

  switchCoinAccount(
    request: SwitchOrderReq,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: base_pb.Empty) => void
  ): grpcWeb.ClientReadableStream<base_pb.Empty>;

  listCoinAccountLogs(
    request: ListCoinAccountLogsReq,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: CoinAccountLogsDTO) => void
  ): grpcWeb.ClientReadableStream<CoinAccountLogsDTO>;

  deleteCoinAccountLog(
    request: base_pb.IdWrapper,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: base_pb.Empty) => void
  ): grpcWeb.ClientReadableStream<base_pb.Empty>;

  importTradeGroups(
    request: ImportGroupsReq,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: base_pb.Empty) => void
  ): grpcWeb.ClientReadableStream<base_pb.Empty>;

  addTrade(
    request: AddTradeReq,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: base_pb.Empty) => void
  ): grpcWeb.ClientReadableStream<base_pb.Empty>;

  updateTrade(
    request: TradeDTO,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: base_pb.Empty) => void
  ): grpcWeb.ClientReadableStream<base_pb.Empty>;

  listTrades(
    request: base_pb.IdWrapper,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: TradesDTO) => void
  ): grpcWeb.ClientReadableStream<TradesDTO>;

  deleteTrade(
    request: base_pb.IdWrapper,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: base_pb.Empty) => void
  ): grpcWeb.ClientReadableStream<base_pb.Empty>;

  switchTrade(
    request: SwitchOrderReq,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: base_pb.Empty) => void
  ): grpcWeb.ClientReadableStream<base_pb.Empty>;

}

export class UserServicePromiseClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: string; });

  register(
    request: LoginReq,
    metadata?: grpcWeb.Metadata
  ): Promise<LoginRes>;

  login(
    request: LoginReq,
    metadata?: grpcWeb.Metadata
  ): Promise<LoginRes>;

  saveUserKv(
    request: UserKvDTO,
    metadata?: grpcWeb.Metadata
  ): Promise<base_pb.Empty>;

  getUserKv(
    request: GetUserKvReq,
    metadata?: grpcWeb.Metadata
  ): Promise<UserKvDTO>;

  addGroup(
    request: AddGroupReq,
    metadata?: grpcWeb.Metadata
  ): Promise<base_pb.Empty>;

  updateGroup(
    request: GroupDTO,
    metadata?: grpcWeb.Metadata
  ): Promise<base_pb.Empty>;

  deleteGroup(
    request: base_pb.IdWrapper,
    metadata?: grpcWeb.Metadata
  ): Promise<base_pb.Empty>;

  listGroups(
    request: ListGroupsReq,
    metadata?: grpcWeb.Metadata
  ): Promise<GroupsDTO>;

  switchGroup(
    request: SwitchOrderReq,
    metadata?: grpcWeb.Metadata
  ): Promise<base_pb.Empty>;

  importCoinGroups(
    request: ImportGroupsReq,
    metadata?: grpcWeb.Metadata
  ): Promise<base_pb.Empty>;

  addCoinAccount(
    request: AddCoinAccountReq,
    metadata?: grpcWeb.Metadata
  ): Promise<base_pb.Empty>;

  updateCoinAccount(
    request: CoinAccountDTO,
    metadata?: grpcWeb.Metadata
  ): Promise<base_pb.Empty>;

  deleteCoinAccount(
    request: base_pb.IdWrapper,
    metadata?: grpcWeb.Metadata
  ): Promise<base_pb.Empty>;

  listCoinAccounts(
    request: ListCoinAccountsReq,
    metadata?: grpcWeb.Metadata
  ): Promise<CoinAccountsDTO>;

  switchCoinAccount(
    request: SwitchOrderReq,
    metadata?: grpcWeb.Metadata
  ): Promise<base_pb.Empty>;

  listCoinAccountLogs(
    request: ListCoinAccountLogsReq,
    metadata?: grpcWeb.Metadata
  ): Promise<CoinAccountLogsDTO>;

  deleteCoinAccountLog(
    request: base_pb.IdWrapper,
    metadata?: grpcWeb.Metadata
  ): Promise<base_pb.Empty>;

  importTradeGroups(
    request: ImportGroupsReq,
    metadata?: grpcWeb.Metadata
  ): Promise<base_pb.Empty>;

  addTrade(
    request: AddTradeReq,
    metadata?: grpcWeb.Metadata
  ): Promise<base_pb.Empty>;

  updateTrade(
    request: TradeDTO,
    metadata?: grpcWeb.Metadata
  ): Promise<base_pb.Empty>;

  listTrades(
    request: base_pb.IdWrapper,
    metadata?: grpcWeb.Metadata
  ): Promise<TradesDTO>;

  deleteTrade(
    request: base_pb.IdWrapper,
    metadata?: grpcWeb.Metadata
  ): Promise<base_pb.Empty>;

  switchTrade(
    request: SwitchOrderReq,
    metadata?: grpcWeb.Metadata
  ): Promise<base_pb.Empty>;

}

