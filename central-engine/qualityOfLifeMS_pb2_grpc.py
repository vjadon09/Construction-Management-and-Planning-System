# Generated by the gRPC Python protocol compiler plugin. DO NOT EDIT!
"""Client and server classes corresponding to protobuf-defined services."""
import grpc
import warnings

import qualityOfLifeMS_pb2 as protos_dot_qualityOfLifeMS__pb2

GRPC_GENERATED_VERSION = '1.70.0'
GRPC_VERSION = grpc.__version__
_version_not_supported = False

try:
    from grpc._utilities import first_version_is_lower
    _version_not_supported = first_version_is_lower(GRPC_VERSION, GRPC_GENERATED_VERSION)
except ImportError:
    _version_not_supported = True

if _version_not_supported:
    raise RuntimeError(
        f'The grpc package installed is at version {GRPC_VERSION},'
        + f' but the generated code in protos/qualityOfLifeMS_pb2_grpc.py depends on'
        + f' grpcio>={GRPC_GENERATED_VERSION}.'
        + f' Please upgrade your grpc module to grpcio>={GRPC_GENERATED_VERSION}'
        + f' or downgrade your generated code using grpcio-tools<={GRPC_VERSION}.'
    )


class qualityOfLifeMSStub(object):
    """Missing associated documentation comment in .proto file."""

    def __init__(self, channel):
        """Constructor.

        Args:
            channel: A grpc.Channel.
        """
        self.getEnv = channel.unary_unary(
                '/qualityOfLifeMS/getEnv',
                request_serializer=protos_dot_qualityOfLifeMS__pb2.rankreq.SerializeToString,
                response_deserializer=protos_dot_qualityOfLifeMS__pb2.ranking.FromString,
                _registered_method=True)
        self.getWalk = channel.unary_unary(
                '/qualityOfLifeMS/getWalk',
                request_serializer=protos_dot_qualityOfLifeMS__pb2.rankreq.SerializeToString,
                response_deserializer=protos_dot_qualityOfLifeMS__pb2.ranking.FromString,
                _registered_method=True)
        self.getBoth = channel.unary_unary(
                '/qualityOfLifeMS/getBoth',
                request_serializer=protos_dot_qualityOfLifeMS__pb2.rankreq.SerializeToString,
                response_deserializer=protos_dot_qualityOfLifeMS__pb2.ranking.FromString,
                _registered_method=True)


class qualityOfLifeMSServicer(object):
    """Missing associated documentation comment in .proto file."""

    def getEnv(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')

    def getWalk(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')

    def getBoth(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')


def add_qualityOfLifeMSServicer_to_server(servicer, server):
    rpc_method_handlers = {
            'getEnv': grpc.unary_unary_rpc_method_handler(
                    servicer.getEnv,
                    request_deserializer=protos_dot_qualityOfLifeMS__pb2.rankreq.FromString,
                    response_serializer=protos_dot_qualityOfLifeMS__pb2.ranking.SerializeToString,
            ),
            'getWalk': grpc.unary_unary_rpc_method_handler(
                    servicer.getWalk,
                    request_deserializer=protos_dot_qualityOfLifeMS__pb2.rankreq.FromString,
                    response_serializer=protos_dot_qualityOfLifeMS__pb2.ranking.SerializeToString,
            ),
            'getBoth': grpc.unary_unary_rpc_method_handler(
                    servicer.getBoth,
                    request_deserializer=protos_dot_qualityOfLifeMS__pb2.rankreq.FromString,
                    response_serializer=protos_dot_qualityOfLifeMS__pb2.ranking.SerializeToString,
            ),
    }
    generic_handler = grpc.method_handlers_generic_handler(
            'qualityOfLifeMS', rpc_method_handlers)
    server.add_generic_rpc_handlers((generic_handler,))
    server.add_registered_method_handlers('qualityOfLifeMS', rpc_method_handlers)


 # This class is part of an EXPERIMENTAL API.
class qualityOfLifeMS(object):
    """Missing associated documentation comment in .proto file."""

    @staticmethod
    def getEnv(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(
            request,
            target,
            '/qualityOfLifeMS/getEnv',
            protos_dot_qualityOfLifeMS__pb2.rankreq.SerializeToString,
            protos_dot_qualityOfLifeMS__pb2.ranking.FromString,
            options,
            channel_credentials,
            insecure,
            call_credentials,
            compression,
            wait_for_ready,
            timeout,
            metadata,
            _registered_method=True)

    @staticmethod
    def getWalk(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(
            request,
            target,
            '/qualityOfLifeMS/getWalk',
            protos_dot_qualityOfLifeMS__pb2.rankreq.SerializeToString,
            protos_dot_qualityOfLifeMS__pb2.ranking.FromString,
            options,
            channel_credentials,
            insecure,
            call_credentials,
            compression,
            wait_for_ready,
            timeout,
            metadata,
            _registered_method=True)

    @staticmethod
    def getBoth(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(
            request,
            target,
            '/qualityOfLifeMS/getBoth',
            protos_dot_qualityOfLifeMS__pb2.rankreq.SerializeToString,
            protos_dot_qualityOfLifeMS__pb2.ranking.FromString,
            options,
            channel_credentials,
            insecure,
            call_credentials,
            compression,
            wait_for_ready,
            timeout,
            metadata,
            _registered_method=True)
