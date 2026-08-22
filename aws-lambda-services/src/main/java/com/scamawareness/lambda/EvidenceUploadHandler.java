package com.scamawareness.lambda;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyRequestEvent;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyResponseEvent;
import com.fasterxml.jackson.databind.ObjectMapper;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.presigner.S3Presigner;
import software.amazon.awssdk.services.s3.presigner.model.PresignedPutObjectRequest;
import software.amazon.awssdk.services.s3.presigner.model.PutObjectPresignRequest;

import java.time.Duration;
import java.util.HashMap;
import java.util.Map;

public class EvidenceUploadHandler implements RequestHandler<APIGatewayProxyRequestEvent, APIGatewayProxyResponseEvent> {

    private final S3Presigner presigner = S3Presigner.builder().region(Region.US_EAST_1).build();
    private final ObjectMapper mapper = new ObjectMapper();
    private final String bucketName = System.getenv("BUCKET_NAME");

    @Override
    public APIGatewayProxyResponseEvent handleRequest(APIGatewayProxyRequestEvent input, Context context) {
        Map<String, String> headers = Map.of(
                "Access-Control-Allow-Origin", "*",
                "Access-Control-Allow-Headers", "*",
                "Access-Control-Allow-Methods", "GET,OPTIONS",
                "Content-Type", "application/json"
        );

        try {
            Map<String, String> queryParams = input.getQueryStringParameters();
            String fileName = (queryParams != null && queryParams.containsKey("fileName")) 
                    ? queryParams.get("fileName") : "evidence_" + System.currentTimeMillis() + ".png";
            String fileType = (queryParams != null && queryParams.containsKey("fileType")) 
                    ? queryParams.get("fileType") : "image/png";
            String s3Key = "evidence/" + fileName;

            PutObjectRequest objectRequest = PutObjectRequest.builder()
                    .bucket(bucketName)
                    .key(s3Key)
                    .contentType(fileType)
                    .build();

            PutObjectPresignRequest presignRequest = PutObjectPresignRequest.builder()
                    .signatureDuration(Duration.ofMinutes(5))
                    .putObjectRequest(objectRequest)
                    .build();

            PresignedPutObjectRequest presignedResponse = presigner.presignPutObject(presignRequest);

            Map<String, String> responseBody = new HashMap<>();
            responseBody.put("uploadUrl", presignedResponse.url().toString());
            responseBody.put("fileKey", s3Key);

            return new APIGatewayProxyResponseEvent()
                    .withStatusCode(200)
                    .withHeaders(headers)
                    .withBody(mapper.writeValueAsString(responseBody));
        } catch (Exception e) {
            return new APIGatewayProxyResponseEvent()
                    .withStatusCode(500)
                    .withHeaders(headers)
                    .withBody("{\"error\":\"" + e.getMessage() + "\"}");
        }
    }
}
