# Quick Start Guide

## Prerequisites
- Node.js 18+ and npm
- Docker and Docker Compose (for MongoDB)
- Git (optional)

## Get Started in 3 Simple Steps

### 1. Start MongoDB (via Docker)
```bash
docker-compose up -d
```
MongoDB will be running on `localhost:27017`

### 2. Install & Run the App
```bash
npm install
npm run dev
```

### 3. Open in Browser
Visit [http://localhost:3000](http://localhost:3000)

## What You Can Do

✅ **Add Todos** - Enter a title and optional description
✅ **Mark Complete** - Click the checkbox to toggle completion status
✅ **Delete Todos** - Remove todos you no longer need
✅ **Track Progress** - See how many tasks you've completed

## Troubleshooting

### MongoDB Connection Error
```bash
# Check if MongoDB is running
docker-compose ps

# View logs
docker-compose logs mongodb
```

### Port 3000 Already in Use
Change the port by modifying `package.json` scripts:
```json
"dev": "next dev -p 3001"
```

### Build Errors
```bash
# Clean and reinstall
rm -rf .next node_modules
npm install
npm run build
```

## Production Deployment

### Build for Production
```bash
npm run build
npm run start
```

### Docker Deployment
```bash
# Build and run with Docker
docker-compose up --build
```

## Project Features

- **Full CRUD Operations** - Create, Read, Update, Delete todos
- **Beautiful UI** - Modern design with Tailwind CSS
- **Real-time Updates** - Instant feedback on actions
- **Responsive Design** - Works on mobile, tablet, and desktop
- **MongoDB Integration** - Persistent data storage
- **Type-Safe** - Written in TypeScript

## Project Structure
```
.
├── src/
│   ├── app/
│   │   ├── api/todos/          # API routes for CRUD
│   │   └── page.tsx            # Main application
│   ├── components/             # React components
│   ├── lib/                    # Database & utilities
│   └── globals.css
├── docker-compose.yml          # MongoDB setup
├── package.json
└── README.md
```

## API Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/todos` | Fetch all todos |
| POST | `/api/todos` | Create new todo |
| PATCH | `/api/todos/[id]` | Update a todo |
| DELETE | `/api/todos/[id]` | Delete a todo |

## Need Help?

Check the main [README.md](README.md) for detailed documentation.
