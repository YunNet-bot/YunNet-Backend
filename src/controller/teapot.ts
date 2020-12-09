import { Controller, Get, Route } from 'tsoa';

@Route('teapot')
export class TeapotController extends Controller {
    @Get()
    public async getTeapot(): Promise<String> {
        let msg = "I'm a teapot!";
        return msg;
    }
}