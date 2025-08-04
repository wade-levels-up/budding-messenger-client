# Budding Messenger Client 🌱

A modern, real-time messaging application built with React, TypeScript, and Vite. Features one-on-one conversations, group chats, and an innovative conversation tone visualization system.

## Features

### 🔐 Authentication

- User registration and login
- JWT token-based authentication
- Protected routes

### 💬 Messaging

- **One-on-one conversations** - Direct messaging between users
- **Group chats** - Create group conversations with multiple participants
- **Real-time messaging** - Instant message delivery and updates
- **Message history** - Persistent conversation storage

### 👥 User Management

- **User discovery** - Browse and search all registered users
- **Friend connections** - Connect with other users to start conversations
- **Profile pictures** - Custom user avatars with fallback defaults

### 🌳 Unique Features

- **Conversation Tone Analysis** - Sentiment analysis of conversations
- **Dynamic Tree Visualization** - Tree graphics that grow based on positive conversation sentiment
- **Adaptive UI** - Message styling that adapts to conversation participants

### 🎨 User Experience

- **Drag & Drop** - Intuitive group chat creation by dragging users
- **Responsive Design** - Works seamlessly on desktop and mobile
- **Modern UI** - Clean interface with Tailwind CSS styling
- **Smooth Animations** - Polished user interactions

## Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: React hooks (useState, useEffect)
- **Routing**: React Router DOM
- **HTTP Client**: Fetch API
- **Sentiment Analysis**: Sentiment.js library
- **Icons**: FontAwesome

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/budding-messenger-client.git
   cd budding-messenger-client
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:

   ```env
   VITE_API_BASE_URL=http://localhost:3000
   ```

4. **Start the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## Environment Variables

| Variable            | Description          | Default                 |
| ------------------- | -------------------- | ----------------------- |
| `VITE_API_BASE_URL` | Backend API base URL | `http://localhost:3000` |

## Project Structure

```
src/
├── components/
│   ├── forms/          # Form components (NewMessage, etc.)
│   └── ui/             # UI components (Button, ProfilePicture, etc.)
├── pages/              # Page components (Dashboard, Conversation, etc.)
├── types/              # TypeScript type definitions
├── assets/             # Static assets (images, icons)
└── App.tsx             # Main application component
```

## Key Components

### Dashboard (`/dashboard`)

- View friends
- Search and browse users
- Create new group chats
- Update Profile picture and bio

### Conversation (`/conversation`)

- Real-time messaging interface
- Dynamic participant styling
- Sentiment-based tree visualization

### All Users (`/users`)

- Browse and search registered users
- NEW User badges

## API Integration

The client integrates with a REST API backend for:

- User authentication and management
- Conversation creation and retrieval
- Message sending and history
- Real-time updates

## Scripts

```bash
npm run dev          # Start development server
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Sentiment analysis powered by [Sentiment.js](https://github.com/thisandagain/sentiment)
- Icons provided by [FontAwesome](https://fontawesome.com/)
- UI components styled with [Tailwind CSS](https://tailwindcss.com/)

## Development Configuration

### ESLint Setup

This project uses TypeScript ESLint configuration. For production applications, consider enabling type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default tseslint.config([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs["recommended-typescript"],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```
