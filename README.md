# Code Quest
#### By Chris Quattrochi, Simi Oyin, Jonathan Song, Trent Dietzel

## Table of Contents
- [About](#about)
- [Technologies Used](#technologies-used)
- [Features](#features)
- [Installation](#installation)
- [Known Bugs](#known-bugs)
- [Feedback](#feedback)
- [License](#license)

## About
This project is a full-stack web application designed as an interactive game experience called "CodeQuest". It combines frontend components built with React and backend functionalities using Node.js, Express.js, and MongoDB. The application simulates a game environment where users progress through stages by solving puzzles and making strategic choices.

## Features
 - **Gameplay Mechanics:** Users navigate through stages with multiple doors, each hiding different puzzles. They can select doors, reveal puzzles, and make choices that affect their progression in the game.
 - **Quest Guide:** A detailed guide (/quest-guide) provides instructions and strategies for playing the game effectively.
 - **Interactive UI:** The frontend utilizes React components and React Router for seamless navigation and a dynamic user interface.

## Technologies Used
#### *Frontend*
 - **React:** JavaScript library for building user interfaces.
 - **React Router DOM:** Library for routing in React applications.
 - **react-dom:** Provides DOM-specific methods for React components.
 - **@testing-library/jest-dom:** Testing utilities for Jest.
 - **@testing-library/react:** Testing utilities for React components.
 - **@testing-library/user-event:** Utility for triggering user events in tests.
 - **web-vitals:** Library for measuring web performance metrics.
#### *Backend*
 - **Express:** Fast, minimalist web framework for Node.js.
 - **Mongoose:** MongoDB object modeling for Node.js.
 - **dotenv:** Loads environment variables from a .env file into process.env.
 - **axios:** Promise-based HTTP client for the browser and Node.js.
 - **cors:** Middleware for enabling Cross-Origin Resource Sharing (CORS) in Express.js.

## Installation

Follow these steps to set up the project locally:
1. Open Git BASH [Download Link](https://gitforwindows.org/)
2. Clone the repository to your local machine:
   ```bash
   git clone https://github.com/simioyin222/CodeQuest-Monty-Hall
   ```
3. Open the project directory:
   ```bash
   cd CodeQuest-Monty-Hall
   ```
4. Open in a code editor like __Visual Studio Code__.
### To Start Backend:
1. Open the backend directory using the terminal:
   ```bash
   cd backend
   ```
2. Open the VS Code terminal and install the backend dependencies:
   ```bash
   npm install
   ```
3. Once installed start the backend server:
   ```bash
   node server.js
   ```
### To Start Frontend:
6. Open the frontend directory using the terminal:
   ```bash
   cd frontend
   ```
7. Open the VS Code terminal and enter this command to install needed dependencies:
   ```bash
   npm install
   ```
8. Then once installed to view in browser or to use for further development run:
   ```bash
   npm run start
   ```

## Known Bugs
* None! If you see an issue, please report it on the [issues](https://github.com/repo-host/project-name/issues) page.

## Feedback
We welcome any feedback or suggestions you may have. Feel free to reach out to us via GitHub or email.

## ⚖️ License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT). Copyright (C) 2023 Trent Dietzel, Chris Quattrocchi, Simi Oyin, & Aaron Mejia. All Rights Reserved.

```
MIT License

Copyright (c) 2023 Chris Quattrochi, Simi Oyin, Jonathan Song, Trent Dietzel

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
