# sample-app-React

カメラ撮影、フィルター加工機能を持った、React Native検証プロジェクト

## 必要なソフトウェア

- Xcode
- CocoaPods
- Node (nodebrewによるインストール推奨)

## 環境構築

- 本リポジトリをチェックアウト

- React Nativeライブラリインストール
Cloneリポジトリ直下に移動して実行
```
npm install
```

- iPhoneアプリ実行に必要なライブラリをインストール

`npm install` しただけではiPhoneアプリのライブラリはインストールされませんので必ず実行してください。

`/ios` に移動して実行
```
pod install
```
※初回だけではなく、React Nativeライブラリを追加した場合も実行してください。

## 実行

### iOS実機で実行

- ターミナルでReact Nativeを起動
```
npx react-native start
```

- Xcodeアプリを開く
- 実機をUSB接続する
- Run実行する

## 注意点

### iPhone実機インストールで失敗する主な原因

- p12ファイルをPCにインストールしていない (インストールされているかは、キーチェーンアプリにて確認できます)
- Provisioning fileを持っていない
- NodeのパスがPJの設定と異なる　※1

※1 NodeのパスがPJの設定と異なる

Xcodeの Buikd Phases > Bundle React Native code and images にスクリプトを記述していますが、
これがご自身のパスと一致しているか確認してください。

```
export NODE_BINARY=~/.nodebrew/current/bin/node
../node_modules/react-native/scripts/react-native-xcode.sh
```

nodeのパスは、ターミナルを開き `which node` で確認できます。
