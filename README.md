{
  "name": "api-sandbox",
      "version": "1.0.0",
      "description": "Simple Node.js REST API sandbox",
      "main": "index.js",
      "scripts": {
        "start": "node index.js",
              "dev": "nodemon index.js"
  },# API Sandbox

  A lightweight **Node.js + Express** REST API sandbox with full CRUD support.

  > Co-built with Claude (Anthropic). Public sandbox for testing and open-source collaboration. Data is in-memory and resets on restart.

  ## Tech Stack

- Runtime: Node.js
  - Data Store: In-memory (no database)

  ## Setup

  ```bash
  git clone https://github.com/jovbcorreia/api.git
  cd api
  npm install
  npm start
  ```

  API runs at http://localhost:3000

  ## Endpoints

  | Method | Endpoint | Description |
  |---|---|---|
  | GET | /items | Get all items |
  | GET | /items/:id | Get one item |
  | POST | /items | Create item |
  | PUT | /items/:id | Update item |
  | DELETE | /items/:id | Delete item |

  ## License

  MIT
  keywords": ["nodejs", "express", "rest", "api"],
      "author": "jovbcorreia",
      "license": "MIT",
      "dependencies": {
        "express": "^4.18.2"
  },
  "devDependencies": {
        "nodemon": "^3.0.1"
  }
}
