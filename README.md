# Shopify UX Challenge (Summer 2021)

This project was developed for the UX Developer Intern & Web Developer Intern Challenge - Summer 2021. It uses React and Styled Components, with animations handled by Framer Motion. The website is hosted on Firebase, and Dynamic Links are used for the sharing feature.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Live demo [here](https://shopux21.ht12345.xyz/).

## The Challenge

The challenge was to create a webpage that can search [OMDB](https://www.omdbapi.com/) for movies, and allows the user to save their favourite films they feel should be up for nomination. When they've selected 5 nominees, they should be notified they're finished. 

### Technical Requirements Met

- Search results should come from OMDB's API (free API key: http://www.omdbapi.com/apikey.aspx). ✓
- Each search result should list at least its title, year of release and a button to nominate that film. ✓
- Updates to the search terms should update the result list. ✓
- Movies in search results can be added and removed from the nomination list. ✓
- If a search result has already been nominated, disable its nominate button. ✓
Display a banner when the user has 5 nominations. ✓

### Extra Requirements Met

- Animations for loading, adding/deleting movies, and notifications. ✓
- Creating shareable links. ✓

### Assumptions

- A user can make as little or as many nominations as they desire, but can only create a shareable link when they have made at least one nomination. A banner is displayed when the user as 5 nominations.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

### `npm run deploy`

My own custom script. Builds the app for production to the `build` folder, then deploys the app to firebase hosting.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it. 
