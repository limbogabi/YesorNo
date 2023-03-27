import { Api, use } from "sst/constructs";
import { StorageStack } from "./StorageStack";

export function ApiStack({ stack, app }) {
  const { table } = use(StorageStack);

  // Create the API
  const api = new Api(stack, "Api", {
    defaults: {
      authorizer: "iam",
      function: {
        environment: {
            STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
          },
        bind: [table],
      },
    },
    routes: {
      "GET /quests": "packages/functions/src/list.main",
      "POST /quests": "packages/functions/src/create.main",
      "GET /quests/{id}": "packages/functions/src/get.main",
      "PUT /quests/{id}": "packages/functions/src/update.main",
      "DELETE /quests/{id}": "packages/functions/src/delete.main",
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
