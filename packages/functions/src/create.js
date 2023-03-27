import { Table } from "sst/node/table";
import * as uuid from "uuid";
import handler from "@yesorno/core/handler";
import dynamoDb from "@yesorno/core/dynamodb";

export const main = handler(async (event) => {
  const data = JSON.parse(event.body);
  const params = {
    TableName: Table.Quests.tableName,
    Item: {
      // The attributes of the item to be created
      userId: "123", // The id of the author
      questId: uuid.v1(), // A unique uuid
      content: data.content, // Parsed from request body
      attachment: data.attachment, // Parsed from request body
      createdAt: Date.now(), // Current Unix timestamp
    },
  };

  await dynamoDb.put(params);

  return params.Item;
});