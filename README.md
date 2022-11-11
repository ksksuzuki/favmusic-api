# favmusic-api

お気に入りの音楽を登録する、探すことができる API

## エンドポイント

### 必須

- `GET /music`
  - 登録されているすべての楽曲を参照する
  - 属性や名前で絞り込み、検索をかけることが可能 ★Nice to have
- `POST /music`
  - 楽曲を登録する
- `PATCH /music/:id`
  - 楽曲の情報を更新する
- `DELETE /music/:id`
  - 楽曲を削除する
  - その楽曲をお気に入りに登録してる人がいるとエラー ★Nice to have
- `GET /user/:id`
  - ユーザ情報を取得する
  - お気に入りの楽曲のリストも返す ★Nice to have
- `POST /user`
  - ユーザを登録する
- `PATCH /user/:id`
  - ユーザ情報を更新する
- `POST /user/:id/favorite`
  - 楽曲をお気に入りに登録する

### Nice to have

- `POST /api/types`
  - 楽曲のジャンルを追加する
- `DELETE /api/types/:name`
  - 登録可能な楽曲ジャンルを取得する
- `POST /api/types`
  - ログイン状態の保持
