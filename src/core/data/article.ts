export class Article {
  constructor(
    public readonly articleId: string | undefined,
    public readonly title: string,
    public readonly createdAt: Date
  ) {}

  static empty() {
    return new Article('','', new Date());
  }
}
