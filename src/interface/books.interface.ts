export interface BooksProps {
  items: BookProps[];
  kind: string;
  totalItems: number;
}

export interface BookProps {
  id: string;
  volumeInfo: {
    title: string;
    imageLinks: {
      thumbnail: string;
    };
    previewLink: string;
    subtitle?: string;
  };
  searchInfo?: {
    textSnippet: React.ReactNode;
  };
}