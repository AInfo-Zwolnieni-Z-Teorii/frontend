export interface ICategory {
    name: string;
    slug: string;
}

// Typ dla pojedynczego posta
export interface IPost {
    title: string;
    slug: string;
    thumbnailName: string;
    creationDate: string; // ISO 8601 format
    categories: ICategory[];
}

// Typ dla pojedynczego błędu
export interface Error {
    type: string;
    msg: string;
    path: string;
    location: string;
}

// Props dla komponentu
export interface Props {
    errors: Error[];
}

interface IBaseError {
    type: string;
    msg: string;
    path: string;
    location: string;
};

// Interfejs dla błędów
export interface IValidationError {
    errors: IBaseError[];
};