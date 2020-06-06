# momo
## Create React App で作成した React App を Gitgub に公開
### 相対パス（./）に変更
``` config\paths.js
const publicUrlOrPath = getPublicUrlOrPath(
  process.env.NODE_ENV === 'development',
  './',
  process.env.PUBLIC_URL
);
```

### build先を docs に変更

``` config\paths.js
module.exports = {
  ...
  appBuild: resolveApp('docs'),
  ...
};
```

## React component を npm に公開する
- [Qiita:npmパッケージ公開の手順](https://qiita.com/ShinKano/items/3e9f7813ff37379dd7ff)
### コンポーネント export用ファイル をつくる
``` src\flatland.tsx
export { FlatLand } from './containers/Flatland'
export { Sprite } from './containers/Sprite'
```

### npm公開用 tsconfig.json を書く
書き出し先を dist にしている
``` tsconfig.dist.json
{
  "compilerOptions": {
    "target": "ESNext",
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "moduleResolution": "node",
    "module": "ESNext",
    "outDir": "./dist",
    "jsx": "react",
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
  },
  "include": [
    "src"
  ],
  "exclude": [
      "./src/index.tsx",
      ... いらないやつ
  ]
}
```
### ビルドのスクリプトを記載する
``` package.json
  "scripts": {
    ...
    "dist:clear": "rimraf dist",
    "dist:build": "tsc --project ./tsconfig.dist.json",
    "dist": "run-s dist:clear dist:build",
    "prepublishOnly": "yarn run dist"
  },
```

### npm 公開のために追記する
``` package.json
  "main": "dist/flatland.js",
  "peerDependencies": {
    "react": "^16.13.1",
    "styled-components": "^5.1.1"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/yambal/react-flatland.git"
  },
  "author": "***",
  "description": "React Flatland",
  "bugs": {
    "url": "***"
  },
  "homepage": "https://yambal.github.io/react-flatland/",
  "license": "ISC"
```

```
npm publish --access=public
```