import { Table } from "sst/node/table";
import handler from "@yesorno/core/handler";
import dynamoDb from "@yesorno/core/dynamodb";

export const main = handler(async (event) => {
  const params = {
    TableName: Table.Quests.tableName,
    // 'Key' defines the partition key and sort key of the item to be retrieved
    Key: {
      userId: "123", // The id of the author
      questId: event.pathParameters.id, // The id of the quest from the path
    },
  };

  const result = await dynamoDb.get(params);
  if (!result.Item) {
    throw new Error("Item not found.");
  }

  // Return the retrieved item
  return result.Item;
});