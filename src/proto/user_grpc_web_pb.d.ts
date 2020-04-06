import * as grpcWeb from 'grpc-web';

import * as base_pb from './base_pb';

import {
  AddCoinAccountReq,
  AddGroupReq,
  CoinAccountDTO,
  CoinAccountsDTO,
  GetUserKvReq,
  GroupDTO,
  GroupsDTO,
  ListCoinAccountsReq,
  ListGroupsReq,
  LoginReq,
  LoginRes,
  SwitchOrderReq,
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

}

