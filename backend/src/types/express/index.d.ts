export {}

declare global {
  namespace Express {
    export interface Request {
      userId?: string;
	  pb_number?: string;
    }
  }
}