# React Base App
This repository contains react web application boilerplate projects.

## Getting Started
There are multiple template configurations, all of them separated into branches.

After choosing the right template, clone the repository
```bash
git clone https://github.com/gergoszaszvaradi/react-base-app -b BRANCH_NAME
```

Once the repository is cloned, rename the folder. Alternatively, you can clone the repository into an existing folder.

Now you need to configure the project. Use `cd` to move into the folder of the project, then run the following:
```bash
npm run configure
# If you want to use yarn, go for it.
# yarn configure
```
This will run a configuration wizard, asking for the name of the project, description, author and repository. You can skip a question by pressing enter without filling out a field. It will use the default value in the parentheses or nothing.

## Usage
There are two npm scripts defined

| Name  | Description                           | Command        |
|-------|---------------------------------------|----------------|
| start | Starts the webpack development server | `npm run start`
| build | Builds a production ready version     | `npm run build`
