// for AdonisJS v6
import path from "node:path";
import url from "node:url";
// ---

export default {
  // path: __dirname + "/../", for AdonisJS v5
  path: path.dirname(url.fileURLToPath(import.meta.url)) + "/../", // for AdonisJS v6
  title: "Recipe App", // use info instead
  version: "1.0.0", // use info instead
  description: "", // use info instead
  tagIndex: 2,
  info: {
    title: "Recipe App",
    version: "1.0.0",
    description: "Welcome to the Recipe App project! This application is designed to revolutionize the way we explore and manage recipes. Powered by AdonisJS, it combines robust backend capabilities with a seamless user experience."
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT"
      }
    }
  },
  snakeCase: true,

  debug: false, // set to true, to get some useful debug output
  ignore: ["/swagger", "/docs"],
  preferredPutPatch: "PUT", // if PUT/PATCH are provided for the same route, prefer PUT
  common: {
    parameters: {}, // OpenAPI conform parameters that are commonly used
    headers: {} // OpenAPI conform headers that are commonly used
  },
  securitySchemes: {
    ApiKeyAuth: {
      "type": "apiKey",
      "in": "header",
      "name": "X-API-Key"
    }
  }, // optional
  authMiddlewares: ["auth", "auth:api"], // optional
  defaultSecurityScheme: "BearerAuth", // optional
  persistAuthorization: true, // persist authorization between reloads on the swagger page
  showFullPath: false // the path displayed after endpoint summary
};
