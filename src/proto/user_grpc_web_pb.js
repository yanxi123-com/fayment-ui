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
 *   !proto.fayment.ChangeGroupReq,
 *   !proto.fayment.Empty>}
 */
const methodDescriptor_UserService_ChangeGroup = new grpc.web.MethodDescriptor(
  '/fayment.UserService/ChangeGroup',
  grpc.web.MethodType.UNARY,
  proto.fayment.ChangeGroupReq,
  base_pb.Empty,
  /**
   * @param {!proto.fayment.ChangeGroupReq} request
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
 *   !proto.fayment.ChangeGroupReq,
 *   !proto.fayment.Empty>}
 */
const methodInfo_UserService_ChangeGroup = new grpc.web.AbstractClientBase.MethodInfo(
  base_pb.Empty,
  /**
   * @param {!proto.fayment.ChangeGroupReq} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  base_pb.Empty.deserializeBinary
);


/**
 * @param {!proto.fayment.ChangeGroupReq} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.fayment.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.fayment.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.fayment.UserServiceClient.prototype.changeGroup =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/fayment.UserService/ChangeGroup',
      request,
      metadata || {},
      methodDescriptor_UserService_ChangeGroup,
      callback);
};


/**
 * @param {!proto.fayment.ChangeGroupReq} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.fayment.Empty>}
 *     A native promise that resolves to the response
 */
proto.fayment.UserServicePromiseClient.prototype.changeGroup =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/fayment.UserService/ChangeGroup',
      request,
      metadata || {},
      methodDescriptor_UserService_ChangeGroup);
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
 *   !proto.fayment.IdWrapper,
 *   !proto.fayment.CoinAccountsDTO>}
 */
