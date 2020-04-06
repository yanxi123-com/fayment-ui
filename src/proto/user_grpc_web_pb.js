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
 *   !proto.fayment.SwitchGroupReq,
 *   !proto.fayment.Empty>}
 */
const methodDescriptor_UserService_SwitchGroup = new grpc.web.MethodDescriptor(
  '/fayment.UserService/SwitchGroup',
  grpc.web.MethodType.UNARY,
  proto.fayment.SwitchGroupReq,
  base_pb.Empty,
  /**
   * @param {!proto.fayment.SwitchGroupReq} request
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
 *   !proto.fayment.SwitchGroupReq,
 *   !proto.fayment.Empty>}
 */
const methodInfo_UserService_SwitchGroup = new grpc.web.AbstractClientBase.MethodInfo(
  base_pb.Empty,
  /**
   * @param {!proto.fayment.SwitchGroupReq} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  base_pb.Empty.deserializeBinary
);


/**
 * @param {!proto.fayment.SwitchGroupReq} request The
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
 * @param {!proto.fayment.SwitchGroupReq} request The
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


module.exports = proto.fayment;

