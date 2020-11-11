## Initial Machine Setup

1. **Install [Node 8.0.0 or greater](https://nodejs.org)**

   Need to run multiple versions of Node? Use [nvm](https://github.com/creationix/nvm).

2. **Install [Git](https://git-scm.com/downloads)**.

3. **[Disable safe write in your editor](https://webpack.js.org/guides/development/#adjusting-your-text-editor)** to assure hot reloading works properly.

4. Complete the steps below for your operating system:

   ### macOS

   - Install [watchman](https://facebook.github.io/watchman/) via `brew install watchman` or fswatch via `brew install fswatch` to avoid [this issue](https://github.com/facebook/create-react-app/issues/871) which occurs if your macOS has no appropriate file watching service installed.

   ### Linux

   - Run this to [increase the limit](http://stackoverflow.com/questions/16748737/grunt-watch-error-waiting-fatal-error-watch-enospc) on the number of files Linux will watch. [Here's why](https://github.com/coryhouse/react-slingshot/issues/6).

     `echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p`.

   ### Windows

   - **Install [Python 2.7](https://www.python.org/downloads/)**. Some node modules may rely on node-gyp, which requires Python on Windows.
   - **Install C++ Compiler**. Browser-sync requires a C++ compiler on Windows.

     [Visual Studio Express](https://www.visualstudio.com/en-US/products/visual-studio-express-vs) comes bundled with a free C++ compiler.

     If you already have Visual Studio installed:
     Open Visual Studio and go to File -> New -> Project -> Visual C++ -> Install Visual C++ Tools for Windows Desktop.
     The C++ compiler is used to compile browser-sync (and perhaps other Node modules).

---

# Get Started

**Setup**

`npm Install`
`npm start -s`

# Boilerplate choice

**React slingshot**

- It provides a React + Redux starter kit / boilerplate with Babel, hot reloading, testing, linting and a working example app built-in. Slingshot offers a rich development experience using React, Redux, Babel, Webpack, Jest, Sass and more. It provides hot reloading (and testing) upon saving which is very useful,

-**Documentation [React Slingshot](https://github.com/coryhouse/react-slingshot)**.
