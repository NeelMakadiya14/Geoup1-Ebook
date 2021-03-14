# E-book
Now-a-days everything is digital. So, writers also want to create their content on digital platforms and want to use features like formatting, editing, collaboration and save their time and focus on the main task of creating content. This project fulfills all these wishes. Not only this but also provide a platform to publish their own content. The main objective of this project is to provide a free platform for writers to create their content at
ease and publish it and for keen readers to read this creative content and they can also give rating,recommandation.

 You can find the repository for the Backend Server [here](https://github.com/NeelMakadiya14/E-book-backend)

## Development
- Fork and Clone the local repository.
```bash
git clone <your-url>
```
- Add your local repository as origin
```bash
git remote add origin <your-url>
```

- Add this repository as upstream
```bash
git remote add upstream https://github.com/NeelMakadiya14/Geoup1-Ebook.git
```

- To sync your local repository with central repository
```bash
git pull upstream main
```

- You need Node & Yarn to start the development environment. Download them here - [Node](https://nodejs.org/), [Yarn](https://yarnpkg.com).

- You can setup a `.env` file in the root of the repository. The file should look like this:

```bash
REACT_APP_CLIENT_ID=#Google auth client ID
REACT_APP_CLOUD_NAME=#Cloudinary cloud name
REACT_APP_CLOUD_PRESET=#Cloudinary Upload Preset
REACT_APP_BACKEND_URL=#Backend Server Url
```

- Run the development server using:

```bash
npm install
npm start
```

- For production build:

```bash
npm build
```

## Contribution
-Create new branch and name it on the issue/feature you are working.

- to create new branch
```bash
git checkout -b <branch-name>
```
- to shift from one branch to another
```bash
git cheackout <branch-name>
```

- After completing create PR on that branch
```bash
git push origin <branch-name>
```
- Then from your local repo you can create pull request to upsream(central repository) 
