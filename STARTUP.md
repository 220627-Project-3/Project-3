# How To Run Application In Local Machine

* Divided into two parts. Front-end and Back-end
* Assuming you have already installed the required software listed in README.md and cloned the repository in your machine - you may follow the steps below.

## Back-End

1. Open `Spring Tools Suite`
2. Find and choose `Project 3` folder as the workspace
3. Go To `File > Import > Import Project > Existing Gradle Project`
4. On the `Package Explorer view`, right click on the project name. From the context menu click on `Gradle > Refresh Gradle Project`
5. On the `Package Explorer view`, right click on the project name. From the context menu click on `Run As > Spring Boot App`

## Front-End

1. Open a command line or GIT bash at the `e-commerce-frontend-angular-main` directory
2. Type `npm install` and press enter. This may take a while as it downloads dependencies.
3. Type `ng serve -o` and press enter. This will run the application and automatically open your default browser.
    * You can also enter the URL http://localhost:4200 in your browser.