const methodDescriptor_UserService_ListCoinAccounts = new grpc.web.MethodDescriptor(
  '/fayment.UserService/ListCoinAccounts',
  grpc.web.MethodType.UNARY,
  base_pb.IdWrapper,
  proto.fayment.CoinAccountsDTO,
  /**
   * @param {!proto.fayment.IdWrapper} request
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
 *   !proto.fayment.IdWrapper,
 *   !proto.fayment.CoinAccountsDTO>}
 */
const methodInfo_UserService_ListCoinAccounts = new grpc.web.AbstractClientBase.MethodInfo(
  proto.fayment.CoinAccountsDTO,
  /**
   * @param {!proto.fayment.IdWrapper} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.fayment.CoinAccountsDTO.deserializeBinary
);


/**
 * @param {!proto.fayment.IdWrapper} request The
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
 * @param {!proto.fayment.IdWrapper} request The
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
 *   !proto.fayment.ListAccountLogsReq,
 *   !proto.fayment.CoinAccountLogsDTO>}
 */
const methodDescriptor_UserService_ListCoinAccountLogs = new grpc.web.MethodDescriptor(
  '/fayment.UserService/ListCoinAccountLogs',
  grpc.web.MethodType.UNARY,
  proto.fayment.ListAccountLogsReq,
  proto.fayment.CoinAccountLogsDTO,
  /**
   * @param {!proto.fayment.ListAccountLogsReq} request
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
 *   !proto.fayment.ListAccountLogsReq,
 *   !proto.fayment.CoinAccountLogsDTO>}
 */
const methodInfo_UserService_ListCoinAccountLogs = new grpc.web.AbstractClientBase.MethodInfo(
  proto.fayment.CoinAccountLogsDTO,
  /**
   * @param {!proto.fayment.ListAccountLogsReq} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.fayment.CoinAccountLogsDTO.deserializeBinary
);


/**
 * @param {!proto.fayment.ListAccountLogsReq} request The
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
 * @param {!proto.fayment.ListAccountLogsReq} request The
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


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.fayment.IdWrapper,
 *   !proto.fayment.Empty>}
 */
const methodDescriptor_UserService_deleteCoinAccountLog = new grpc.web.MethodDescriptor(
  '/fayment.UserService/deleteCoinAccountLog',
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
const methodInfo_UserService_deleteCoinAccountLog = new grpc.web.AbstractClientBase.MethodInfo(
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
proto.fayment.UserServiceClient.prototype.deleteCoinAccountLog =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/fayment.UserService/deleteCoinAccountLog',
      request,
      metadata || {},
      methodDescriptor_UserService_deleteCoinAccountLog,
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
proto.fayment.UserServicePromiseClient.prototype.deleteCoinAccountLog =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/fayment.UserService/deleteCoinAccountLog',
      request,
      metadata || {},
      methodDescriptor_UserService_deleteCoinAccountLog);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.fayment.AddStockAccountReq,
 *   !proto.fayment.Empty>}
 */
const methodDescriptor_UserService_AddStockAccount = new grpc.web.MethodDescriptor(
  '/fayment.UserService/AddStockAccount',
  grpc.web.MethodType.UNARY,
  proto.fayment.AddStockAccountReq,
  base_pb.Empty,
  /**
   * @param {!proto.fayment.AddStockAccountReq} request
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
 *   !proto.fayment.AddStockAccountReq,
 *   !proto.fayment.Empty>}
 */
const methodInfo_UserService_AddStockAccount = new grpc.web.AbstractClientBase.MethodInfo(
  base_pb.Empty,
  /**
   * @param {!proto.fayment.AddStockAccountReq} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  base_pb.Empty.deserializeBinary
);


/**
 * @param {!proto.fayment.AddStockAccountReq} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.fayment.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.fayment.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.fayment.UserServiceClient.prototype.addStockAccount =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/fayment.UserService/AddStockAccount',
      request,
      metadata || {},
      methodDescriptor_UserService_AddStockAccount,
      callback);
};


/**
 * @param {!proto.fayment.AddStockAccountReq} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.fayment.Empty>}
 *     A native promise that resolves to the response
 */
proto.fayment.UserServicePromiseClient.prototype.addStockAccount =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/fayment.UserService/AddStockAccount',
      request,
      metadata || {},
      methodDescriptor_UserService_AddStockAccount);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.fayment.StockAccountDTO,
 *   !proto.fayment.Empty>}
 */
const methodDescriptor_UserService_UpdateStockAccount = new grpc.web.MethodDescriptor(
  '/fayment.UserService/UpdateStockAccount',
  grpc.web.MethodType.UNARY,
  proto.fayment.StockAccountDTO,
  base_pb.Empty,
  /**
   * @param {!proto.fayment.StockAccountDTO} request
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
 *   !proto.fayment.StockAccountDTO,
 *   !proto.fayment.Empty>}
 */
const methodInfo_UserService_UpdateStockAccount = new grpc.web.AbstractClientBase.MethodInfo(
  base_pb.Empty,
  /**
   * @param {!proto.fayment.StockAccountDTO} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  base_pb.Empty.deserializeBinary
);


/**
 * @param {!proto.fayment.StockAccountDTO} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.fayment.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.fayment.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.fayment.UserServiceClient.prototype.updateStockAccount =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/fayment.UserService/UpdateStockAccount',
      request,
      metadata || {},
      methodDescriptor_UserService_UpdateStockAccount,
      callback);
};


/**
 * @param {!proto.fayment.StockAccountDTO} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.fayment.Empty>}
 *     A native promise that resolves to the response
 */
proto.fayment.UserServicePromiseClient.prototype.updateStockAccount =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/fayment.UserService/UpdateStockAccount',
      request,
      metadata || {},
      methodDescriptor_UserService_UpdateStockAccount);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.fayment.IdWrapper,
 *   !proto.fayment.Empty>}
 */
const methodDescriptor_UserService_DeleteStockAccount = new grpc.web.MethodDescriptor(
  '/fayment.UserService/DeleteStockAccount',
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
const methodInfo_UserService_DeleteStockAccount = new grpc.web.AbstractClientBase.MethodInfo(
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
proto.fayment.UserServiceClient.prototype.deleteStockAccount =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/fayment.UserService/DeleteStockAccount',
      request,
      metadata || {},
      methodDescriptor_UserService_DeleteStockAccount,
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
proto.fayment.UserServicePromiseClient.prototype.deleteStockAccount =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/fayment.UserService/DeleteStockAccount',
      request,
      metadata || {},
      methodDescriptor_UserService_DeleteStockAccount);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.fayment.IdWrapper,
 *   !proto.fayment.StockAccountsDTO>}
 */
const methodDescriptor_UserService_ListStockAccounts = new grpc.web.MethodDescriptor(
  '/fayment.UserService/ListStockAccounts',
  grpc.web.MethodType.UNARY,
  base_pb.IdWrapper,
  proto.fayment.StockAccountsDTO,
  /**
   * @param {!proto.fayment.IdWrapper} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.fayment.StockAccountsDTO.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.fayment.IdWrapper,
 *   !proto.fayment.StockAccountsDTO>}
 */
const methodInfo_UserService_ListStockAccounts = new grpc.web.AbstractClientBase.MethodInfo(
  proto.fayment.StockAccountsDTO,
  /**
   * @param {!proto.fayment.IdWrapper} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.fayment.StockAccountsDTO.deserializeBinary
);


/**
 * @param {!proto.fayment.IdWrapper} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.fayment.StockAccountsDTO)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.fayment.StockAccountsDTO>|undefined}
 *     The XHR Node Readable Stream
 */
proto.fayment.UserServiceClient.prototype.listStockAccounts =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/fayment.UserService/ListStockAccounts',
      request,
      metadata || {},
      methodDescriptor_UserService_ListStockAccounts,
      callback);
};


/**
 * @param {!proto.fayment.IdWrapper} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.fayment.StockAccountsDTO>}
 *     A native promise that resolves to the response
 */
proto.fayment.UserServicePromiseClient.prototype.listStockAccounts =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/fayment.UserService/ListStockAccounts',
      request,
      metadata || {},
      methodDescriptor_UserService_ListStockAccounts);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.fayment.SwitchOrderReq,
 *   !proto.fayment.Empty>}
 */
const methodDescriptor_UserService_SwitchStockAccount = new grpc.web.MethodDescriptor(
  '/fayment.UserService/SwitchStockAccount',
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
const methodInfo_UserService_SwitchStockAccount = new grpc.web.AbstractClientBase.MethodInfo(
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
proto.fayment.UserServiceClient.prototype.switchStockAccount =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/fayment.UserService/SwitchStockAccount',
      request,
      metadata || {},
      methodDescriptor_UserService_SwitchStockAccount,
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
proto.fayment.UserServicePromiseClient.prototype.switchStockAccount =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/fayment.UserService/SwitchStockAccount',
      request,
      metadata || {},
      methodDescriptor_UserService_SwitchStockAccount);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.fayment.ListAccountLogsReq,
 *   !proto.fayment.StockAccountLogsDTO>}
 */
const methodDescriptor_UserService_ListStockAccountLogs = new grpc.web.MethodDescriptor(
  '/fayment.UserService/ListStockAccountLogs',
  grpc.web.MethodType.UNARY,
  proto.fayment.ListAccountLogsReq,
  proto.fayment.StockAccountLogsDTO,
  /**
   * @param {!proto.fayment.ListAccountLogsReq} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.fayment.StockAccountLogsDTO.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.fayment.ListAccountLogsReq,
 *   !proto.fayment.StockAccountLogsDTO>}
 */
const methodInfo_UserService_ListStockAccountLogs = new grpc.web.AbstractClientBase.MethodInfo(
  proto.fayment.StockAccountLogsDTO,
  /**
   * @param {!proto.fayment.ListAccountLogsReq} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.fayment.StockAccountLogsDTO.deserializeBinary
);


/**
 * @param {!proto.fayment.ListAccountLogsReq} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.fayment.StockAccountLogsDTO)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.fayment.StockAccountLogsDTO>|undefined}
 *     The XHR Node Readable Stream
 */
proto.fayment.UserServiceClient.prototype.listStockAccountLogs =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/fayment.UserService/ListStockAccountLogs',
      request,
      metadata || {},
      methodDescriptor_UserService_ListStockAccountLogs,
      callback);
};


/**
 * @param {!proto.fayment.ListAccountLogsReq} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.fayment.StockAccountLogsDTO>}
 *     A native promise that resolves to the response
 */
proto.fayment.UserServicePromiseClient.prototype.listStockAccountLogs =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/fayment.UserService/ListStockAccountLogs',
      request,
      metadata || {},
      methodDescriptor_UserService_ListStockAccountLogs);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.fayment.IdWrapper,
 *   !proto.fayment.Empty>}
 */
