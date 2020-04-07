/* eslint-disable */ /**
 * @fileoverview gRPC-Web generated client stub for fayment
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!



const grpc = {};
grpc.web = require('grpc-web');


var base_pb = require('./base_pb.js')
const proto = {};
proto.fayment = require('./user_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.fayment.UserServiceClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.fayment.UserServicePromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.fayment.LoginReq,
 *   !proto.fayment.LoginRes>}
 */
const methodDescriptor_UserService_Register = new grpc.web.MethodDescriptor(
  '/fayment.UserService/Register',
  grpc.web.MethodType.UNARY,
  proto.fayment.LoginReq,
  proto.fayment.LoginRes,
  /**
   * @param {!proto.fayment.LoginReq} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.fayment.LoginRes.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.fayment.LoginReq,
 *   !proto.fayment.LoginRes>}
 */
const methodInfo_UserService_Register = new grpc.web.AbstractClientBase.MethodInfo(
  proto.fayment.LoginRes,
  /**
   * @param {!proto.fayment.LoginReq} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.fayment.LoginRes.deserializeBinary
);


/**
 * @param {!proto.fayment.LoginReq} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.fayment.LoginRes)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.fayment.LoginRes>|undefined}
 *     The XHR Node Readable Stream
 */
proto.fayment.UserServiceClient.prototype.register =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/fayment.UserService/Register',
      request,
      metadata || {},
      methodDescriptor_UserService_Register,
      callback);
};


/**
 * @param {!proto.fayment.LoginReq} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.fayment.LoginRes>}
 *     A native promise that resolves to the response
 */
proto.fayment.UserServicePromiseClient.prototype.register =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/fayment.UserService/Register',
      request,
      metadata || {},
      methodDescriptor_UserService_Register);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.fayment.LoginReq,
 *   !proto.fayment.LoginRes>}
 */
const methodDescriptor_UserService_Login = new grpc.web.MethodDescriptor(
  '/fayment.UserService/Login',
  grpc.web.MethodType.UNARY,
  proto.fayment.LoginReq,
  proto.fayment.LoginRes,
  /**
   * @param {!proto.fayment.LoginReq} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.fayment.LoginRes.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.fayment.LoginReq,
 *   !proto.fayment.LoginRes>}
 */
const methodInfo_UserService_Login = new grpc.web.AbstractClientBase.MethodInfo(
  proto.fayment.LoginRes,
  /**
   * @param {!proto.fayment.LoginReq} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.fayment.LoginRes.deserializeBinary
);


/**
 * @param {!proto.fayment.LoginReq} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.fayment.LoginRes)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.fayment.LoginRes>|undefined}
 *     The XHR Node Readable Stream
 */
proto.fayment.UserServiceClient.prototype.login =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/fayment.UserService/Login',
      request,
      metadata || {},
      methodDescriptor_UserService_Login,
      callback);
};


/**
 * @param {!proto.fayment.LoginReq} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.fayment.LoginRes>}
 *     A native promise that resolves to the response
 */
proto.fayment.UserServicePromiseClient.prototype.login =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/fayment.UserService/Login',
      request,
      metadata || {},
      methodDescriptor_UserService_Login);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.fayment.UserKvDTO,
 *   !proto.fayment.Empty>}
 */
const methodDescriptor_UserService_SaveUserKv = new grpc.web.MethodDescriptor(
  '/fayment.UserService/SaveUserKv',
  grpc.web.MethodType.UNARY,
  proto.fayment.UserKvDTO,
  base_pb.Empty,
  /**
   * @param {!proto.fayment.UserKvDTO} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  base_pb.Empty.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.fayment.UserKvDTO,
 *   !proto.fayment.Empty>}
 */
const methodInfo_UserService_SaveUserKv = new grpc.web.AbstractClientBase.MethodInfo(
  base_pb.Empty,
  /**
   * @param {!proto.fayment.UserKvDTO} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  base_pb.Empty.deserializeBinary
);


/**
 * @param {!proto.fayment.UserKvDTO} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.fayment.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.fayment.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.fayment.UserServiceClient.prototype.saveUserKv =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/fayment.UserService/SaveUserKv',
      request,
      metadata || {},
      methodDescriptor_UserService_SaveUserKv,
      callback);
};


/**
 * @param {!proto.fayment.UserKvDTO} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.fayment.Empty>}
 *     A native promise that resolves to the response
 */
proto.fayment.UserServicePromiseClient.prototype.saveUserKv =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/fayment.UserService/SaveUserKv',
      request,
      metadata || {},
      methodDescriptor_UserService_SaveUserKv);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.fayment.GetUserKvReq,
 *   !proto.fayment.UserKvDTO>}
 */
