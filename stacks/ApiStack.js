import { Api, use } from "@serverless-stack/resources";
import { StorageStack } from "./StorageStack";

export function ApiStack({ stack, app }) {
  const { table } = use(StorageStack);

  // Create the API
  const api = new Api(stack, "Api", {
    defaults: {
      function: {
        permissions: [table],
        environment: {
          TABLE_NAME: table.tableName,
        },
      },
    },
    routes: {
        "GET /quests": "functions/list.main",
      "POST /quests": "functions/create.main",
      "GET /quests/{id}": "functions/get.main",
      "PUT /quests/{id}": "functions/update.main",
      "DELETE /quests/{id}": "functions/delete.main",
     

    },
  });

  // Show the API endpoint in the output
  stack.addOutputs({
    ApiEndpoint: api.url,
  });

  // Return the API resource
  return {
    api,
  };
}