const methodDescriptor_UserService_deleteStockAccountLog = new grpc.web.MethodDescriptor(
  '/fayment.UserService/deleteStockAccountLog',
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
const methodInfo_UserService_deleteStockAccountLog = new grpc.web.AbstractClientBase.MethodInfo(
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
proto.fayment.UserServiceClient.prototype.deleteStockAccountLog =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/fayment.UserService/deleteStockAccountLog',
      request,
      metadata || {},
      methodDescriptor_UserService_deleteStockAccountLog,
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
proto.fayment.UserServicePromiseClient.prototype.deleteStockAccountLog =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/fayment.UserService/deleteStockAccountLog',
      request,
      metadata || {},
      methodDescriptor_UserService_deleteStockAccountLog);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.fayment.AddTradeReq,
 *   !proto.fayment.Empty>}
 */
const methodDescriptor_UserService_AddTrade = new grpc.web.MethodDescriptor(
  '/fayment.UserService/AddTrade',
  grpc.web.MethodType.UNARY,
  proto.fayment.AddTradeReq,
  base_pb.Empty,
  /**
   * @param {!proto.fayment.AddTradeReq} request
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
 *   !proto.fayment.AddTradeReq,
 *   !proto.fayment.Empty>}
 */
const methodInfo_UserService_AddTrade = new grpc.web.AbstractClientBase.MethodInfo(
  base_pb.Empty,
  /**
   * @param {!proto.fayment.AddTradeReq} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  base_pb.Empty.deserializeBinary
);


/**
 * @param {!proto.fayment.AddTradeReq} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.fayment.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.fayment.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.fayment.UserServiceClient.prototype.addTrade =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/fayment.UserService/AddTrade',
      request,
      metadata || {},
      methodDescriptor_UserService_AddTrade,
      callback);
};


/**
 * @param {!proto.fayment.AddTradeReq} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.fayment.Empty>}
 *     A native promise that resolves to the response
 */
proto.fayment.UserServicePromiseClient.prototype.addTrade =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/fayment.UserService/AddTrade',
      request,
      metadata || {},
      methodDescriptor_UserService_AddTrade);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.fayment.TradeDTO,
 *   !proto.fayment.Empty>}
 */
const methodDescriptor_UserService_UpdateTrade = new grpc.web.MethodDescriptor(
  '/fayment.UserService/UpdateTrade',
  grpc.web.MethodType.UNARY,
  proto.fayment.TradeDTO,
  base_pb.Empty,
  /**
   * @param {!proto.fayment.TradeDTO} request
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
 *   !proto.fayment.TradeDTO,
 *   !proto.fayment.Empty>}
 */
const methodInfo_UserService_UpdateTrade = new grpc.web.AbstractClientBase.MethodInfo(
  base_pb.Empty,
  /**
   * @param {!proto.fayment.TradeDTO} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  base_pb.Empty.deserializeBinary
);


/**
 * @param {!proto.fayment.TradeDTO} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.fayment.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.fayment.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.fayment.UserServiceClient.prototype.updateTrade =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/fayment.UserService/UpdateTrade',
      request,
      metadata || {},
      methodDescriptor_UserService_UpdateTrade,
      callback);
};


/**
 * @param {!proto.fayment.TradeDTO} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.fayment.Empty>}
 *     A native promise that resolves to the response
 */
proto.fayment.UserServicePromiseClient.prototype.updateTrade =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/fayment.UserService/UpdateTrade',
      request,
      metadata || {},
      methodDescriptor_UserService_UpdateTrade);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.fayment.CloseTradeReq,
 *   !proto.fayment.Empty>}
 */
