# Frontend-RDJ

A full-stack web application with a React frontend and Express backend.

## Project Structure

```
frontend-rdj/
├── client/   # React frontend
├── server/   # Express backend
```

---

## Client (React)

- Location: `client/`
- Built with React and Vite
- Main entry: `src/App.jsx`

### Setup & Run

```powershell or
cd client
npm install
npm run dev
```

### Features

- Uses `react-router-dom` for routing
- Modern React development

---

## Server (Express)

- Location: `server/`
- Built with Express.js
- Main entry: `server.js`

### Setup & Run

```powershell
cd server
npm install
node server.js
```

### Features

- Simple API endpoint at `/`
- Listens on port 4000 by default

---

## Development Notes

- Make sure to install all dependencies in both `client` and `server` folders.
- Start the backend before the frontend if your frontend fetches data from the server.
- For ES module support in Express, add `"type": "module"` to `server/package.json` or use CommonJS syntax.

---

## License

MIT
