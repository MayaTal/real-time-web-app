# Online Coding Web Application

This project is an online coding web application designed to facilitate remote coding sessions between mentors and students. The application allows mentors to share code blocks with students in real-time, enabling them to observe and interact with the code as it is being edited.

## Features

- **Lobby Page:**
  - Displays a list of available code blocks for students to choose from.
  - Each code block represents a specific coding scenario.
  - Clicking on a code block navigates the user to the corresponding code block page.

- **Code Block Page:**
  - Both mentors and students access this page.
  - The first user to enter the page is designated as the mentor.
  - The mentor views the code block in read-only mode.
  - The student can interact with and modify the code block.
  - Real-time synchronization of code changes using Socket.io.
  - When a student's code matches the solution, a smiley face is displayed on the screen.
  - 
## Getting Started
 you can access the application at https://real-time-web-app-frontend.vercel.app/
