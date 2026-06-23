export interface Idea {
  id: string;
  title: string;
  description: string;
  category: string;
  userId: string;
  createdAt: string;
}

export interface CreateIdeaDto {
  title: string;
  description: string;
  category: string;
}
