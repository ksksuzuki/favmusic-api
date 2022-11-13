# favmusic-api

お気に入りの音楽を登録する、探すことができる API

## セットアップ

パッケージのインストール

`npm i`

サーバの起動(ポート 8000 で起動)

`npm run start`

dev モードでサーバの起動

`npm run dev`

テスト実行

`npm run test`

## エンドポイント

### 実装済み

- `GET /music`
  - 登録されているすべての楽曲を参照する
  - 属性や名前で絞り込み、検索をかけることが可能
- `POST /music`
  - 楽曲を登録する
- `PATCH /music/:id`
  - 楽曲の情報を更新する
- `DELETE /music/:id`
  - 楽曲を削除する
  - その楽曲をお気に入りに登録してる人がいるとエラー
- `GET /user/:id`
  - ユーザ情報を取得する
  - お気に入りの楽曲のリストも返す
- `POST /user`
  - ユーザを登録する
- `PATCH /user/:id`
  - ユーザ情報を更新する
- `POST /user/:id/favorite`
  - 楽曲をお気に入りに登録する
- `GET /login/:id`
  - ログイン状態の取得
- `POST /login/:id`
  - Email とパスワード正しい場合、ログイン状態への変更
- `DELETE /login/:id`
  - ログイン状態の削除
- `GET /genre`
  - 登録可能な楽曲ジャンルを取得する

### 未実装

- `POST /`
  - 楽曲のジャンルを追加する
