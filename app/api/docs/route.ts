import { NextResponse } from "next/server";

const openapiSpec = {
  openapi: "3.0.0",
  info: {
    title: "NextUp API",
    version: "1.0.0",
    description: "API documentation for NextUp streaming platform",
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Development server",
    },
  ],
  paths: {
    "/api/streams": {
      post: {
        summary: "Create a new stream",
        description: "Creates a new YouTube stream entry",
        tags: ["Streams"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["creatorId", "url"],
                properties: {
                  creatorId: {
                    type: "string",
                    description: "UUID of the user creating the stream",
                  },
                  url: {
                    type: "string",
                    format: "uri",
                    description: "YouTube URL (youtube.com/watch?v= or youtu.be/)",
                  },
                },
                example: {
                  creatorId: "123e4567-e89b-12d3-a456-426614174000",
                  url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                },
              },
            },
          },
        },
        responses: {
          "201": {
            description: "Stream created successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    id: { type: "string" },
                    type: { type: "string", enum: ["Youtube", "Spotify"] },
                    url: { type: "string" },
                    extractedId: { type: "string" },
                    active: { type: "boolean" },
                    UserId: { type: "string" },
                  },
                },
              },
            },
          },
          "400": {
            description: "Invalid request - invalid URL, validation error, or could not extract video ID",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: { 
                      type: "string",
                      examples: [
                        "Invalid YouTube URL or could not extract video ID",
                        "Invalid request data"
                      ]
                    },
                    errors: { 
                      type: "array",
                      description: "Validation errors (only present for Zod validation errors)",
                      items: { type: "object" }
                    },
                  },
                  example: {
                    message: "Invalid YouTube URL or could not extract video ID"
                  },
                },
              },
            },
          },
          "404": {
            description: "User not found - the creatorId does not exist in the database",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: { 
                      type: "string",
                      example: "User not found"
                    },
                    error: {
                      type: "string",
                      example: "No user found with ID: 123e4567-e89b-12d3-a456-426614174000"
                    },
                  },
                  example: {
                    message: "User not found",
                    error: "No user found with ID: 123e4567-e89b-12d3-a456-426614174000"
                  },
                },
              },
            },
          },
          "500": {
            description: "Internal server error - database error, user not found, or other server issues",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: { 
                      type: "string",
                      example: "Error While adding a stream"
                    },
                    error: {
                      type: "string",
                      description: "Detailed error message",
                      example: "User not found or database connection error"
                    },
                    errorType: {
                      type: "string",
                      description: "Type of error",
                      example: "PrismaClientKnownRequestError"
                    },
                  },
                  example: {
                    message: "Error While adding a stream",
                    error: "Foreign key constraint failed on the field: UserId",
                    errorType: "PrismaClientKnownRequestError"
                  },
                },
              },
            },
          },
        },
      },
    },
    "/api/streams/upvote": {
      post: {
        summary: "Upvote a stream",
        description: "Add an upvote to a stream (requires authentication)",
        tags: ["Upvotes"],
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["streamId"],
                properties: {
                  streamId: {
                    type: "string",
                    description: "UUID of the stream to upvote",
                  },
                },
                example: {
                  streamId: "123e4567-e89b-12d3-a456-426614174000",
                },
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Upvote created successfully",
          },
          "401": {
            description: "Unauthorized - user not authenticated",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: { type: "string" },
                  },
                },
              },
            },
          },
          "500": {
            description: "Internal server error",
          },
        },
      },
      get: {
        summary: "Get streams by creator",
        description: "Retrieve all streams created by a specific user",
        tags: ["Streams"],
        parameters: [
          {
            name: "creatorId",
            in: "query",
            required: true,
            schema: {
              type: "string",
            },
            description: "UUID of the creator",
          },
        ],
        responses: {
          "200": {
            description: "List of streams",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    streams: {
                      type: "array",
                      items: {
                        type: "object",
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/api/streams/downvote": {
      post: {
        summary: "Remove upvote (downvote)",
        description: "Remove an upvote from a stream (requires authentication)",
        tags: ["Upvotes"],
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["streamId"],
                properties: {
                  streamId: {
                    type: "string",
                    description: "UUID of the stream to remove upvote from",
                  },
                },
                example: {
                  streamId: "123e4567-e89b-12d3-a456-426614174000",
                },
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Upvote removed successfully",
          },
          "401": {
            description: "Unauthorized - user not authenticated",
          },
          "500": {
            description: "Internal server error",
          },
        },
      },
    },
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  tags: [
    {
      name: "Streams",
      description: "Stream management endpoints",
    },
    {
      name: "Upvotes",
      description: "Upvote management endpoints",
    },
  ],
};

export async function GET() {
  return NextResponse.json(openapiSpec);
}


