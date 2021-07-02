# react-env

[![Coverage Status](https://coveralls.io/repos/github/TheMagoo73/react-env/badge.svg?branch=main)](https://coveralls.io/github/TheMagoo73/react-env?branch=main)

## Contents
- [Rational](#rational)
- [Installation](#installation)
- [Getting Started](#getting-started)

## Rational

Create-React-App (CRA) allows the use of environment variables to configure the application for separate environments, for example allowing different API keys in development, staging and production environments. However, unlike in a traditional server-side environment, these environment variables are 'baked into' the resulting app when it is built.

If you are running a separate build for each environment this solution can work well, however in the world of container-based deployments we often want to build a single container, and then use that in multiple environments. At this point, the CRA approach of baking in the environment variables at build time isn't ideal; we want to apply the environment variables in the browser based on the environment that the user has browsed to.

This context-based hook aims to provide a simple solution to runtime configuration by allowing the React app to download a configuration from a provided URL. If you're backend is running in a container you can then mount the environment specific configuration into the app's container. For example in K8s this could be mounted from a secret.

## Installation

Using [npm](https://npmjs.org)

```bash
npm install @jcmagoo/react-env
```

Using [yarn](https://yarnpkg.com)

```bash
yarn add @jcmagoo/react-env
```

## Getting Started

Wrap your app in the EnvProvider, and speify where to get the environment config from, and a default configuration if the load fails for any reason.

```jsx
// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import {EnvProvider} from 'react-env';
import App from './App';

const defaultEnv = {
    environmentName: 'dev'
}

ReactDOM.render(
    <EnvProvider
        url="https://yoursite.com/config/env.json"
        defaultEnv={ defaultEnv }
    >
        <App />
    </EnvProvider>,
    document.getElementById('app')
);
```

Now use the `useEnv` hook to access the configuration once it's been loaded

```jsx
import React from 'react';
import { useEnv } from 'react-env';

function App() {
    const {
        state,
        env,
    } = useEnv();

    if (state === 'LOADING') {
        return (<div>Config is loading...</div>)
    }

    const hasExtraText = hasFeature('extra_text')
    const theValue = getValue('example_value')

    return (<div>
        <div>Welcome to the {env.environmentName} environment.</div>
        {
            state==='ERRORED' && <div>Environment failed to load, using defaults</div>
        }
    </div>)
}

export default App;
```