const methodDescriptor_UserService_CloseTrade = new grpc.web.MethodDescriptor(
  '/fayment.UserService/CloseTrade',
  grpc.web.MethodType.UNARY,
  proto.fayment.CloseTradeReq,
  base_pb.Empty,
  /**
   * @param {!proto.fayment.CloseTradeReq} request
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
 *   !proto.fayment.CloseTradeReq,
 *   !proto.fayment.Empty>}
 */
const methodInfo_UserService_CloseTrade = new grpc.web.AbstractClientBase.MethodInfo(
  base_pb.Empty,
  /**
   * @param {!proto.fayment.CloseTradeReq} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  base_pb.Empty.deserializeBinary
);


/**
 * @param {!proto.fayment.CloseTradeReq} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.fayment.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.fayment.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.fayment.UserServiceClient.prototype.closeTrade =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/fayment.UserService/CloseTrade',
      request,
      metadata || {},
      methodDescriptor_UserService_CloseTrade,
      callback);
};


/**
 * @param {!proto.fayment.CloseTradeReq} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.fayment.Empty>}
 *     A native promise that resolves to the response
 */
proto.fayment.UserServicePromiseClient.prototype.closeTrade =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/fayment.UserService/CloseTrade',
      request,
      metadata || {},
      methodDescriptor_UserService_CloseTrade);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.fayment.IdWrapper,
 *   !proto.fayment.TradesDTO>}
 */
const methodDescriptor_UserService_ListTrades = new grpc.web.MethodDescriptor(
  '/fayment.UserService/ListTrades',
  grpc.web.MethodType.UNARY,
  base_pb.IdWrapper,
  proto.fayment.TradesDTO,
  /**
   * @param {!proto.fayment.IdWrapper} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.fayment.TradesDTO.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.fayment.IdWrapper,
 *   !proto.fayment.TradesDTO>}
 */
const methodInfo_UserService_ListTrades = new grpc.web.AbstractClientBase.MethodInfo(
  proto.fayment.TradesDTO,
  /**
   * @param {!proto.fayment.IdWrapper} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.fayment.TradesDTO.deserializeBinary
);


/**
 * @param {!proto.fayment.IdWrapper} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.fayment.TradesDTO)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.fayment.TradesDTO>|undefined}
 *     The XHR Node Readable Stream
 */
proto.fayment.UserServiceClient.prototype.listTrades =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/fayment.UserService/ListTrades',
      request,
      metadata || {},
      methodDescriptor_UserService_ListTrades,
      callback);
};


/**
 * @param {!proto.fayment.IdWrapper} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.fayment.TradesDTO>}
 *     A native promise that resolves to the response
 */
proto.fayment.UserServicePromiseClient.prototype.listTrades =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/fayment.UserService/ListTrades',
      request,
      metadata || {},
      methodDescriptor_UserService_ListTrades);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.fayment.IdWrapper,
 *   !proto.fayment.Empty>}
 */
const methodDescriptor_UserService_DeleteTrade = new grpc.web.MethodDescriptor(
  '/fayment.UserService/DeleteTrade',
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
const methodInfo_UserService_DeleteTrade = new grpc.web.AbstractClientBase.MethodInfo(
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
proto.fayment.UserServiceClient.prototype.deleteTrade =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/fayment.UserService/DeleteTrade',
      request,
      metadata || {},
      methodDescriptor_UserService_DeleteTrade,
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
proto.fayment.UserServicePromiseClient.prototype.deleteTrade =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/fayment.UserService/DeleteTrade',
      request,
      metadata || {},
      methodDescriptor_UserService_DeleteTrade);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.fayment.SwitchOrderReq,
 *   !proto.fayment.Empty>}
 */
const methodDescriptor_UserService_SwitchTrade = new grpc.web.MethodDescriptor(
  '/fayment.UserService/SwitchTrade',
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
const methodInfo_UserService_SwitchTrade = new grpc.web.AbstractClientBase.MethodInfo(
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
proto.fayment.UserServiceClient.prototype.switchTrade =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/fayment.UserService/SwitchTrade',
      request,
      metadata || {},
      methodDescriptor_UserService_SwitchTrade,
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
proto.fayment.UserServicePromiseClient.prototype.switchTrade =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/fayment.UserService/SwitchTrade',
      request,
      metadata || {},
      methodDescriptor_UserService_SwitchTrade);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.fayment.AddStockTradeReq,
 *   !proto.fayment.Empty>}
 */
const methodDescriptor_UserService_AddStockTrade = new grpc.web.MethodDescriptor(
  '/fayment.UserService/AddStockTrade',
  grpc.web.MethodType.UNARY,
  proto.fayment.AddStockTradeReq,
  base_pb.Empty,
  /**
   * @param {!proto.fayment.AddStockTradeReq} request
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
 *   !proto.fayment.AddStockTradeReq,
 *   !proto.fayment.Empty>}
 */
const methodInfo_UserService_AddStockTrade = new grpc.web.AbstractClientBase.MethodInfo(
  base_pb.Empty,
  /**
   * @param {!proto.fayment.AddStockTradeReq} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  base_pb.Empty.deserializeBinary
);


/**
 * @param {!proto.fayment.AddStockTradeReq} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.fayment.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.fayment.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.fayment.UserServiceClient.prototype.addStockTrade =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/fayment.UserService/AddStockTrade',
      request,
      metadata || {},
      methodDescriptor_UserService_AddStockTrade,
      callback);
};


/**
 * @param {!proto.fayment.AddStockTradeReq} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.fayment.Empty>}
 *     A native promise that resolves to the response
 */
proto.fayment.UserServicePromiseClient.prototype.addStockTrade =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/fayment.UserService/AddStockTrade',
      request,
      metadata || {},
      methodDescriptor_UserService_AddStockTrade);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.fayment.StockTradeDTO,
 *   !proto.fayment.Empty>}
 */
