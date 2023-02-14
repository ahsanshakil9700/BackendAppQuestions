# BackendAppQuestions
This is a full stack application, which consists of a backend server built with Node.js using the Express framework and a front-end application built with React.js.

The backend part uses Express to set up an HTTP server and listens on port 3002. The server uses the cors middleware to handle Cross-Origin Resource Sharing (CORS), and the express.json() middleware to parse JSON data in the body of incoming requests.

The server has two endpoints, /questions which is a POST endpoint to handle questions and answers, and app.use((error, req, res, next) => to handle errors.

The /questions endpoint retrieves a set of questions and conclusions from two JSON files, questions.json and conclusions.json, respectively. When the client makes a POST request to the endpoint with the required data, the server processes the data and returns the next question or conclusion.

The front-end part is a React.js application that makes HTTP requests to the backend server. The main component of the application is the App component, which uses the useState and useEffect hooks to manage the state of the application. The component makes a POST request to the /questions endpoint when it is first mounted to retrieve the initial question.

When the user answers a question, the component updates the yesState state, which triggers another useEffect hook to handle the answer and retrieve the next question or conclusion. The received data is then displayed to the user.
