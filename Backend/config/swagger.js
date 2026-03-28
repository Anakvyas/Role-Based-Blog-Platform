const swaggerSpec = {
  openapi: "3.0.0",
  info: {
    title: "Role-Based Blog Platform API",
    version: "1.0.0",
    description:
      "REST API for authentication, role-based access control, and blog CRUD operations.",
  },
  servers: [
    {
      url: "http://localhost:3000/api/v1",
      description: "Local development server",
    },
  ],
  tags: [
    { name: "Auth", description: "Authentication and session endpoints" },
    { name: "Blogs", description: "Blog CRUD endpoints" },
  ],
  components: {
    securitySchemes: {
      cookieAuth: {
        type: "apiKey",
        in: "cookie",
        name: "token",
      },
    },
    schemas: {
      SignupRequest: {
        type: "object",
        required: ["username", "email", "password"],
        properties: {
          username: { type: "string", example: "john" },
          email: { type: "string", format: "email", example: "john@example.com" },
          password: { type: "string", example: "secret123" },
        },
      },
      LoginRequest: {
        type: "object",
        required: ["email", "password", "role"],
        properties: {
          email: { type: "string", format: "email", example: "admin@example.com" },
          password: { type: "string", example: "Admin@123" },
          role: { type: "string", enum: ["user", "admin"], example: "admin" },
        },
      },
      BlogRequest: {
        type: "object",
        required: ["title", "text"],
        properties: {
          title: { type: "string", example: "How backend systems scale" },
          text: {
            type: "string",
            example:
              "A scalable backend is built around clean boundaries, observability, and modular services.",
          },
        },
      },
      Blog: {
        type: "object",
        properties: {
          _id: { type: "string", example: "661f1f77f3a4b9a2e1234567" },
          title: { type: "string", example: "How backend systems scale" },
          text: { type: "string", example: "A scalable backend is..." },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" },
        },
      },
    },
  },
  paths: {
    "/auth/signup": {
      post: {
        tags: ["Auth"],
        summary: "Register a new user",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/SignupRequest" },
            },
          },
        },
        responses: {
          201: { description: "User created successfully" },
          409: { description: "User already exists" },
        },
      },
    },
    "/auth/login": {
      post: {
        tags: ["Auth"],
        summary: "Login a user or admin",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/LoginRequest" },
            },
          },
        },
        responses: {
          200: { description: "Login successful" },
          401: { description: "Wrong password" },
          404: { description: "User not found" },
        },
      },
    },
    "/auth/logout": {
      post: {
        tags: ["Auth"],
        summary: "Logout the current user",
        security: [{ cookieAuth: [] }],
        responses: {
          200: { description: "Logged out successfully" },
          401: { description: "Not logged in" },
        },
      },
    },
    "/auth/me": {
      get: {
        tags: ["Auth"],
        summary: "Get the currently authenticated user",
        security: [{ cookieAuth: [] }],
        responses: {
          200: { description: "Authenticated user details returned" },
          401: { description: "Invalid or missing token" },
        },
      },
    },
    "/blogs": {
      get: {
        tags: ["Blogs"],
        summary: "Get all blogs",
        security: [{ cookieAuth: [] }],
        responses: {
          200: { description: "Blogs fetched successfully" },
        },
      },
      post: {
        tags: ["Blogs"],
        summary: "Create a blog (admin only)",
        security: [{ cookieAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/BlogRequest" },
            },
          },
        },
        responses: {
          201: { description: "Blog created successfully" },
          403: { description: "Admin only" },
        },
      },
    },
    "/blogs/{id}": {
      put: {
        tags: ["Blogs"],
        summary: "Update a blog (admin only)",
        security: [{ cookieAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/BlogRequest" },
            },
          },
        },
        responses: {
          200: { description: "Blog updated successfully" },
          403: { description: "Admin only" },
          404: { description: "Blog not found" },
        },
      },
      delete: {
        tags: ["Blogs"],
        summary: "Delete a blog (admin only)",
        security: [{ cookieAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          200: { description: "Blog deleted successfully" },
          403: { description: "Admin only" },
          404: { description: "Blog not found" },
        },
      },
    },
  },
};

export default swaggerSpec;