const methodDescriptor_UserService_UpdateStockTrade = new grpc.web.MethodDescriptor(
  '/fayment.UserService/UpdateStockTrade',
  grpc.web.MethodType.UNARY,
  proto.fayment.StockTradeDTO,
  base_pb.Empty,
  /**
   * @param {!proto.fayment.StockTradeDTO} request
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
 *   !proto.fayment.StockTradeDTO,
 *   !proto.fayment.Empty>}
 */
const methodInfo_UserService_UpdateStockTrade = new grpc.web.AbstractClientBase.MethodInfo(
  base_pb.Empty,
  /**
   * @param {!proto.fayment.StockTradeDTO} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  base_pb.Empty.deserializeBinary
);


/**
 * @param {!proto.fayment.StockTradeDTO} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.fayment.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.fayment.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.fayment.UserServiceClient.prototype.updateStockTrade =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/fayment.UserService/UpdateStockTrade',
      request,
      metadata || {},
      methodDescriptor_UserService_UpdateStockTrade,
      callback);
};


/**
 * @param {!proto.fayment.StockTradeDTO} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.fayment.Empty>}
 *     A native promise that resolves to the response
 */
proto.fayment.UserServicePromiseClient.prototype.updateStockTrade =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/fayment.UserService/UpdateStockTrade',
      request,
      metadata || {},
      methodDescriptor_UserService_UpdateStockTrade);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.fayment.CloseStockTradeReq,
 *   !proto.fayment.Empty>}
 */
const methodDescriptor_UserService_CloseStockTrade = new grpc.web.MethodDescriptor(
  '/fayment.UserService/CloseStockTrade',
  grpc.web.MethodType.UNARY,
  proto.fayment.CloseStockTradeReq,
  base_pb.Empty,
  /**
   * @param {!proto.fayment.CloseStockTradeReq} request
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
 *   !proto.fayment.CloseStockTradeReq,
 *   !proto.fayment.Empty>}
 */
const methodInfo_UserService_CloseStockTrade = new grpc.web.AbstractClientBase.MethodInfo(
  base_pb.Empty,
  /**
   * @param {!proto.fayment.CloseStockTradeReq} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  base_pb.Empty.deserializeBinary
);


/**
 * @param {!proto.fayment.CloseStockTradeReq} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.fayment.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.fayment.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.fayment.UserServiceClient.prototype.closeStockTrade =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/fayment.UserService/CloseStockTrade',
      request,
      metadata || {},
      methodDescriptor_UserService_CloseStockTrade,
      callback);
};


/**
 * @param {!proto.fayment.CloseStockTradeReq} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.fayment.Empty>}
 *     A native promise that resolves to the response
 */
proto.fayment.UserServicePromiseClient.prototype.closeStockTrade =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/fayment.UserService/CloseStockTrade',
      request,
      metadata || {},
      methodDescriptor_UserService_CloseStockTrade);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.fayment.IdWrapper,
 *   !proto.fayment.StockTradesDTO>}
 */
const methodDescriptor_UserService_ListStockTrades = new grpc.web.MethodDescriptor(
  '/fayment.UserService/ListStockTrades',
  grpc.web.MethodType.UNARY,
  base_pb.IdWrapper,
  proto.fayment.StockTradesDTO,
  /**
   * @param {!proto.fayment.IdWrapper} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.fayment.StockTradesDTO.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.fayment.IdWrapper,
 *   !proto.fayment.StockTradesDTO>}
 */
const methodInfo_UserService_ListStockTrades = new grpc.web.AbstractClientBase.MethodInfo(
  proto.fayment.StockTradesDTO,
  /**
   * @param {!proto.fayment.IdWrapper} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.fayment.StockTradesDTO.deserializeBinary
);


/**
 * @param {!proto.fayment.IdWrapper} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.fayment.StockTradesDTO)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.fayment.StockTradesDTO>|undefined}
 *     The XHR Node Readable Stream
 */
proto.fayment.UserServiceClient.prototype.listStockTrades =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/fayment.UserService/ListStockTrades',
      request,
      metadata || {},
      methodDescriptor_UserService_ListStockTrades,
      callback);
};


/**
 * @param {!proto.fayment.IdWrapper} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.fayment.StockTradesDTO>}
 *     A native promise that resolves to the response
 */
proto.fayment.UserServicePromiseClient.prototype.listStockTrades =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/fayment.UserService/ListStockTrades',
      request,
      metadata || {},
      methodDescriptor_UserService_ListStockTrades);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.fayment.IdWrapper,
 *   !proto.fayment.Empty>}
 */
const methodDescriptor_UserService_DeleteStockTrade = new grpc.web.MethodDescriptor(
  '/fayment.UserService/DeleteStockTrade',
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
const methodInfo_UserService_DeleteStockTrade = new grpc.web.AbstractClientBase.MethodInfo(
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
proto.fayment.UserServiceClient.prototype.deleteStockTrade =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/fayment.UserService/DeleteStockTrade',
      request,
      metadata || {},
      methodDescriptor_UserService_DeleteStockTrade,
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
proto.fayment.UserServicePromiseClient.prototype.deleteStockTrade =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/fayment.UserService/DeleteStockTrade',
      request,
      metadata || {},
      methodDescriptor_UserService_DeleteStockTrade);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.fayment.SwitchOrderReq,
 *   !proto.fayment.Empty>}
 */
const methodDescriptor_UserService_SwitchStockTrade = new grpc.web.MethodDescriptor(
  '/fayment.UserService/SwitchStockTrade',
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
const methodInfo_UserService_SwitchStockTrade = new grpc.web.AbstractClientBase.MethodInfo(
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
proto.fayment.UserServiceClient.prototype.switchStockTrade =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/fayment.UserService/SwitchStockTrade',
      request,
      metadata || {},
      methodDescriptor_UserService_SwitchStockTrade,
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
proto.fayment.UserServicePromiseClient.prototype.switchStockTrade =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/fayment.UserService/SwitchStockTrade',
      request,
      metadata || {},
      methodDescriptor_UserService_SwitchStockTrade);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.fayment.AddFuturesTradeReq,
 *   !proto.fayment.Empty>}
 */
