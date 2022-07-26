//Interface for req.user
declare namespace Express {
  export interface Request {
    user:
      | {
          id: string;
          role:string;
        }
      | any;
  }
}
declare interface IExampleData {
  name: string;
  id: string;
}
