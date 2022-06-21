Land Selling Website

As part of this thesis, a web system for the sale and lease of land and real estate was designed and implemented. The system provides for its use by real estate companies. To do this, the system has a user-friendly interface and various opportunities for sale or lease of land and real estate.

The developed web system has a server part written in C # 9.0 in the environment of MS Visual Studio 2022. To save data on the server part, the MS SQL Server database is used.
The client part is written using the React library in the TypeScript programming language in the MS Visual Studio Code programming environment.
Successful operation of the web system requires the appropriate hardware characteristics, which are given in the specifications and you need to download the appropriate files

Video demonstration

https://drive.google.com/file/d/1vLK-RIUq5dQttHqbQ9LvkW14pUnMJgPe/view?usp=sharing

1. Software components

The developed web system has a server part written on C # 9.0 in the environment of MS Visual Studio 2022.
 The MS SQL Server database is used to store data on the server part.
The client part is written using the React library in the TypeScript programming language in the MS Visual Studio Code programming environment.
Successful operation of the web system requires the appropriate hardware characteristics, which are given in the specifications and you need to download the project files.

2. Files required for the correct operation of the software:
The project contains two solutions in two folders.
The first folder with the server part of the project "LandSellingApi".
It contains a set of projects in one solution. It is a system module for working with the client part and provides communication with the database.
Contains the logic of the web system at the level of working with data. And provides access to the database.
The second folder with the client part of the project "LandSellingWebsiteClientApp".
Contains a set of files with react components to implement the visual part of the UI. Contains sets of queries to the server part to provide web system data.
It makes sense to do the client part.
The project also has a database backup.

3. Software installation
  To start the web system, you must first start the server part. To do this, you need to open the server part of the project in MS Visual Studio 2022.
Next, you need to deploy the database. To do this, open the PM Console and enter the command "update-database". The database for the server part will then be deployed.
Next in the project you need to click "Run".
To start the client part, you need to open the project folder and enter the command "npm install" and "npm start" in the command window.
The main client page will then open in the browser.

4. Analysis of possible errors
In case of malfunction of the web system or part of the web system, it is necessary to check the correctness of the installed packages in the client and server parts.
You also need to check all files.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
