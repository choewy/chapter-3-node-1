# API

## Schema

```ts
interface Article {
    articleID: number;
    title: string;
    content: string;
    author: string;
    createdAt: Date;
    updatedAt: Date;
}

interface Comment {
    commentID: number;
    articleID: number; 
    text: string;
    author: string;
    creatdAt: Date;
    updatedAt: Date;
}
```

## APi

### 전체 게시글 목록 조회

- GET   /api/articles

```ts
interface ResponseData {
    ok: boolean;
    articles: Article[];
    error?: string;
}
```

### 게시글 작성

- POST   /api/articles

```ts
interface RequestBody {
    title: string;
    content: string;
    author: string;
}

interface ResponseData {
    ok: boolean;
    article: Article;
    error?: string;
}
```

### 게시글 조회

- GET   /api/articles/:articleID

```ts
interface RequestParams {
    articleID: number;
}

interface ResponseData {
    ok: boolean;
    article: Article;
    error?: string;
}
```

### 게시글 수정

- PATCH   /api/articles/:articleID

```ts
interface RequestParams {
    articleID: number;
}

interface RequestBody {
    title: string;
    content: string;
    author: string;
}

interface ResponseData {
    ok: boolean;
    article: Article;
    error?: string;
}
```

### 게시글 삭제

- DELETE    /api/articles/:articleID

```ts
interface RequestParams {
    articleID: number;
}

interface ResponseData {
    ok: boolean;
    error?: string;
}
```

### 댓글 목록 조회

- GET   /api/articles/:articleID/comments
- 댓글 작성일자를 기준으로 내림차순 정렬 

```ts
interface RequestParams {
    articleID: number;
}

interface ResponseData {
    ok: boolean;
    comments: Comment[];
    error?: string;
}
```

### 댓글 작성

- POST   /api/articles/:articleID/comments

```ts
interface RequestParams {
    articleID: number;
}

interface RequestBody {
    comment: string;
    author: string;
}

interface ResponseData {
    ok: boolean;
    row: Comment;
    error?: string;
}
```

### 댓글 삭제

- DELETE   /api/articles/:articleID/comments/:commentID

```ts
interface RequestParams {
    articleID: number;
    commentID: number;
}

interface ResponseData {
    ok: boolean;
    error?: string;
}
```