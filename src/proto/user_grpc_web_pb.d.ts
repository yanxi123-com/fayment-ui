import * as grpcWeb from 'grpc-web';

import * as base_pb from './base_pb';

import {
  AddGroupReq,
  GetUserKvReq,
  GroupsDTO,
  ListGroupsReq,
  LoginReq,
  LoginRes,
  SwitchGroupReq,
  UpdateGroupReq,
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
    request: UpdateGroupReq,
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
    request: SwitchGroupReq,
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
    request: UpdateGroupReq,
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
    request: SwitchGroupReq,
    metadata?: grpcWeb.Metadata
  ): Promise<base_pb.Empty>;

}

