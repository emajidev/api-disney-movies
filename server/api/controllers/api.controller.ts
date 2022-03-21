import { Request, Response } from "express";
export class Controller {
  welcome(req: Request, res: Response): void {
    res
      .status(200)
      .json({ message: "This is where the awasomeness happen... 🚀" });
  }
}
export default new Controller();
