export class Article {
  constructor(
    public readonly articleId: string | undefined,
    public readonly title: string,
    public readonly content: string,
    public readonly authorId: string,
    public readonly createdAt: Date
  ) {}

  static empty() {
    return new Article('','','','', new Date());
  }
}
