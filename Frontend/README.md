# Amplify UI Dashboard

A React Dashboard Admin Template built on top of Amplify UI.

Live Demo: [https://amplify-ui-dashboard-demo.vercel.app/](https://amplify-ui-dashboard-demo.vercel.app/).

Amplify UI Docs: [https://ui.docs.amplify.aws/react/getting-started/introduction](https://ui.docs.amplify.aws/react/getting-started/introduction).

![preview](./preview.png)

## Setup

Fork this repo to your namespace and clone it to your local machine.

Clone:

```
git clone https://github.com/<YOUR NAME>/amplify-ui-dashboard.git
```

install dependencies:

```
npm install
```

run the app in dev mode

```
npm run dev
```

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Customization

### Config: /src/config.jsx

Base Config file can be found in the /src/config.jsx ( header, footer, logo ... )

Sidebar Navigation can be changed in /src/config.jsx appNavs

Routes are in App.jsx

### Theming: /src/theme.jsx

To extend or override a token of the default amplify-ui theme, change the theme file.\
Amplify UI Docs: [https://ui.docs.amplify.aws/react/theming](https://ui.docs.amplify.aws/react/theming).

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

## License

MIT