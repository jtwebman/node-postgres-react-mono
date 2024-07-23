# Starter Node.js API with Postgres, React Web, and React Native App

I have lots of great buisness ideas and I am sure you do too. This repo is a demo app I setup as a task manager or a more complex todo app that runs on the web as well as a mobile app using React and React Native. This is a mono repo with shared code between the backend and frontend applications all written in Javascript with documentation in OpenAPI. This could be use to start your startup as well as it will all be MIT.

This will have abstractions for all things so you can replace them with your implementation. So if your DB works a little different then Postgres or you are using a different email provider or different Oauth provider it should be easy to add and replace.

## Questions

**Why not Typescript?** I love Typescript but it does take much longer to use and if you are a startup you should be focus on getting something in the hands of people. Latter on when you have mutiple teams working on the code base feel free to start adding Typescript.

**Why no ORM?** I find it is one more thing the engineer needs to know to write code in the system. In the end all backend engineers need to know SQL and SQL is the perfect abstraction.

## What it will contain in the end

Will check these off with a date as we accomplish them

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