const methodDescriptor_UserService_GetUserKv = new grpc.web.MethodDescriptor(
  '/fayment.UserService/GetUserKv',
  grpc.web.MethodType.UNARY,
  proto.fayment.GetUserKvReq,
  proto.fayment.UserKvDTO,
  /**
   * @param {!proto.fayment.GetUserKvReq} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.fayment.UserKvDTO.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.fayment.GetUserKvReq,
 *   !proto.fayment.UserKvDTO>}
 */
const methodInfo_UserService_GetUserKv = new grpc.web.AbstractClientBase.MethodInfo(
  proto.fayment.UserKvDTO,
  /**
   * @param {!proto.fayment.GetUserKvReq} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.fayment.UserKvDTO.deserializeBinary
);


/**
 * @param {!proto.fayment.GetUserKvReq} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.fayment.UserKvDTO)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.fayment.UserKvDTO>|undefined}
 *     The XHR Node Readable Stream
 */
proto.fayment.UserServiceClient.prototype.getUserKv =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/fayment.UserService/GetUserKv',
      request,
      metadata || {},
      methodDescriptor_UserService_GetUserKv,
      callback);
};


/**
 * @param {!proto.fayment.GetUserKvReq} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.fayment.UserKvDTO>}
 *     A native promise that resolves to the response
 */
proto.fayment.UserServicePromiseClient.prototype.getUserKv =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/fayment.UserService/GetUserKv',
      request,
      metadata || {},
      methodDescriptor_UserService_GetUserKv);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.fayment.AddGroupReq,
 *   !proto.fayment.Empty>}
 */
const methodDescriptor_UserService_AddGroup = new grpc.web.MethodDescriptor(
  '/fayment.UserService/AddGroup',
  grpc.web.MethodType.UNARY,
  proto.fayment.AddGroupReq,
  base_pb.Empty,
  /**
   * @param {!proto.fayment.AddGroupReq} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  base_pb.Empty.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.fayment.AddGroupReq,
 *   !proto.fayment.Empty>}
 */
const methodInfo_UserService_AddGroup = new grpc.web.AbstractClientBase.MethodInfo(
  base_pb.Empty,
  /**
   * @param {!proto.fayment.AddGroupReq} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  base_pb.Empty.deserializeBinary
);


/**
 * @param {!proto.fayment.AddGroupReq} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.fayment.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.fayment.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.fayment.UserServiceClient.prototype.addGroup =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/fayment.UserService/AddGroup',
      request,
      metadata || {},
      methodDescriptor_UserService_AddGroup,
      callback);
};


/**
 * @param {!proto.fayment.AddGroupReq} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.fayment.Empty>}
 *     A native promise that resolves to the response
 */
proto.fayment.UserServicePromiseClient.prototype.addGroup =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/fayment.UserService/AddGroup',
      request,
      metadata || {},
      methodDescriptor_UserService_AddGroup);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.fayment.GroupDTO,
 *   !proto.fayment.Empty>}
 */
const methodDescriptor_UserService_UpdateGroup = new grpc.web.MethodDescriptor(
  '/fayment.UserService/UpdateGroup',
  grpc.web.MethodType.UNARY,
  proto.fayment.GroupDTO,
  base_pb.Empty,
  /**
   * @param {!proto.fayment.GroupDTO} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  base_pb.Empty.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.fayment.GroupDTO,
 *   !proto.fayment.Empty>}
 */
const methodInfo_UserService_UpdateGroup = new grpc.web.AbstractClientBase.MethodInfo(
  base_pb.Empty,
  /**
   * @param {!proto.fayment.GroupDTO} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  base_pb.Empty.deserializeBinary
);


/**
 * @param {!proto.fayment.GroupDTO} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.fayment.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.fayment.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.fayment.UserServiceClient.prototype.updateGroup =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/fayment.UserService/UpdateGroup',
      request,
      metadata || {},
      methodDescriptor_UserService_UpdateGroup,
      callback);
};


/**
 * @param {!proto.fayment.GroupDTO} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.fayment.Empty>}
 *     A native promise that resolves to the response
 */
proto.fayment.UserServicePromiseClient.prototype.updateGroup =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/fayment.UserService/UpdateGroup',
      request,
      metadata || {},
      methodDescriptor_UserService_UpdateGroup);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.fayment.IdWrapper,
 *   !proto.fayment.Empty>}
 */
