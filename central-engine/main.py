import ast
from typing import List
import json
import uvicorn
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import grpc
import sys

import os

sys.path.append("../qualityOfLife-ms/")
from app.controllers import project_controller, stakeholder_controller, task_controller, site_controller
import regulatoryComplianceMS_pb2, regulatoryComplianceMS_pb2_grpc, qualityOfLifeMS_pb2_grpc, qualityOfLifeMS_pb2, siteSelectionMS_pb2_grpc, siteSelectionMS_pb2

sys.path.append("../siteSelection-ms/")
sys.path.append("../regulatoryCompliance-ms/")
import siteSelectionMS_pb2_grpc
import siteSelectionMS_pb2
from app.controllers import project_controller, stakeholder_controller, task_controller, site_controller
import regulatoryComplianceMS_pb2
import regulatoryComplianceMS_pb2_grpc


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=[""],
)

app.include_router(project_controller.router, prefix="/project")
app.include_router(stakeholder_controller.router, prefix="/stakeholder")
app.include_router(task_controller.router, prefix="/task")
app.include_router(site_controller.router, prefix="/site")


@app.post("/rank", response_model=List[str])
def get_rank(locations: List[str]):
    nlocs = ""
    for location in locations:
        nlocs = location + "," + nlocs
    
    response = None  # Initialize response to None
    
    # First gRPC call to qualityOfLifeMS
    with grpc.insecure_channel('localhost:50051') as channel:
        stub = qualityOfLifeMS_pb2_grpc.qualityOfLifeMSStub(channel)
        try:
            print("Retrieving the response from a getEnvironment")
            response = stub.getEnv(qualityOfLifeMS_pb2.rankreq(locations=nlocs))
            print("RANKING:" + response.rankings)
            print("DONE RANKING")
        except grpc.RpcError as e:
            print("Error: ", e.details())
    
    # Check if response was successfully received
    if response is None:
        raise HTTPException(status_code=500, detail="Failed to retrieve rankings from qualityOfLifeMS")
    
    # Second gRPC call to regulatoryComplianceMS
    with grpc.insecure_channel('localhost:50052') as channel:
        LMS_stub = regulatoryComplianceMS_pb2_grpc.regulatoryComplianceMSStub(channel)
        try:
            LMS_response_str = LMS_stub.getLocations(regulatoryComplianceMS_pb2.Locations(locations=nlocs))
            LMS_response = LMS_response_str.status.split(',')  # Expected: 1D array of available locations
            print("legal locations: " + str(LMS_response))
        except grpc.RpcError as e:
            if e.code() == grpc.StatusCode.NOT_FOUND:
                raise HTTPException(status_code=404, detail='Response not found')
    
    # Third gRPC call to siteSelectionMS
    with grpc.insecure_channel('localhost:50053') as channel:
        prox_stub = siteSelectionMS_pb2_grpc.siteSelectionMSStub(channel)
        try:
            print("Retrieving the response from a serialReq")
            proxResponse = prox_stub.getCommute(siteSelectionMS_pb2.rankProxRequest(rankPlease=str(nlocs)))
            print("Thinking")
            print("RANKING:" + proxResponse.rankedAreas)
            print("DONE RANKING")
        except grpc.RpcError as e:
            print("Error: ", e.details())
    
    # Check that proxResponse is valid before continuing
    if not proxResponse or not proxResponse.rankedAreas:
        raise HTTPException(status_code=500, detail="Failed to retrieve rankings from siteSelectionMS")
    
    # Convert the string into an actual list of tuples
    data_list1 = ast.literal_eval(response.rankings)
    data_list2 = ast.literal_eval(proxResponse.rankedAreas)

    combined_tuples = []
    print(f"response ranking: {response.rankings}")
    print(f"ranked areas = {proxResponse.rankedAreas}")
    
    for (location1, value1), (location2, value2) in zip(data_list1, data_list2):
        combined_value = value1 + value2
        combined_tuples.append((location1, combined_value))

    # Sort the combined_tuples based on the combined values in ascending order
    sorted_combined_tuples = sorted(combined_tuples, key=lambda x: x[1])
    print("sorted(ASC) combined tuples: " + str(sorted_combined_tuples))

    # Extract the locations from the sorted_combined_tuples in descending order
    sorted_locations = [location for location, _ in sorted_combined_tuples[::-1]]
    print("sorted locations: " + str(sorted_locations))

    # Filter out illegal locations based on the LMS response
    for location in sorted_locations[:]:
        if LMS_response.count(location) == 0:
            sorted_locations.remove(location)
    
    print("sorted + removed illegal locations: " + str(sorted_locations))

    return sorted_locations



load_dotenv(dotenv_path='./app/config/.env')

if __name__ == "__main__":
    uvicorn.run(
        app="main:app",
        reload=True if os.environ.get("ENVIRONMENT") == "dev" else False,
        workers=1,
    )