const methodDescriptor_UserService_AddFuturesTrade = new grpc.web.MethodDescriptor(
  '/fayment.UserService/AddFuturesTrade',
  grpc.web.MethodType.UNARY,
  proto.fayment.AddFuturesTradeReq,
  base_pb.Empty,
  /**
   * @param {!proto.fayment.AddFuturesTradeReq} request
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
 *   !proto.fayment.AddFuturesTradeReq,
 *   !proto.fayment.Empty>}
 */
const methodInfo_UserService_AddFuturesTrade = new grpc.web.AbstractClientBase.MethodInfo(
  base_pb.Empty,
  /**
   * @param {!proto.fayment.AddFuturesTradeReq} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  base_pb.Empty.deserializeBinary
);


/**
 * @param {!proto.fayment.AddFuturesTradeReq} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.fayment.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.fayment.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.fayment.UserServiceClient.prototype.addFuturesTrade =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/fayment.UserService/AddFuturesTrade',
      request,
      metadata || {},
      methodDescriptor_UserService_AddFuturesTrade,
      callback);
};


/**
 * @param {!proto.fayment.AddFuturesTradeReq} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.fayment.Empty>}
 *     A native promise that resolves to the response
 */
proto.fayment.UserServicePromiseClient.prototype.addFuturesTrade =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/fayment.UserService/AddFuturesTrade',
      request,
      metadata || {},
      methodDescriptor_UserService_AddFuturesTrade);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.fayment.UpdateFuturesTradeReq,
 *   !proto.fayment.Empty>}
 */
const methodDescriptor_UserService_UpdateFuturesTrade = new grpc.web.MethodDescriptor(
  '/fayment.UserService/UpdateFuturesTrade',
  grpc.web.MethodType.UNARY,
  proto.fayment.UpdateFuturesTradeReq,
  base_pb.Empty,
  /**
   * @param {!proto.fayment.UpdateFuturesTradeReq} request
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
 *   !proto.fayment.UpdateFuturesTradeReq,
 *   !proto.fayment.Empty>}
 */
const methodInfo_UserService_UpdateFuturesTrade = new grpc.web.AbstractClientBase.MethodInfo(
  base_pb.Empty,
  /**
   * @param {!proto.fayment.UpdateFuturesTradeReq} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  base_pb.Empty.deserializeBinary
);


/**
 * @param {!proto.fayment.UpdateFuturesTradeReq} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.fayment.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.fayment.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.fayment.UserServiceClient.prototype.updateFuturesTrade =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/fayment.UserService/UpdateFuturesTrade',
      request,
      metadata || {},
      methodDescriptor_UserService_UpdateFuturesTrade,
      callback);
};


/**
 * @param {!proto.fayment.UpdateFuturesTradeReq} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.fayment.Empty>}
 *     A native promise that resolves to the response
 */
proto.fayment.UserServicePromiseClient.prototype.updateFuturesTrade =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/fayment.UserService/UpdateFuturesTrade',
      request,
      metadata || {},
      methodDescriptor_UserService_UpdateFuturesTrade);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.fayment.CloseFuturesTradeReq,
 *   !proto.fayment.Empty>}
 */
const methodDescriptor_UserService_CloseFuturesTrade = new grpc.web.MethodDescriptor(
  '/fayment.UserService/CloseFuturesTrade',
  grpc.web.MethodType.UNARY,
  proto.fayment.CloseFuturesTradeReq,
  base_pb.Empty,
  /**
   * @param {!proto.fayment.CloseFuturesTradeReq} request
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
 *   !proto.fayment.CloseFuturesTradeReq,
 *   !proto.fayment.Empty>}
 */
const methodInfo_UserService_CloseFuturesTrade = new grpc.web.AbstractClientBase.MethodInfo(
  base_pb.Empty,
  /**
   * @param {!proto.fayment.CloseFuturesTradeReq} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  base_pb.Empty.deserializeBinary
);


/**
 * @param {!proto.fayment.CloseFuturesTradeReq} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.fayment.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.fayment.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.fayment.UserServiceClient.prototype.closeFuturesTrade =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/fayment.UserService/CloseFuturesTrade',
      request,
      metadata || {},
      methodDescriptor_UserService_CloseFuturesTrade,
      callback);
};


/**
 * @param {!proto.fayment.CloseFuturesTradeReq} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.fayment.Empty>}
 *     A native promise that resolves to the response
 */
proto.fayment.UserServicePromiseClient.prototype.closeFuturesTrade =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/fayment.UserService/CloseFuturesTrade',
      request,
      metadata || {},
      methodDescriptor_UserService_CloseFuturesTrade);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.fayment.IdWrapper,
 *   !proto.fayment.FuturesTradesDTO>}
 */
const methodDescriptor_UserService_ListFuturesTrades = new grpc.web.MethodDescriptor(
  '/fayment.UserService/ListFuturesTrades',
  grpc.web.MethodType.UNARY,
  base_pb.IdWrapper,
  proto.fayment.FuturesTradesDTO,
  /**
   * @param {!proto.fayment.IdWrapper} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.fayment.FuturesTradesDTO.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.fayment.IdWrapper,
 *   !proto.fayment.FuturesTradesDTO>}
 */
const methodInfo_UserService_ListFuturesTrades = new grpc.web.AbstractClientBase.MethodInfo(
  proto.fayment.FuturesTradesDTO,
  /**
   * @param {!proto.fayment.IdWrapper} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.fayment.FuturesTradesDTO.deserializeBinary
);


/**
 * @param {!proto.fayment.IdWrapper} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.fayment.FuturesTradesDTO)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.fayment.FuturesTradesDTO>|undefined}
 *     The XHR Node Readable Stream
 */
proto.fayment.UserServiceClient.prototype.listFuturesTrades =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/fayment.UserService/ListFuturesTrades',
      request,
      metadata || {},
      methodDescriptor_UserService_ListFuturesTrades,
      callback);
};


