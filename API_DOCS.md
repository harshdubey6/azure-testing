# API Documentation

## Base URL
```
http://localhost:3000/api
```

## Authentication
No authentication required for this version. For production, implement JWT or session-based auth.

---

## Endpoints

### 1. Get All Todos
Retrieve a list of all todos, sorted by creation date (newest first).

**Endpoint:** `GET /todos`

**Request:**
```bash
curl http://localhost:3000/api/todos
```

**Response (200 OK):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Learn Next.js",
    "description": "Complete the Next.js tutorial",
    "completed": false,
    "createdAt": "2024-03-24T10:00:00.000Z",
    "updatedAt": "2024-03-24T10:00:00.000Z"
  },
  {
    "_id": "507f1f77bcf86cd799439012",
    "title": "Build a project",
    "description": "Create a full-stack application",
    "completed": true,
    "createdAt": "2024-03-23T15:30:00.000Z",
    "updatedAt": "2024-03-24T09:00:00.000Z"
  }
]
```

**Error Response (500 Internal Server Error):**
```json
{
  "error": "Failed to fetch todos"
}
```

---

### 2. Create a Todo
Create a new todo item with title and optional description.

**Endpoint:** `POST /todos`

**Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "Learn Next.js",
  "description": "Complete the tutorial"
}
```

**Response (201 Created):**
```json
{
  "_id": "507f1f77bcf86cd799439013",
  "title": "Learn Next.js",
  "description": "Complete the tutorial",
  "completed": false,
  "createdAt": "2024-03-24T10:15:00.000Z",
  "updatedAt": "2024-03-24T10:15:00.000Z"
}
```

**cURL Example:**
```bash
curl -X POST http://localhost:3000/api/todos \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Learn Next.js",
    "description": "Complete the tutorial"
  }'
```

**Error Responses:**

400 Bad Request (missing title):
```json
{
  "error": "Title is required"
}
```

500 Internal Server Error:
```json
{
  "error": "Failed to create todo"
}
```

**Validation Rules:**
- `title` (required): String, max 100 characters
- `description` (optional): String, max 500 characters

---

### 3. Update a Todo
Update an existing todo's title, description, or completion status.

**Endpoint:** `PATCH /todos/{id}`

**Headers:**
```
Content-Type: application/json
```

**Path Parameters:**
- `id` (required): MongoDB ObjectId of the todo

**Request Body:**
```json
{
  "title": "Updated title",
  "description": "Updated description",
  "completed": true
}
```

**Response (200 OK):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "title": "Updated title",
  "description": "Updated description",
  "completed": true,
  "createdAt": "2024-03-24T10:00:00.000Z",
  "updatedAt": "2024-03-24T10:30:00.000Z"
}
```

**cURL Example:**
```bash
curl -X PATCH http://localhost:3000/api/todos/507f1f77bcf86cd799439011 \
  -H "Content-Type: application/json" \
  -d '{
    "completed": true
  }'
```

**Error Responses:**

400 Bad Request (invalid ID):
```json
{
  "error": "Invalid todo ID"
}
```

404 Not Found:
```json
{
  "error": "Todo not found"
}
```

500 Internal Server Error:
```json
{
  "error": "Failed to update todo"
}
```

**Update Options:**
You can update any combination of fields:
```json
// Update only completion status
{"completed": true}

// Update title and description
{"title": "New title", "description": "New description"}

// Update all fields
{"title": "New", "description": "Desc", "completed": false}
```

---

### 4. Delete a Todo
Delete a todo by its ID.

**Endpoint:** `DELETE /todos/{id}`

**Path Parameters:**
- `id` (required): MongoDB ObjectId of the todo

**Response (200 OK):**
```json
{
  "message": "Todo deleted successfully"
}
```

**cURL Example:**
```bash
curl -X DELETE http://localhost:3000/api/todos/507f1f77bcf86cd799439011
```

**Error Responses:**

400 Bad Request (invalid ID):
```json
{
  "error": "Invalid todo ID"
}
```

404 Not Found:
```json
{
  "error": "Todo not found"
}
```

500 Internal Server Error:
```json
{
  "error": "Failed to delete todo"
}
```

---

## Response Status Codes

| Code | Meaning | Example Scenario |
|------|---------|------------------|
| 200 | OK | Successful GET, PATCH, DELETE |
| 201 | Created | Successful POST |
| 400 | Bad Request | Invalid ID format, missing required field |
| 404 | Not Found | Todo ID doesn't exist |
| 500 | Internal Server Error | Database connection error, server issue |

---

## Data Types

### Todo Object
```typescript
{
  _id: string          // MongoDB ObjectId as string
  title: string        // 1-100 characters
  description: string  // 0-500 characters (optional)
  completed: boolean   // true or false
  createdAt: string    // ISO 8601 datetime
  updatedAt: string    // ISO 8601 datetime
}
```

---

## Example Workflow

```bash
# 1. Create a todo
curl -X POST http://localhost:3000/api/todos \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Buy groceries",
    "description": "Milk, eggs, bread"
  }'

# Response: {"_id": "123abc", "title": "Buy groceries", ...}

# 2. Get all todos
curl http://localhost:3000/api/todos

# 3. Update todo (mark as complete)
curl -X PATCH http://localhost:3000/api/todos/123abc \
  -H "Content-Type: application/json" \
  -d '{"completed": true}'

# 4. Delete todo
curl -X DELETE http://localhost:3000/api/todos/123abc
```

---

## Error Handling

All error responses follow this format:
```json
{
  "error": "Description of what went wrong"
}
```

**Common Issues:**

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check `.env.local` has correct connection string

2. **Invalid ObjectId**
   - ObjectId must be a valid 24-character hex string
   - Example valid ID: `507f1f77bcf86cd799439011`

3. **Network Errors**
   - Ensure server is running (`npm run dev`)
   - Check URLs are correct
   - Verify port 3000 is not blocked

---

## Testing with Postman

1. Open Postman
2. Create requests for each endpoint
3. Set method and URL
4. For POST/PATCH: Add raw JSON body
5. Send and check response

### Postman Collection JSON
```json
{
  "info": {
    "name": "Todo API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Get Todos",
      "method": "GET",
      "url": "{{baseUrl}}/api/todos"
    },
    {
      "name": "Create Todo",
      "method": "POST",
      "url": "{{baseUrl}}/api/todos",
      "body": {
        "mode": "raw",
        "raw": "{\"title\": \"New task\", \"description\": \"Description\"}"
      }
    },
    {
      "name": "Update Todo",
      "method": "PATCH",
      "url": "{{baseUrl}}/api/todos/:id",
      "body": {
        "mode": "raw",
        "raw": "{\"completed\": true}"
      }
    },
    {
      "name": "Delete Todo",
      "method": "DELETE",
      "url": "{{baseUrl}}/api/todos/:id"
    }
  ]
}
```

---

## Rate Limiting

Not implemented in this version. For production, add rate limiting middleware.

## CORS

Not configured in this version. Requests from same origin (localhost:3000) work by default.

---

## Versioning

Current API Version: **1.0**
No breaking changes planned.
