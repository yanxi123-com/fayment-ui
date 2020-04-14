import * as grpcWeb from 'grpc-web';

import * as base_pb from './base_pb';

import {
  AddCoinAccountReq,
  AddFuturesTradeReq,
  AddGroupReq,
  AddStockAccountReq,
  AddStockTradeReq,
  AddTradeReq,
  ChangeGroupReq,
  CoinAccountDTO,
  CoinAccountLogsDTO,
  CoinAccountsDTO,
  FuturesTradesDTO,
  GetUserKvReq,
  GroupDTO,
  GroupsDTO,
  ImportGroupsReq,
  ListAccountLogsReq,
  ListGroupsReq,
  LoginReq,
  LoginRes,
  StockAccountDTO,
  StockAccountLogsDTO,
  StockAccountsDTO,
  StockTradeDTO,
  StockTradesDTO,
  SwitchOrderReq,
  TradeDTO,
  TradesDTO,
  UpdateFuturesTradeReq,
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
    request: base_pb.IdWrapper,
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
    request: ListAccountLogsReq,
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

  addStockAccount(
    request: AddStockAccountReq,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: base_pb.Empty) => void
  ): grpcWeb.ClientReadableStream<base_pb.Empty>;

  updateStockAccount(
    request: StockAccountDTO,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: base_pb.Empty) => void
  ): grpcWeb.ClientReadableStream<base_pb.Empty>;

  deleteStockAccount(
    request: base_pb.IdWrapper,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: base_pb.Empty) => void
  ): grpcWeb.ClientReadableStream<base_pb.Empty>;

  listStockAccounts(
    request: base_pb.IdWrapper,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: StockAccountsDTO) => void
  ): grpcWeb.ClientReadableStream<StockAccountsDTO>;

  switchStockAccount(
    request: SwitchOrderReq,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: base_pb.Empty) => void
  ): grpcWeb.ClientReadableStream<base_pb.Empty>;

  listStockAccountLogs(
    request: ListAccountLogsReq,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: StockAccountLogsDTO) => void
  ): grpcWeb.ClientReadableStream<StockAccountLogsDTO>;

  deleteStockAccountLog(
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

  changeTradeGroup(
    request: ChangeGroupReq,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: base_pb.Empty) => void
  ): grpcWeb.ClientReadableStream<base_pb.Empty>;

  addStockTrade(
    request: AddStockTradeReq,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: base_pb.Empty) => void
  ): grpcWeb.ClientReadableStream<base_pb.Empty>;

  updateStockTrade(
    request: StockTradeDTO,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: base_pb.Empty) => void
  ): grpcWeb.ClientReadableStream<base_pb.Empty>;

  listStockTrades(
    request: base_pb.IdWrapper,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: StockTradesDTO) => void
  ): grpcWeb.ClientReadableStream<StockTradesDTO>;

  deleteStockTrade(
    request: base_pb.IdWrapper,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: base_pb.Empty) => void
  ): grpcWeb.ClientReadableStream<base_pb.Empty>;

  switchStockTrade(
    request: SwitchOrderReq,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: base_pb.Empty) => void
  ): grpcWeb.ClientReadableStream<base_pb.Empty>;

  changeStockTradeGroup(
    request: ChangeGroupReq,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: base_pb.Empty) => void
  ): grpcWeb.ClientReadableStream<base_pb.Empty>;

  addFuturesTrade(
    request: AddFuturesTradeReq,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: base_pb.Empty) => void
  ): grpcWeb.ClientReadableStream<base_pb.Empty>;

  updateFuturesTrade(
    request: UpdateFuturesTradeReq,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: base_pb.Empty) => void
  ): grpcWeb.ClientReadableStream<base_pb.Empty>;

  listFuturesTrades(
    request: base_pb.IdWrapper,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: FuturesTradesDTO) => void
  ): grpcWeb.ClientReadableStream<FuturesTradesDTO>;

  deleteFuturesTrade(
    request: base_pb.IdWrapper,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: base_pb.Empty) => void
  ): grpcWeb.ClientReadableStream<base_pb.Empty>;

  switchFuturesTrade(
    request: SwitchOrderReq,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: base_pb.Empty) => void
  ): grpcWeb.ClientReadableStream<base_pb.Empty>;

  changeFuturesTradeGroup(
    request: ChangeGroupReq,
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
    request: base_pb.IdWrapper,
    metadata?: grpcWeb.Metadata
  ): Promise<CoinAccountsDTO>;

  switchCoinAccount(
    request: SwitchOrderReq,
    metadata?: grpcWeb.Metadata
  ): Promise<base_pb.Empty>;

  listCoinAccountLogs(
    request: ListAccountLogsReq,
    metadata?: grpcWeb.Metadata
  ): Promise<CoinAccountLogsDTO>;

  deleteCoinAccountLog(
    request: base_pb.IdWrapper,
    metadata?: grpcWeb.Metadata
  ): Promise<base_pb.Empty>;

  addStockAccount(
    request: AddStockAccountReq,
    metadata?: grpcWeb.Metadata
  ): Promise<base_pb.Empty>;

  updateStockAccount(
    request: StockAccountDTO,
    metadata?: grpcWeb.Metadata
  ): Promise<base_pb.Empty>;

  deleteStockAccount(
    request: base_pb.IdWrapper,
    metadata?: grpcWeb.Metadata
  ): Promise<base_pb.Empty>;

  listStockAccounts(
    request: base_pb.IdWrapper,
    metadata?: grpcWeb.Metadata
  ): Promise<StockAccountsDTO>;

  switchStockAccount(
    request: SwitchOrderReq,
    metadata?: grpcWeb.Metadata
  ): Promise<base_pb.Empty>;

  listStockAccountLogs(
    request: ListAccountLogsReq,
    metadata?: grpcWeb.Metadata
  ): Promise<StockAccountLogsDTO>;

  deleteStockAccountLog(
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

  changeTradeGroup(
    request: ChangeGroupReq,
    metadata?: grpcWeb.Metadata
  ): Promise<base_pb.Empty>;

  addStockTrade(
    request: AddStockTradeReq,
    metadata?: grpcWeb.Metadata
  ): Promise<base_pb.Empty>;

  updateStockTrade(
    request: StockTradeDTO,
    metadata?: grpcWeb.Metadata
  ): Promise<base_pb.Empty>;

  listStockTrades(
    request: base_pb.IdWrapper,
    metadata?: grpcWeb.Metadata
  ): Promise<StockTradesDTO>;

  deleteStockTrade(
    request: base_pb.IdWrapper,
    metadata?: grpcWeb.Metadata
  ): Promise<base_pb.Empty>;

  switchStockTrade(
    request: SwitchOrderReq,
    metadata?: grpcWeb.Metadata
  ): Promise<base_pb.Empty>;

  changeStockTradeGroup(
    request: ChangeGroupReq,
    metadata?: grpcWeb.Metadata
  ): Promise<base_pb.Empty>;

  addFuturesTrade(
    request: AddFuturesTradeReq,
    metadata?: grpcWeb.Metadata
  ): Promise<base_pb.Empty>;

  updateFuturesTrade(
    request: UpdateFuturesTradeReq,
    metadata?: grpcWeb.Metadata
  ): Promise<base_pb.Empty>;

  listFuturesTrades(
    request: base_pb.IdWrapper,
    metadata?: grpcWeb.Metadata
  ): Promise<FuturesTradesDTO>;

  deleteFuturesTrade(
    request: base_pb.IdWrapper,
    metadata?: grpcWeb.Metadata
  ): Promise<base_pb.Empty>;

  switchFuturesTrade(
    request: SwitchOrderReq,
    metadata?: grpcWeb.Metadata
  ): Promise<base_pb.Empty>;

  changeFuturesTradeGroup(
    request: ChangeGroupReq,
    metadata?: grpcWeb.Metadata
  ): Promise<base_pb.Empty>;

}