const methodDescriptor_UserService_DeleteGroup = new grpc.web.MethodDescriptor(
  '/fayment.UserService/DeleteGroup',
  grpc.web.MethodType.UNARY,
  base_pb.IdWrapper,
  base_pb.Empty,
  /**
   * @param {!proto.fayment.IdWrapper} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  base_pb.Empty.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.fayment.IdWrapper,
 *   !proto.fayment.Empty>}
 */
const methodInfo_UserService_DeleteGroup = new grpc.web.AbstractClientBase.MethodInfo(
  base_pb.Empty,
  /**
   * @param {!proto.fayment.IdWrapper} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  base_pb.Empty.deserializeBinary
);


/**
 * @param {!proto.fayment.IdWrapper} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.fayment.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.fayment.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.fayment.UserServiceClient.prototype.deleteGroup =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/fayment.UserService/DeleteGroup',
      request,
      metadata || {},
      methodDescriptor_UserService_DeleteGroup,
      callback);
};


/**
 * @param {!proto.fayment.IdWrapper} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.fayment.Empty>}
 *     A native promise that resolves to the response
 */
proto.fayment.UserServicePromiseClient.prototype.deleteGroup =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/fayment.UserService/DeleteGroup',
      request,
      metadata || {},
      methodDescriptor_UserService_DeleteGroup);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.fayment.ListGroupsReq,
 *   !proto.fayment.GroupsDTO>}
 */
const methodDescriptor_UserService_ListGroups = new grpc.web.MethodDescriptor(
  '/fayment.UserService/ListGroups',
  grpc.web.MethodType.UNARY,
  proto.fayment.ListGroupsReq,
  proto.fayment.GroupsDTO,
  /**
   * @param {!proto.fayment.ListGroupsReq} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.fayment.GroupsDTO.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.fayment.ListGroupsReq,
 *   !proto.fayment.GroupsDTO>}
 */
const methodInfo_UserService_ListGroups = new grpc.web.AbstractClientBase.MethodInfo(
  proto.fayment.GroupsDTO,
  /**
   * @param {!proto.fayment.ListGroupsReq} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.fayment.GroupsDTO.deserializeBinary
);


/**
 * @param {!proto.fayment.ListGroupsReq} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.fayment.GroupsDTO)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.fayment.GroupsDTO>|undefined}
 *     The XHR Node Readable Stream
 */
proto.fayment.UserServiceClient.prototype.listGroups =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/fayment.UserService/ListGroups',
      request,
      metadata || {},
      methodDescriptor_UserService_ListGroups,
      callback);
};


/**
 * @param {!proto.fayment.ListGroupsReq} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.fayment.GroupsDTO>}
 *     A native promise that resolves to the response
 */
proto.fayment.UserServicePromiseClient.prototype.listGroups =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/fayment.UserService/ListGroups',
      request,
      metadata || {},
      methodDescriptor_UserService_ListGroups);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.fayment.SwitchOrderReq,
 *   !proto.fayment.Empty>}
 */
const methodDescriptor_UserService_SwitchGroup = new grpc.web.MethodDescriptor(
  '/fayment.UserService/SwitchGroup',
  grpc.web.MethodType.UNARY,
  proto.fayment.SwitchOrderReq,
  base_pb.Empty,
  /**
   * @param {!proto.fayment.SwitchOrderReq} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  base_pb.Empty.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.fayment.SwitchOrderReq,
 *   !proto.fayment.Empty>}
 */
const methodInfo_UserService_SwitchGroup = new grpc.web.AbstractClientBase.MethodInfo(
  base_pb.Empty,
  /**
   * @param {!proto.fayment.SwitchOrderReq} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  base_pb.Empty.deserializeBinary
);


/**
 * @param {!proto.fayment.SwitchOrderReq} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.fayment.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.fayment.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.fayment.UserServiceClient.prototype.switchGroup =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/fayment.UserService/SwitchGroup',
      request,
      metadata || {},
      methodDescriptor_UserService_SwitchGroup,
      callback);
};


/**
 * @param {!proto.fayment.SwitchOrderReq} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.fayment.Empty>}
 *     A native promise that resolves to the response
 */
proto.fayment.UserServicePromiseClient.prototype.switchGroup =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/fayment.UserService/SwitchGroup',
      request,
      metadata || {},
      methodDescriptor_UserService_SwitchGroup);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.fayment.AddCoinAccountReq,
 *   !proto.fayment.Empty>}
 */
