**Testing grpc: testing_grpc.py (client side)**

    import regulatoryComplianceMS_pb2_grpc
    import regulatoryComplianceMS_pb2
    import grpc
    
    # Create a gRPC channel and stub
    channel = grpc.insecure_channel("localhost:50051")
    stub = regulatoryComplianceMS_pb2_grpc.regulatoryComplianceMSStub(channel)
    
    def getLocation(locations_str):
    
        result = stub.getLocations(regulatoryComplianceMS_pb2.Locations(locations=locations_str))
        return result
    
    if __name__ == "__main__":
        returnVal = getLocation('Queen Street West', 'Dundas West', 'The Beaches', 'Eglinton East')
        print(returnVal)
