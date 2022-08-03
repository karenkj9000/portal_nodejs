const APP_CONSTANTS = {
  apiPrefix: "/api",
  params: "params",
  query: "query",
  body: "body",
  authorizationHeader: "Authorization",
  bearer: "Bearer",
  basePath: `http://localhost:${process.env.PORT}`,

  // Add the short name of the service below
  service: "employee-app",
};

export default APP_CONSTANTS;

export const ROLES = {
  admin: "admin",
  developer: "developer",
  hr: "hr",
};
