package com.scamawareness.lambda;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyRequestEvent;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyResponseEvent;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.sns.SnsClient;
import software.amazon.awssdk.services.sns.model.PublishRequest;
import software.amazon.awssdk.services.sns.model.PublishResponse;

import java.util.Map;

public class ScamAlertHandler implements RequestHandler<APIGatewayProxyRequestEvent, APIGatewayProxyResponseEvent> {

    private final SnsClient snsClient = SnsClient.builder().region(Region.US_EAST_1).build();
    private final ObjectMapper mapper = new ObjectMapper();
    private final String topicArn = System.getenv("SNS_TOPIC_ARN");

    @Override
    public APIGatewayProxyResponseEvent handleRequest(APIGatewayProxyRequestEvent input, Context context) {
        Map<String, String> headers = Map.of(
                "Access-Control-Allow-Origin", "*",
                "Access-Control-Allow-Headers", "*",
                "Access-Control-Allow-Methods", "POST,OPTIONS",
                "Content-Type", "application/json"
        );

        if ("OPTIONS".equalsIgnoreCase(input.getHttpMethod())) {
            return new APIGatewayProxyResponseEvent().withStatusCode(200).withHeaders(headers).withBody("");
        }

        try {
            JsonNode json = mapper.readTree(input.getBody());
            String title = json.has("title") ? json.get("title").asText() : "Urgent Scam Warning";
            String description = json.has("description") ? json.get("description").asText() : "A new scam campaign was reported.";

            String emailBody = "COMMUNITY SCAM ALERT\n\nTitle: " + title + "\nDetails: " + description + "\n\nStay alert!";

            PublishResponse response = snsClient.publish(PublishRequest.builder()
                    .topicArn(topicArn)
                    .subject("Alert: " + (title.length() > 50 ? title.substring(0, 47) + "..." : title))
                    .message(emailBody)
                    .build());

            return new APIGatewayProxyResponseEvent()
                    .withStatusCode(200)
                    .withHeaders(headers)
                    .withBody("{\"message\":\"Broadcast sent\",\"messageId\":\"" + response.messageId() + "\"}");
        } catch (Exception e) {
            return new APIGatewayProxyResponseEvent()
                    .withStatusCode(500)
                    .withHeaders(headers)
                    .withBody("{\"error\":\"" + e.getMessage() + "\"}");
        }
    }
}
