export interface ICard {
  name: string,
  birthday: string,
  id: number,
  country: string,
  city: string,
  education: string,
  photo: string,
  online?: boolean;
  posts: IPost[]
}

export interface IPost {
  text: string,
  publishedAt: string,
  likes: number
}