const methodDescriptor_UserService_AddCoinAccount = new grpc.web.MethodDescriptor(
  '/fayment.UserService/AddCoinAccount',
  grpc.web.MethodType.UNARY,
  proto.fayment.AddCoinAccountReq,
  base_pb.Empty,
  /**
   * @param {!proto.fayment.AddCoinAccountReq} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  base_pb.Empty.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.fayment.AddCoinAccountReq,
 *   !proto.fayment.Empty>}
 */
const methodInfo_UserService_AddCoinAccount = new grpc.web.AbstractClientBase.MethodInfo(
  base_pb.Empty,
  /**
   * @param {!proto.fayment.AddCoinAccountReq} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  base_pb.Empty.deserializeBinary
);


/**
 * @param {!proto.fayment.AddCoinAccountReq} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.fayment.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.fayment.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.fayment.UserServiceClient.prototype.addCoinAccount =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/fayment.UserService/AddCoinAccount',
      request,
      metadata || {},
      methodDescriptor_UserService_AddCoinAccount,
      callback);
};


/**
 * @param {!proto.fayment.AddCoinAccountReq} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.fayment.Empty>}
 *     A native promise that resolves to the response
 */
proto.fayment.UserServicePromiseClient.prototype.addCoinAccount =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/fayment.UserService/AddCoinAccount',
      request,
      metadata || {},
      methodDescriptor_UserService_AddCoinAccount);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.fayment.CoinAccountDTO,
 *   !proto.fayment.Empty>}
 */
const methodDescriptor_UserService_UpdateCoinAccount = new grpc.web.MethodDescriptor(
  '/fayment.UserService/UpdateCoinAccount',
  grpc.web.MethodType.UNARY,
  proto.fayment.CoinAccountDTO,
  base_pb.Empty,
  /**
   * @param {!proto.fayment.CoinAccountDTO} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  base_pb.Empty.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.fayment.CoinAccountDTO,
 *   !proto.fayment.Empty>}
 */
const methodInfo_UserService_UpdateCoinAccount = new grpc.web.AbstractClientBase.MethodInfo(
  base_pb.Empty,
  /**
   * @param {!proto.fayment.CoinAccountDTO} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  base_pb.Empty.deserializeBinary
);


/**
 * @param {!proto.fayment.CoinAccountDTO} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.fayment.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.fayment.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.fayment.UserServiceClient.prototype.updateCoinAccount =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/fayment.UserService/UpdateCoinAccount',
      request,
      metadata || {},
      methodDescriptor_UserService_UpdateCoinAccount,
      callback);
};


/**
 * @param {!proto.fayment.CoinAccountDTO} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.fayment.Empty>}
 *     A native promise that resolves to the response
 */
proto.fayment.UserServicePromiseClient.prototype.updateCoinAccount =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/fayment.UserService/UpdateCoinAccount',
      request,
      metadata || {},
      methodDescriptor_UserService_UpdateCoinAccount);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.fayment.IdWrapper,
 *   !proto.fayment.Empty>}
 */
const methodDescriptor_UserService_DeleteCoinAccount = new grpc.web.MethodDescriptor(
  '/fayment.UserService/DeleteCoinAccount',
  grpc.web.MethodType.UNARY,
  base_pb.IdWrapper,
  base_pb.Empty,
  /**
   * @param {!proto.fayment.IdWrapper} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  base_pb.Empty.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.fayment.IdWrapper,
 *   !proto.fayment.Empty>}
 */
const methodInfo_UserService_DeleteCoinAccount = new grpc.web.AbstractClientBase.MethodInfo(
  base_pb.Empty,
  /**
   * @param {!proto.fayment.IdWrapper} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  base_pb.Empty.deserializeBinary
);


/**
 * @param {!proto.fayment.IdWrapper} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.fayment.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.fayment.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.fayment.UserServiceClient.prototype.deleteCoinAccount =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/fayment.UserService/DeleteCoinAccount',
      request,
      metadata || {},
      methodDescriptor_UserService_DeleteCoinAccount,
      callback);
};


/**
 * @param {!proto.fayment.IdWrapper} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.fayment.Empty>}
 *     A native promise that resolves to the response
 */
proto.fayment.UserServicePromiseClient.prototype.deleteCoinAccount =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/fayment.UserService/DeleteCoinAccount',
      request,
      metadata || {},
      methodDescriptor_UserService_DeleteCoinAccount);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.fayment.ListCoinAccountsReq,
 *   !proto.fayment.CoinAccountsDTO>}
 */