/**
 * @param {!proto.fayment.IdWrapper} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.fayment.FuturesTradesDTO>}
 *     A native promise that resolves to the response
 */
proto.fayment.UserServicePromiseClient.prototype.listFuturesTrades =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/fayment.UserService/ListFuturesTrades',
      request,
      metadata || {},
      methodDescriptor_UserService_ListFuturesTrades);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.fayment.IdWrapper,
 *   !proto.fayment.Empty>}
 */
const methodDescriptor_UserService_DeleteFuturesTrade = new grpc.web.MethodDescriptor(
  '/fayment.UserService/DeleteFuturesTrade',
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
const methodInfo_UserService_DeleteFuturesTrade = new grpc.web.AbstractClientBase.MethodInfo(
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
proto.fayment.UserServiceClient.prototype.deleteFuturesTrade =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/fayment.UserService/DeleteFuturesTrade',
      request,
      metadata || {},
      methodDescriptor_UserService_DeleteFuturesTrade,
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
proto.fayment.UserServicePromiseClient.prototype.deleteFuturesTrade =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/fayment.UserService/DeleteFuturesTrade',
      request,
      metadata || {},
      methodDescriptor_UserService_DeleteFuturesTrade);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.fayment.SwitchOrderReq,
 *   !proto.fayment.Empty>}
 */
const methodDescriptor_UserService_SwitchFuturesTrade = new grpc.web.MethodDescriptor(
  '/fayment.UserService/SwitchFuturesTrade',
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
const methodInfo_UserService_SwitchFuturesTrade = new grpc.web.AbstractClientBase.MethodInfo(
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
proto.fayment.UserServiceClient.prototype.switchFuturesTrade =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/fayment.UserService/SwitchFuturesTrade',
      request,
      metadata || {},
      methodDescriptor_UserService_SwitchFuturesTrade,
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
proto.fayment.UserServicePromiseClient.prototype.switchFuturesTrade =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/fayment.UserService/SwitchFuturesTrade',
      request,
      metadata || {},
      methodDescriptor_UserService_SwitchFuturesTrade);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.fayment.AddFuturesArbitrageReq,
 *   !proto.fayment.Empty>}
 */
const methodDescriptor_UserService_AddFuturesArbitrage = new grpc.web.MethodDescriptor(
  '/fayment.UserService/AddFuturesArbitrage',
  grpc.web.MethodType.UNARY,
  proto.fayment.AddFuturesArbitrageReq,
  base_pb.Empty,
  /**
   * @param {!proto.fayment.AddFuturesArbitrageReq} request
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
 *   !proto.fayment.AddFuturesArbitrageReq,
 *   !proto.fayment.Empty>}
 */
const methodInfo_UserService_AddFuturesArbitrage = new grpc.web.AbstractClientBase.MethodInfo(
  base_pb.Empty,
  /**
   * @param {!proto.fayment.AddFuturesArbitrageReq} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  base_pb.Empty.deserializeBinary
);


/**
 * @param {!proto.fayment.AddFuturesArbitrageReq} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.fayment.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.fayment.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.fayment.UserServiceClient.prototype.addFuturesArbitrage =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/fayment.UserService/AddFuturesArbitrage',
      request,
      metadata || {},
      methodDescriptor_UserService_AddFuturesArbitrage,
      callback);
};


/**
 * @param {!proto.fayment.AddFuturesArbitrageReq} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.fayment.Empty>}
 *     A native promise that resolves to the response
 */
proto.fayment.UserServicePromiseClient.prototype.addFuturesArbitrage =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/fayment.UserService/AddFuturesArbitrage',
      request,
      metadata || {},
      methodDescriptor_UserService_AddFuturesArbitrage);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.fayment.UpdateFuturesArbitrageReq,
 *   !proto.fayment.Empty>}
 */
const methodDescriptor_UserService_UpdateArbitrageTrade = new grpc.web.MethodDescriptor(
  '/fayment.UserService/UpdateArbitrageTrade',
  grpc.web.MethodType.UNARY,
  proto.fayment.UpdateFuturesArbitrageReq,
  base_pb.Empty,
  /**
   * @param {!proto.fayment.UpdateFuturesArbitrageReq} request
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
 *   !proto.fayment.UpdateFuturesArbitrageReq,
 *   !proto.fayment.Empty>}
 */
const methodInfo_UserService_UpdateArbitrageTrade = new grpc.web.AbstractClientBase.MethodInfo(
  base_pb.Empty,
  /**
   * @param {!proto.fayment.UpdateFuturesArbitrageReq} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  base_pb.Empty.deserializeBinary
);


/**
 * @param {!proto.fayment.UpdateFuturesArbitrageReq} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.fayment.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.fayment.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.fayment.UserServiceClient.prototype.updateArbitrageTrade =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/fayment.UserService/UpdateArbitrageTrade',
      request,
      metadata || {},
      methodDescriptor_UserService_UpdateArbitrageTrade,
      callback);
};


/**
 * @param {!proto.fayment.UpdateFuturesArbitrageReq} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.fayment.Empty>}
 *     A native promise that resolves to the response
 */
proto.fayment.UserServicePromiseClient.prototype.updateArbitrageTrade =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/fayment.UserService/UpdateArbitrageTrade',
      request,
      metadata || {},
      methodDescriptor_UserService_UpdateArbitrageTrade);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.fayment.CloseFuturesArbitrageReq,
 *   !proto.fayment.Empty>}
 */
