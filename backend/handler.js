"use strict";

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
} from "@aws-sdk/lib-dynamodb";
import { z } from "zod";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

const PageContentSchema = z.object({
  content: z.string().max(1000),
});

export const main = async (event) => {
  console.log("Gelen istek:", JSON.stringify(event, null, 2));

  const routeKey = `${event.requestContext.http.method} ${event.requestContext.http.path}`;

  try {
    if (routeKey.startsWith("GET /page/")) {
      const username = event.pathParameters.username;

      const command = new GetCommand({
        TableName: "user-pages",
        Key: {
          username: username,
        },
      });
      const response = await docClient.send(command);

      if (response.Item) {
        return {
          statusCode: 200,
          body: JSON.stringify(response.Item),
        };
      } else {
        return {
          statusCode: 404,
          body: JSON.stringify({
            message: "Bu kullanıcıya ait sayfa bulunamadı.",
          }),
        };
      }
    }

    if (routeKey === "POST /page") {
      const cognitoUsername =
        event.requestContext.authorizer?.jwt.claims.username;

      if (!cognitoUsername) {
        return {
          statusCode: 401,
          body: JSON.stringify({ message: "Yetkisiz işlem." }),
        };
      }

      const requestBody = JSON.parse(event.body);
      const validationResult = PageContentSchema.safeParse(requestBody);

      if (!validationResult.success) {
        return {
          statusCode: 400,
          body: JSON.stringify({
            message: "Geçersiz veri.",
            errors: validationResult.error.issues,
          }),
        };
      }

      const command = new PutCommand({
        TableName: "user-pages",
        Item: {
          username: cognitoUsername,
          content: validationResult.data.content,
          lastUpdatedAt: new Date().toISOString(),
        },
      });
      await docClient.send(command);

      return {
        statusCode: 200,
        body: JSON.stringify({ message: "Sayfa başarıyla güncellendi." }),
      };
    }

    return {
      statusCode: 404,
      body: JSON.stringify({ message: "Endpoint bulunamadı." }),
    };
  } catch (error) {
    console.error("Hata:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Sunucuda bir hata oluştu." }),
    };
  }
};
