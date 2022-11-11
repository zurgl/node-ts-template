# Node template setup

## Working Dir

```text
mkdir fp-ts 
cd ft-tp
pn init
```

`pn` stand for `pnpm` it's a bash `alias`

## Typescript


### Add typescript


```text
pn add -D typescript @types/node
pn exec tsc --init \
  --rootDir src --outDir build\
  --esModuleInterop --resolveJsonModule\
  --lib es2018 --module commonjs\
  allowJs true --noImplicitAny true
```

First run

```text
mkdir src
echo "console.log('hello')" > src/index.ts
pn exec tsc

tree build
build/
├── index.d.ts
├── index.d.ts.map
├── index.js
└── index.js.map

0 directories, 4 files

bat build/index.js

"use strict";
console.log('Hello world!');
```


### Configure sripts

```text
pn add -D ts-node nodemon rimraf
```

indside `nodemon.json`
```json
{
  "watch": ["src"],
  "ext": ".ts,.js",
  "ignore": [],
  "exec": "ts-node ./src/index.ts"
}
```

indside `package.json`
```json
{
...
  "scripts": {
    "build": "rimraf ./build && tsc",
    "dev": "nodemon",
    "start": "pnpm run build && node build/index.js"
  },
...
}
```

Run the server `pn dev`

## Eslint

### Install and config

```text
pn add -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
pn exec eslint --init
You can also run this command directly using 'npm init @eslint/config'.
✔ How would you like to use ESLint? · style
✔ What type of modules does your project use? · esm
✔ Which framework does your project use? · none
✔ Does your project use TypeScript? · No / Yes
✔ Where does your code run? · browser
✔ How would you like to define a style for your project? · prompt
✔ What format do you want your config file to be in? · JSON
✔ What style of indentation do you use? · 4
✔ What quotes do you use for strings? · single
✔ What line endings do you use? · unix
✔ Do you require semicolons? · No / Yes
The config that you've selected requires the following dependencies:

@typescript-eslint/eslint-plugin@latest @typescript-eslint/parser@latest
✔ Would you like to install them now? · No / Yes
✔ Which package manager do you want to use? · pnpm
Installing @typescript-eslint/eslint-plugin@latest, @typescript-eslint/parser@latest
...
Successfully created .eslintrc.json file in /home/zu/workspace/fp-ts/project-template
```

#### Ignore specific asset

inside `.eslintignore`
```text
node_modules
build
dist
.git/**/*
.next/**/*
.pijul/**/*
```

#### script `pn lint`


```json
...
  "scripts": {
    ...
    "lint": "eslint . --ext .ts",
    "lint-and-fix": "eslint . --ext .ts --fix"
  }
...
```


## Prettier

### Install and config

```text
pn add -D prettier
touch .prettierrc
```

inside `.prettierrc`
```json
{
  "semi": false,
  "trailingComma": "none",
  "singleQuote": true,
  "printWidth": 80
}
```

inside `package.json`
```json
{
  "scripts": {
    ...
    "prettier-format": "prettier --config .prettierrc 'src/**/*.ts' --write"
  }
}
```

### vscode setup

```text
mkdir .vscode
touch .vscode/settings
```

inside `.vscode/settings`

```json
{
  "editor.tabSize": 4,
  "editor.insertSpaces": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnPaste": true,
  "editor.formatOnSave": true,
  "editor.minimap.enabled": false,
  "files.exclude": {
    "node_modules": true,
    "archives": false,
    ".anchor": true,
    ".next": true,
    "build": true,
    "dist": true,
    "pnpm-lock.yaml": true
  }
}
```

<kbd>CMD + SHIFT + P</kbd> select `format`

### Configure with `eslint`

```text
pn add -D eslint-config-prettier eslint-plugin-prettier
```

* `eslint-config-prettier`: Turns off all ESLint rules that have the potential to interfere with Prettier rules.
* `eslint-plugin-prettier`: Turns Prettier rules into ESLint rules.

inside `.eslintrc`
```json
{
  "root": true,
  "parser": "@typescript-eslint/parser",
  "plugins": [
    "@typescript-eslint",
    "prettier"
  ],
  "extends": [
    ...
    "prettier"
  ],
  "rules": {
    ...
    "prettier/prettier": 2 // Means error
  }
}
```

## Husky

### Install and auto-config
```text
pn dlx husky-init && pn install 
```

### Configure hook

inside `.husky/pre-commit`
```shell
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

pnpm run format
pnpm run lint
```

## lint-staged

```text 
pn add -D lint-staged
```

inside `package.json`
```json
"lint-staged": {
  "*.{ts,js}": [
    "pnpm run format",
    "pnpm run lint"
  ]
}
```

inside `_husky/pre-commit`
```shell
...
pnpm exec lint-staged
```

## Git

```text 
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/user/repo.git
git push -u origin main
```

## Pijul

```text 
pijul init
pijul add .
pijul record -m "first commit"
pijul push zurgl@ssh.pijul.com:node-ts-template
```


## References

* [typescript setup](https://khalilstemmler.com/blogs/typescript/node-starter-project/)
* [eslint setup](https://khalilstemmler.com/blogs/typescript/eslint-for-typescript/)
* [prettier setup](https://khalilstemmler.com/blogs/tooling/prettier/)
* [husky Example](https://khalilstemmler.com/blogs/tooling/enforcing-husky-precommit-hooks/)
* [husky](https://typicode.github.io/husky/#/?id=install)
* [lint-staged](https://github.com/okonet/lint-staged)
* [git](https://gist.github.com/c0ldlimit/4089101)
