## 项目初始化

yarn create react-app 1second --template typescript

## 配置 CRACO

安装最新版本的 craco 为项目的开发依赖

```bash
npm i  @craco/craco -D
# or
yarn add @craco/craco -D
```

在项目的根目录下创建 CRACO 的配置文件

```bash
  my-app
  ├── node_modules
+ ├── craco.config.js
  └── package.json
```

在 package.json 中修改已经存在的 script 脚本配置以使用 craco CLI，如下：

```json
package.json
"scripts": {
-  "start": "react-scripts start"
+  "start": "craco start"
-  "build": "react-scripts build"
+  "build": "craco build"
-  "test": "react-scripts test"
+  "test": "craco test"
}
```

现在你可以正常使用 start、build 命令如下：

```bash
npm start
npm run build
```

常见的 craco 的配置项

```js
module.exports = {
  devServer: {
    /* ... */
  },
  // ...
  webpack: {
    alias: {
      /* ... */
    },
    plugins: {
      add: [
        /* ... */
      ],
      remove: [
        /* ... */
      ],
    },
    configure: {
      /* ... */
    },
    configure: (webpackConfig, { env, paths }) => {
      /* ... */
      return webpackConfig;
    },
  },
};
```

## 配置环境变量

安装最新版本的 cross-env 为项目的开发依赖

```bash
npm i  cross-env -D
# or
yarn add cross-env -D
```

在 package.json 中修改已经存在的 script 脚本配置以使用 craco CLI，如下：

```json
// package.json
"scripts": {
-  "start": "craco start"
+  "start": "cross-env NODE_ENV=development craco start"
-  "build": "craco build"
-  "build": "cross-env NODE_ENV=production craco build"
}
```

## 配置 tailwindcss

安装 tailwind CSS
通过 npm/yarn 安装然后执行 init 命令来生成 tailwind.config.js 文件

```bash
yarn add -D tailwindcss
npx tailwindcss init
```

配置你的模板路径
在 tailwind.config.js 文件配置中添加你所有的模板文件路径

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

在项目的全局`./src/index.css`文件中添加`Tailwind`的指令

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## 集成 UI 框架

安装
使用 npm 或 yarn 安装
我们推荐使用 npm 或 yarn 的方式进行开发，不仅可在开发环境轻松调试，也可放心地在生产环境打包部署使用，享受整个生态圈和工具链带来的诸多好处。

```bash
$ npm install antd --save
$ yarn add antd
```

示例

```js
import React from "react";
import { DatePicker } from "antd";
// 默认支持按需加载样式

const App = () => {
  return <DatePicker />;
};
```

样式冲突

在某些场景下你如果需要支持的旧版浏览器（或者如 TailwindCSS 优先级冲突），你可以使用 @ant-design/cssinjs 取消默认的降权操作（请注意版本保持与 antd 一致）：

安装

```bash
yarn add @ant-design/cssinjs -S
```

配置

```js
import { StyleProvider } from "@ant-design/cssinjs";

// `hashPriority` 默认为 `low`，配置为 `high`
export default () => (
  <StyleProvider hashPriority="high">
    <MyApp />
  </StyleProvider>
);
```

## 配置路径别名

```js
// craco.config.ts
 webpack: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
 }
```

```json
{
  "compilerOptions": {
    "baseUrl": "./",
    "paths": {
      "@/*": ["src/*"]
    }
    // ...
  }
}
```

## 配置 svgr

安装

```bash
npm install --save-dev @svgr/webpack
# or use yarn
yarn add --dev @svgr/webpack
```
