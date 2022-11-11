# Schema Design

`pk` = Primary Key
`ref: >` = Many to one
`ref: <` = One to many
`ref: -` = One to one

## Music Table

```
Table music {
  id int [pk]
  name varchar(64) [not null]
  artist varchar(64) [not null]
  genre_id int [ref: > genre.id]
  description varchar(255)
}
```

## User Table

```
Table user {
  id int [pk]
  name varchar(64) [not null]
  email varchar(64) [not null]
  password varchar(64) [not null]
  description varchar(255)
}
```

## Genre Table

```
Table genre {
  id int [pk]
  name varchar(64) [not null]
}
```

## Favorite Table

```
Table favorite {
  music_id int [ref: > music.id, not null]
  user_id int [ ref: > user.id, not null]

  Indexes: {
    (music_id, user_id) [ name: 'order_product_index', unique ]
  }
}
```

## Login Table

```
Table login {
  user_id int [ ref: > user.id, not null]
}
```
