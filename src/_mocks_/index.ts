import { Request ,Response} from "express-serve-static-core";
export const mockRequest ={}as unknown as Request;
export const mockRespone ={
    send :jest.fn(),
}as unknown as Response;
export function myRouteHandler(_req: Request, res: Response) {
    res.send('Visal123');
}