export interface ICategory {
    name: string;
    slug: string;
}

export interface IPost {
    title: string;
    slug: string;
    thumbnailName: string;
    creationDate: string; // ISO 8601 format
    categories: ICategory[];
    featured?: boolean; // Opcjonalne pole, ponieważ nie zawsze występuje
}

export interface IPostsResponse {
    posts: IPost[];
}

export interface IError {
    type: string;
    msg: string;
    path: string;
    location: string;
}

export interface IValidationError {
    errors: IError[];
}


