## Quick Guide
1. Install npm - https://nodejs.org/en/download/
2. cd into this directory, `npm install`
3. then build `npm run build`
4. then start the server `npm start`. See other commands below.

## Sanity checking steps
1. With network tab open, enter website with localhost:3000/login, or https://d39qy3qhpapskf.cloudfront.net/login
2. Login with Google using a gmail account.
3. You should be redirected to the Playlist Pro index page. Verify there is query params in the URL and your user name info is shown.
4. Click page right all, and click random playlists. Some of them will have songs. Do this til the last page is reached.
5. Click page left all the way to the left.
6. Click "New Playlist" and enter some Playlist name.
7. Scroll through pages til you find your new playlist. Click on it.
8. Enter a song name to fetch and click the fetch more songs button. Page should be refreshed with new song.
9. Add one more song.
10. Click out of the playlist to another. Then click back to your new playlist to verify the storing is happening correctly.
11. with your new playlist, rename it. Click out, then click back into it.
12. Click the "user" button on the new playlist, and add a new user to have access to it. You should see a status message appear that says "true".
13. Click the new playlist, and check user access for that newly added user. It should return true.
14. Check user access for a non-existent user. It should return false.
15. Now remove user access for this new user. It should return true.
16. Try checking its access again, and now it should return false since it was just deleted.
17. Delete the playlist.
18. Click logout.


# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

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

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
