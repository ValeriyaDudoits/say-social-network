export interface ICard {
  name: string,
  birthday: string,
  id: number,
  country: string,
  city: string,
  education: IEducation[],
  photo: string | ArrayBuffer | null,
  online?: boolean;
  posts: IPost[]
}

export interface IPost {
  text: string,
  publishedAt: string,
  likes: number
}

export interface IEducation {
  university: string,
  enteredAt: string,
  graduatedAt: string
}
