1.分别进入chat和server目录，执行:

    npm init -y
    yarn add vite -D

2.server目录下，执行:

    yarn add nodemon -g
    yarn add ws

3.修改chat的package.json:

    "scripts": {
        "dev": "vite"
    },

  修改server的package.json:

    "scripts": {
        "dev": "nodemon index.js"
    },

4.启动:

    npm run dev 