### Welcome! 
We are Team Made and this is Boilerplate Pro 
INSERT PICTURE HERE

### What is it? 
Boilerplate Pro is a web app for developers that solve the perplexing problem of choosing a boilerplate and beginning a project. As a team we saw the need for a tool that streamlined the process of forking or cloning a boilerplate in addition to searching and finding one. The process of starting a project from a boilerplate on GitHub has historically been convoluted and difficult for the end user. We've made this process easy with our user friendly UX and backend. 

### How to use it.
Users start out by logging in with GitHub, which allows Boilerplate Pro access to all the necessary data to make new repos and clone data for a user. Upon login the user will see a list of boilerplates that are available for selection and sorting, but more importantly they can search for a specific word that exists in the README, title and package.JSON. 

This allows users complete control over their search. Users can then view a rendered version of the selected boilerplate's README and, if they decide to build it, choose a name and start the Hyperclone™ process. The user will then see a link to the newly created GitHub repo on their account and options for Travis CI as well as Heroku for deployment. 

### How it works.
Boilerplate Pro uses Google's Firestore for realtime, NoSQL, database for data which posed interesting challenges for our team. Because we had no traditional backend we could not make API requests and we initially attempted to use cloud functions to circumvent this issue. However, timeout constraints forced us to forgo this and build out a backend in addtion to the Firestore. The backend eventually helped us utilize Travis for continuous integration on every project.

The process of scraping the necessary boilerplates is very resource and time intensive, so much so that we had to build a rate limited and time based method to work in line with GitHub's API constraints. This process scrapes the boilerplate itself as well as the README and the dependencies which are necessary to make searching work. 

We also had unique challenges in determing the best way to streamline the user experience in terms of forking or cloning. The Hyperclone™ process condenses initial cloning, remote adding, pulling, adding, commiting and pushing into one button for the user. 

Heroku was the most difficult challenge of the project and is still not fully working in the current build. Not all boilerplates are immediately deployable and the Heroku button will not function for every single boilerplate. Every boilerplate is different and may be missing one of any necessary files to enable working deployment. 

### Technology 
## Frameworks
- Jest
- Bulma CSS
- Firestore 
## Libraries
- Redux
- React 
- Axios
- Simple Git
- Express
- Morgan 
- Lodash

### Thanks!