const methodDescriptor_UserService_ListCoinAccounts = new grpc.web.MethodDescriptor(
  '/fayment.UserService/ListCoinAccounts',
  grpc.web.MethodType.UNARY,
  proto.fayment.ListCoinAccountsReq,
  proto.fayment.CoinAccountsDTO,
  /**
   * @param {!proto.fayment.ListCoinAccountsReq} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.fayment.CoinAccountsDTO.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.fayment.ListCoinAccountsReq,
 *   !proto.fayment.CoinAccountsDTO>}
 */
const methodInfo_UserService_ListCoinAccounts = new grpc.web.AbstractClientBase.MethodInfo(
  proto.fayment.CoinAccountsDTO,
  /**
   * @param {!proto.fayment.ListCoinAccountsReq} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.fayment.CoinAccountsDTO.deserializeBinary
);


/**
 * @param {!proto.fayment.ListCoinAccountsReq} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.fayment.CoinAccountsDTO)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.fayment.CoinAccountsDTO>|undefined}
 *     The XHR Node Readable Stream
 */
proto.fayment.UserServiceClient.prototype.listCoinAccounts =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/fayment.UserService/ListCoinAccounts',
      request,
      metadata || {},
      methodDescriptor_UserService_ListCoinAccounts,
      callback);
};


/**
 * @param {!proto.fayment.ListCoinAccountsReq} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.fayment.CoinAccountsDTO>}
 *     A native promise that resolves to the response
 */
proto.fayment.UserServicePromiseClient.prototype.listCoinAccounts =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/fayment.UserService/ListCoinAccounts',
      request,
      metadata || {},
      methodDescriptor_UserService_ListCoinAccounts);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.fayment.SwitchOrderReq,
 *   !proto.fayment.Empty>}
 */
const methodDescriptor_UserService_SwitchCoinAccount = new grpc.web.MethodDescriptor(
  '/fayment.UserService/SwitchCoinAccount',
  grpc.web.MethodType.UNARY,
  proto.fayment.SwitchOrderReq,
  base_pb.Empty,
  /**
   * @param {!proto.fayment.SwitchOrderReq} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  base_pb.Empty.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.fayment.SwitchOrderReq,
 *   !proto.fayment.Empty>}
 */
const methodInfo_UserService_SwitchCoinAccount = new grpc.web.AbstractClientBase.MethodInfo(
  base_pb.Empty,
  /**
   * @param {!proto.fayment.SwitchOrderReq} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  base_pb.Empty.deserializeBinary
);


/**
 * @param {!proto.fayment.SwitchOrderReq} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.fayment.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.fayment.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.fayment.UserServiceClient.prototype.switchCoinAccount =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/fayment.UserService/SwitchCoinAccount',
      request,
      metadata || {},
      methodDescriptor_UserService_SwitchCoinAccount,
      callback);
};


/**
 * @param {!proto.fayment.SwitchOrderReq} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.fayment.Empty>}
 *     A native promise that resolves to the response
 */
proto.fayment.UserServicePromiseClient.prototype.switchCoinAccount =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/fayment.UserService/SwitchCoinAccount',
      request,
      metadata || {},
      methodDescriptor_UserService_SwitchCoinAccount);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.fayment.ListCoinAccountLogsReq,
 *   !proto.fayment.CoinAccountLogsDTO>}
 */
const methodDescriptor_UserService_ListCoinAccountLogs = new grpc.web.MethodDescriptor(
  '/fayment.UserService/ListCoinAccountLogs',
  grpc.web.MethodType.UNARY,
  proto.fayment.ListCoinAccountLogsReq,
  proto.fayment.CoinAccountLogsDTO,
  /**
   * @param {!proto.fayment.ListCoinAccountLogsReq} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.fayment.CoinAccountLogsDTO.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.fayment.ListCoinAccountLogsReq,
 *   !proto.fayment.CoinAccountLogsDTO>}
 */
const methodInfo_UserService_ListCoinAccountLogs = new grpc.web.AbstractClientBase.MethodInfo(
  proto.fayment.CoinAccountLogsDTO,
  /**
   * @param {!proto.fayment.ListCoinAccountLogsReq} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.fayment.CoinAccountLogsDTO.deserializeBinary
);


/**
 * @param {!proto.fayment.ListCoinAccountLogsReq} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.fayment.CoinAccountLogsDTO)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.fayment.CoinAccountLogsDTO>|undefined}
 *     The XHR Node Readable Stream
 */
proto.fayment.UserServiceClient.prototype.listCoinAccountLogs =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/fayment.UserService/ListCoinAccountLogs',
      request,
      metadata || {},
      methodDescriptor_UserService_ListCoinAccountLogs,
      callback);
};


/**
 * @param {!proto.fayment.ListCoinAccountLogsReq} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.fayment.CoinAccountLogsDTO>}
 *     A native promise that resolves to the response
 */
proto.fayment.UserServicePromiseClient.prototype.listCoinAccountLogs =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/fayment.UserService/ListCoinAccountLogs',
      request,
      metadata || {},
      methodDescriptor_UserService_ListCoinAccountLogs);
};


module.exports = proto.fayment;

