# Building Nimbus from scratch

## Initialization (pre-commit)

Okay, I'm starting to write the Nimbus app from scratch,
using the best practices I've discovered in the past couple months.

First things first, let's get an app going:

```bash
npx create-react-app nimbus
cd nimbus
yarn
yarn start
```

## Commit 1

Next up, we'll add a few libraries that will make our lives 10000% easier.

```bash
yarn add \
  mobx \
  mobx-react \
  mobx-react-devtools \
  mobx-utils \
  react-app-rewire-mobx \
  styled-components

yarn add -D react-app-rewired
```

And [rewire] our app to support MobX.

[rewire]: https://github.com/timarney/react-app-rewired/tree/master/packages/react-app-rewire-mobx

## Commit 2