const methodDescriptor_UserService_CloseFuturesArbitrage = new grpc.web.MethodDescriptor(
  '/fayment.UserService/CloseFuturesArbitrage',
  grpc.web.MethodType.UNARY,
  proto.fayment.CloseFuturesArbitrageReq,
  base_pb.Empty,
  /**
   * @param {!proto.fayment.CloseFuturesArbitrageReq} request
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
 *   !proto.fayment.CloseFuturesArbitrageReq,
 *   !proto.fayment.Empty>}
 */
const methodInfo_UserService_CloseFuturesArbitrage = new grpc.web.AbstractClientBase.MethodInfo(
  base_pb.Empty,
  /**
   * @param {!proto.fayment.CloseFuturesArbitrageReq} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  base_pb.Empty.deserializeBinary
);


/**
 * @param {!proto.fayment.CloseFuturesArbitrageReq} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.fayment.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.fayment.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.fayment.UserServiceClient.prototype.closeFuturesArbitrage =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/fayment.UserService/CloseFuturesArbitrage',
      request,
      metadata || {},
      methodDescriptor_UserService_CloseFuturesArbitrage,
      callback);
};


/**
 * @param {!proto.fayment.CloseFuturesArbitrageReq} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.fayment.Empty>}
 *     A native promise that resolves to the response
 */
proto.fayment.UserServicePromiseClient.prototype.closeFuturesArbitrage =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/fayment.UserService/CloseFuturesArbitrage',
      request,
      metadata || {},
      methodDescriptor_UserService_CloseFuturesArbitrage);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.fayment.IdWrapper,
 *   !proto.fayment.FuturesArbitragesDTO>}
 */
const methodDescriptor_UserService_ListFuturesArbitrage = new grpc.web.MethodDescriptor(
  '/fayment.UserService/ListFuturesArbitrage',
  grpc.web.MethodType.UNARY,
  base_pb.IdWrapper,
  proto.fayment.FuturesArbitragesDTO,
  /**
   * @param {!proto.fayment.IdWrapper} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.fayment.FuturesArbitragesDTO.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.fayment.IdWrapper,
 *   !proto.fayment.FuturesArbitragesDTO>}
 */
const methodInfo_UserService_ListFuturesArbitrage = new grpc.web.AbstractClientBase.MethodInfo(
  proto.fayment.FuturesArbitragesDTO,
  /**
   * @param {!proto.fayment.IdWrapper} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.fayment.FuturesArbitragesDTO.deserializeBinary
);


/**
 * @param {!proto.fayment.IdWrapper} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.fayment.FuturesArbitragesDTO)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.fayment.FuturesArbitragesDTO>|undefined}
 *     The XHR Node Readable Stream
 */
proto.fayment.UserServiceClient.prototype.listFuturesArbitrage =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/fayment.UserService/ListFuturesArbitrage',
      request,
      metadata || {},
      methodDescriptor_UserService_ListFuturesArbitrage,
      callback);
};


/**
 * @param {!proto.fayment.IdWrapper} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.fayment.FuturesArbitragesDTO>}
 *     A native promise that resolves to the response
 */
proto.fayment.UserServicePromiseClient.prototype.listFuturesArbitrage =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/fayment.UserService/ListFuturesArbitrage',
      request,
      metadata || {},
      methodDescriptor_UserService_ListFuturesArbitrage);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.fayment.IdWrapper,
 *   !proto.fayment.Empty>}
 */
const methodDescriptor_UserService_DeleteFuturesArbitrage = new grpc.web.MethodDescriptor(
  '/fayment.UserService/DeleteFuturesArbitrage',
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
const methodInfo_UserService_DeleteFuturesArbitrage = new grpc.web.AbstractClientBase.MethodInfo(
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
proto.fayment.UserServiceClient.prototype.deleteFuturesArbitrage =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/fayment.UserService/DeleteFuturesArbitrage',
      request,
      metadata || {},
      methodDescriptor_UserService_DeleteFuturesArbitrage,
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
proto.fayment.UserServicePromiseClient.prototype.deleteFuturesArbitrage =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/fayment.UserService/DeleteFuturesArbitrage',
      request,
      metadata || {},
      methodDescriptor_UserService_DeleteFuturesArbitrage);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.fayment.SwitchOrderReq,
 *   !proto.fayment.Empty>}
 */
const methodDescriptor_UserService_SwitchFuturesArbitrage = new grpc.web.MethodDescriptor(
  '/fayment.UserService/SwitchFuturesArbitrage',
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
const methodInfo_UserService_SwitchFuturesArbitrage = new grpc.web.AbstractClientBase.MethodInfo(
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
proto.fayment.UserServiceClient.prototype.switchFuturesArbitrage =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/fayment.UserService/SwitchFuturesArbitrage',
      request,
      metadata || {},
      methodDescriptor_UserService_SwitchFuturesArbitrage,
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
proto.fayment.UserServicePromiseClient.prototype.switchFuturesArbitrage =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/fayment.UserService/SwitchFuturesArbitrage',
      request,
      metadata || {},
      methodDescriptor_UserService_SwitchFuturesArbitrage);
};


module.exports = proto.fayment;

