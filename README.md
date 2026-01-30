# 📝 Note App

A modern, full-stack note-taking application built with React and Node.js featuring a beautiful gradient UI, real-time updates, and rate limiting to prevent abuse.

![License](https://img.shields.io/badge/license-ISC-blue.svg)

## ✨ Features

- **Create, Read, Update, Delete (CRUD)** - Full note management functionality
- **Modern UI** - Beautiful gradient design with glass-morphism effects using Tailwind CSS and DaisyUI
- **Rate Limiting** - Powered by Upstash Redis to prevent API abuse (100 requests per minute)
- **Real-time Feedback** - Toast notifications for all user actions
- **Responsive Design** - Works seamlessly on all device sizes
- **MongoDB Integration** - Persistent data storage with automatic timestamps
- **Single Page Application** - Fast navigation with React Router

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI framework
- **React Router 7** - Client-side routing
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **DaisyUI** - Tailwind CSS component library
- **Axios** - HTTP client
- **React Hot Toast** - Toast notifications
- **Lucide React** - Icon library

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB + Mongoose** - Database and ODM
- **Upstash Redis + Rate Limit** - Rate limiting service
- **CORS** - Cross-Origin Resource Sharing
- **dotenv** - Environment variable management

## 📁 Project Structure

```
Note-App/
├── Backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── db.js              # MongoDB connection
│   │   │   └── upstash.js         # Rate limiter configuration
│   │   ├── controllers/
│   │   │   └── notesControllers.js # Business logic for notes
│   │   ├── routes/
│   │   │   └── notesRoutes.js     # API route definitions
│   │   └── server.js              # Express server setup
│   ├── models/
│   │   └── note.js                # Mongoose note schema
│   ├── middleware/
│   │   └── rateLimiter.js         # Rate limiting middleware
│   └── package.json
└── Frontend/
    ├── src/
    │   ├── components/
    │   │   ├── DeleteModal.jsx    # Confirmation modal
    │   │   ├── Navbar.jsx         # Navigation component
    │   │   ├── NoteCard.jsx       # Note preview card
    │   │   ├── NotesNotFound.jsx  # Empty state component
    │   │   └── RateLimitedUI.jsx  # Rate limit warning
    │   ├── lib/
    │   │   ├── axios.js           # Axios instance configuration
    │   │   └── utils.js           # Utility functions
    │   ├── pages/
    │   │   ├── HomePage.jsx       # Main notes list page
    │   │   ├── CreatePage.jsx     # Create new note page
    │   │   └── NoteDetailPage.jsx # Edit note page
    │   ├── App.jsx                # Root component with routes
    │   ├── main.jsx               # Application entry point
    │   └── index.css              # Global styles
    └── package.json
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB instance (local or cloud)
- Upstash Redis account ([Get free account](https://upstash.com))

### Environment Variables

#### Backend (.env)
Create a `.env` file in the `Backend/` directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
UPSTASH_REDIS_REST_URL=your_upstash_redis_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_token
```

### Installation

1. **Clone the repository**
   ```bash
   cd Note-App
   ```

2. **Install Backend Dependencies**
   ```bash
   cd Backend
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../Frontend
   npm install
   ```

### Running the Application

#### Development Mode

1. **Start Backend Server**
   ```bash
   cd Backend
   npm run dev
   ```
   Server will run on `http://localhost:5000`

2. **Start Frontend Development Server** (in a new terminal)
   ```bash
   cd Frontend
   npm run dev
   ```
   Application will run on `http://localhost:5173`

#### Production Mode

1. **Build Frontend**
   ```bash
   cd Frontend
   npm run build
   ```

2. **Start Backend**
   ```bash
   cd Backend
   npm start
   ```

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/notes` | Get all notes (sorted by newest first) |
| GET | `/api/notes/:id` | Get a single note by ID |
| POST | `/api/notes` | Create a new note |
| PUT | `/api/notes/:id` | Update an existing note |
| DELETE | `/api/notes/:id` | Delete a note |

### Request/Response Examples

**Create Note (POST /api/notes)**
```json
// Request Body
{
  "title": "My First Note",
  "content": "This is the content of my note"
}

// Response
{
  "message": "Note created successfully"
}
```

**Get All Notes (GET /api/notes)**
```json
// Response
[
  {
    "_id": "60d5ec49f1b2c8b1f8c8e6a1",
    "title": "My First Note",
    "content": "This is the content of my note",
    "createdAt": "2024-01-20T10:30:00.000Z",
    "updatedAt": "2024-01-20T10:30:00.000Z"
  }
]
```

## 🎨 Features Breakdown

### Rate Limiting
- Implements sliding window rate limiting using Upstash Redis
- Limit: 100 requests per 60 seconds per client
- Returns 429 status code when limit is exceeded
- User-friendly UI notification when rate limited

### Note Management
- **Create**: Add new notes with title and content
- **Read**: View all notes in a grid layout or individual note details
- **Update**: Edit note title and content inline
- **Delete**: Remove notes with confirmation modal

### UI/UX Features
- Glass-morphism design with gradient backgrounds
- Smooth animations and transitions
- Responsive grid layout (1 column on mobile, 2 on tablet, 3 on desktop)
- Toast notifications for all actions
- Loading states for async operations
- Empty state with welcome message

## 🔒 Security Features

- Rate limiting to prevent API abuse
- CORS configuration for allowed origins
- Environment variables for sensitive data
- Error handling with appropriate status codes

## 🧪 Scripts

### Backend
```bash
npm run dev   # Start development server with nodemon
npm start     # Start production server
```

### Frontend
```bash
npm run dev      # Start Vite dev server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the ISC License.

## 👤 Author

Deepraj Singh

## 🙏 Acknowledgments

- Icons by [Lucide React](https://lucide.dev)
- UI Components by [DaisyUI](https://daisyui.com)
- Rate Limiting by [Upstash](https://upstash.com)

---

**Note**: Make sure to configure your environment variables before running the application. The app requires both MongoDB and Upstash Redis connections to function properly.
