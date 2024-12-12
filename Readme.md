# Note-It: Collaborative Text Editor
 Note-It is a real-time collaborative text editor designed for seamless teamwork. With features like rich text formatting, real-time updates, and automatic saving, it is an ideal tool for shared document editing. Built with modern web technologies, Note-It ensures a smooth and interactive user experience.

## Key Features

- Real-Time Collaboration: Edit documents with multiple users simultaneously.

- Rich Text Editor: Format text with bold, italic, lists, headers, and more.

- Automatic Saving: All changes are saved in real-time to MongoDB.

- Unique Document URLs: Share and access documents with unique links.

## Tech Stack

- Frontend: React, Quill

- Backend: Node.js, Express, Socket.IO

- Database: MongoDB Atlas

## Quick Start

- Clone the repository:

git clone https://github.com/your-username/note-it.git
cd note-it

- Install dependencies:

```bash
cd client && npm install
cd ../server && npm install
```

- Configure .env in the server directory:

```bash
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/note-it
PORT=3001
```

- Start the app:

```bash
cd server && npm run dev
cd ../client && npm run dev
```

## Future Plans

- Add authentication for secure document access.

- Support offline editing with sync.

- Implement version history.

- Enjoy seamless collaboration with Note-It!