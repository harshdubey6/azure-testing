# Todo Application

A modern, full-stack todo list application built with Next.js, React, TypeScript, Tailwind CSS, and MongoDB.

## Features

✨ **Complete CRUD Operations**
- **Create**: Add new todos with title and description
- **Read**: View all todos with completion status
- **Update**: Mark todos as complete/incomplete
- **Delete**: Remove todos with confirmation

🎨 **Beautiful Design**
- Modern gradient UI with Tailwind CSS
- Responsive design for all devices
- Smooth animations and transitions
- Empty state with helpful messaging
- Progress tracking (completed vs total todos)

🔧 **Tech Stack**
- **Frontend**: Next.js 16+, React, TypeScript
- **Backend**: Next.js API Routes
- **Database**: MongoDB with Mongoose
- **Styling**: Tailwind CSS
- **Containerization**: Docker & Docker Compose

## Prerequisites

- Node.js 18+ and npm
- Docker and Docker Compose
- MongoDB (via Docker or local installation)

## Installation & Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Start MongoDB

Using Docker Compose:

```bash
docker-compose up -d
```

This will start MongoDB on `localhost:27017` with:
- Username: `admin`
- Password: `password`

Or use a local MongoDB instance and update `.env.local` accordingly.

### 3. Configure Environment Variables

The `.env.local` file is already configured for the Docker MongoDB:

```
MONGODB_URI=mongodb://admin:password@localhost:27017/todo-app?authSource=admin
```

If using a different MongoDB setup, update this value.

### 4. Run the Development Server

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── todos/
│   │       ├── route.ts          # GET (fetch all) & POST (create)
│   │       └── [id]/
│   │           └── route.ts      # PATCH (update) & DELETE
│   ├── layout.tsx
│   └── page.tsx                  # Main page component
├── components/
│   ├── TodoForm.tsx              # Form to create/add todos
│   ├── TodoItem.tsx              # Individual todo item component
│   └── TodoList.tsx              # List of todos with stats
├── lib/
│   ├── mongodb.ts                # MongoDB connection utility
│   └── models/
│       └── todo.ts               # Todo schema and interface
└── globals.css
```

## API Endpoints

### GET /api/todos
Fetch all todos

**Response:**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Learn Next.js",
    "description": "Complete Next.js tutorial",
    "completed": false,
    "createdAt": "2024-03-24T10:00:00Z",
    "updatedAt": "2024-03-24T10:00:00Z"
  }
]
```

### POST /api/todos
Create a new todo

**Request Body:**
```json
{
  "title": "Learn Next.js",
  "description": "Complete Next.js tutorial"
}
```

### PATCH /api/todos/[id]
Update a todo

**Request Body:**
```json
{
  "title": "Updated title",
  "description": "Updated description",
  "completed": true
}
```

### DELETE /api/todos/[id]
Delete a todo

## Database Schema

### Todo Model
```typescript
{
  _id: ObjectId
  title: String (required, max 100 chars)
  description: String (optional, max 500 chars)
  completed: Boolean (default: false)
  createdAt: Date
  updatedAt: Date
}
```

## Available Scripts

```bash
# Development server with hot reload
npm run dev

# Build for production
npm run build

# Run production server
npm run start

# Run linter
npm run lint

# Run in Docker
docker-compose up
```

## Development Tips

- **Hot Reload**: Changes to your code automatically reload the browser
- **Database Connection**: MongoDB must be running before starting the app
- **Error Handling**: Check the browser console and server logs for error messages
- **API Testing**: Use Postman or curl to test API endpoints

## Deployment

### Build for Production

```bash
npm run build
npm run start
```

### Docker Deployment

```bash
docker-compose up --build
```

## Troubleshooting

**MongoDB Connection Error**
- Ensure MongoDB is running: `docker-compose ps`
- Check `.env.local` has correct connection string
- Verify network connectivity

**Port Already in Use**
- Change the port in `docker-compose.yml` (MongoDB) or `.env.local`
- Or kill the existing process using the port

**Build Errors**
- Clear `.next` folder: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`

## License

MIT
