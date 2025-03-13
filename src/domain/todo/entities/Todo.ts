export class Todo {
  title: string;
  isCompleted: boolean;

  constructor(title: string) {
    if (!title) {
      throw new Error("Title must not be empty");
    }
    this.title = title;
    this.isCompleted = false;
  }

  complete() {
    this.isCompleted = true;
  }
}