# Starter Node.js API with Postgres, React Web, and React Native App

I have lots of great buisness ideas and I am sure you do too. This repo is a demo app I setup as a task manager or a more complex todo app that runs on the web as well as a mobile app using React and React Native. This is a mono repo with shared code between the backend and frontend applications all written in Javascript with documentation in OpenAPI. This could be use to start your startup as well as it will all be MIT.

This will have abstractions for all things so you can replace them with your implementation. So if your DB works a little different then Postgres or you are using a different email provider or different Oauth provider it should be easy to add and replace.

## Questions

**Why not Typescript?** I love Typescript but it does take much longer to use and if you are a startup you should be focus on getting something in the hands of people. Latter on when you have mutiple teams working on the code base feel free to start adding Typescript.

**Why no ORM?** I find it is one more thing the engineer needs to know to write code in the system. In the end all backend engineers need to know SQL and SQL is the perfect abstraction. I use [PG-Promise](https://vitaly-t.github.io/pg-promise/) library that has some helpers but you do have to be a little careful in not using normal string injection into SQL.

## What it will contain in the end

Will check these off with a date as we accomplish them

- ~~All docker local environment setup~~
- Account creation with email and password
- Email verification
- User login email and password
- Forgot password
- Settigns for account to support default timezone and language
- Setting for users to support timezone, language, and notifications
- Invite others to your account
- Setup teams in the account
- Basic permission system to manage actions in the system
- Can setup different projects on an account
- Can add task to those projects with a basic title and status (Not Started, In Progress, and Completed)
- Can assign tasks to a user
- Can assign teams to tasks
- Can set a start and due date on tasks
- Can send push notifications and email notifications on due and starting tasks assigned to you
- Can assign user or team to projects to get all notifications on tasks that are due, starting, or created

( Maybe / Nice to have )

- Server generated admin portal with a different user management system for access to manage accounts and users.
  - Can lock out accoutns and suers
  - Can send a user a forgot password email to reset their email
- Oauth Google and Github account creation, login, and invites
- Import and exporting projects and tasks with background tasks
- Crud jobs for cleaning up old accounts (No on logs in for 90 days with a 30 day, 10 day, and 24 hour notice email)
- Add billing and pay levels for a per user after 3 (maybe?)

## Dev Environment

From the root just run `docker compose up -d` which will start all the databases and start the api container, web app, and mobile app. This will only work if you are using WSL2 and Ubuntu on Windows or whould work with any Mac. You will also need to install Docker desktop for your machine or docker and docker compose for linux.

### Web App

The web aapp can now be accessed via http://localhost:4000

### React Native Expo App

It will use a random ngrok url to expose the Expo stuff to the world. You can run `docker compose logs -f mobile` to gain access to the barcode and scan it. You can also access the mobile app via the browser http://localhost:8081

### API

The API is at http://localhost:3000
