import { Table } from "sst/constructs";

export function StorageStack({ stack, app }) {
  // Create the DynamoDB table
  const table = new Table(stack, "Quests", {
    fields: {
      userId: "string",
      questId: "string",
    },
    primaryIndex: { partitionKey: "userId", sortKey: "questId" },
  });

  return {
    table,
  };
}