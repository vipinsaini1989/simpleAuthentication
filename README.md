# Simple Authentication
This web app consist of Frontend and Backend, which provides the user simple signup, signin interface which ultimately leads to the home page screen. As user information is stored as the global variable on server, this means new user exists as long as server is alive.

# Instruction
- Clone the repository.
- Navigate to backend folder ```cd backend ```
- Install all the package provided in package.json by using ```$ npm install ```
- Start server by using ```$ nodemon```
- Open http://localhost:3000 in the browser.
- You can try this app using below creds.
> name: "test user" and password: "Qwerty1"

# File structure
### Backend
Node based server using Express is running to serve two purposes.
- Host the HTML files presented in the Frontend folder.
- Provide RESTfull API using for sign up and log in the user.

### Frontend
HTML file for different interface for the user like Login, Signup and Homepage