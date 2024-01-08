# Notes API

An API to fetch, create, search and share notes. Authentication also works along with these features.
(Sharing is in works)

## API Reference

### Authentication

#### Login

```http
  POST /api/auth/login
```

#### Signup

```http
  POST /api/auth/signup
```

#### Logout

```http
  POST /api/auth/logout
```

### Notes

#### Get all notes

```http
  GET /api/notes
```

#### Get a specific note

```http
  GET /api/notes/:id
```

#### Create Note

```http
  POST /api/notes
```

#### Edit a note

```http
  PUT /api/notes/:id
```

#### Delete a note

```http
  DELETE /api/notes/:id
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`MONGO_URI`

`PORT`

`JWT_SECRET`
