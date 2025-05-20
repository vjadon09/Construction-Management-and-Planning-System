import grpc
import regulatoryComplianceMS_pb2
import regulatoryComplianceMS_pb2_grpc
import regulatoryComplianceMS_dataset
import logging
from concurrent import futures


class RegulatoryComplianceMS(regulatoryComplianceMS_pb2_grpc.regulatoryComplianceMSServicer):
    def getLocations(self, request, context):
        result = regulatoryComplianceMS_dataset.get_location_access_type(request.locations)  # expected : string
        return regulatoryComplianceMS_pb2.LocationStatus(status=result)

    def availableLocations(self, request, context):
        result_arr = regulatoryComplianceMS_dataset.get_avail_locations()  # expected: string
        return regulatoryComplianceMS_pb2.LocationReply(availLocations=result_arr)


def serve():
    # create grpc server
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))

    regulatoryComplianceMS_pb2_grpc.add_regulatoryComplianceMSServicer_to_server(RegulatoryComplianceMS(), server)

    # assign a port
    server.add_insecure_port('[::]:50052')  # port number yet to be decided
    server.start()
    logging.info("RegulatoryComplianceMS Server started on port 50051")
    server.wait_for_termination()


if __name__ == "__main__":
    # start grpc server
    logging.basicConfig()
    print("starting server")
    serve()
