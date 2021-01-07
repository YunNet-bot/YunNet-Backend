// src/controller/teapot.ts
import { Controller, Get, Route } from 'tsoa';

@Route('teapot')
export class TeapotController extends Controller {
  @Get()
  public async getTeapot(): Promise<string> {
    const msg = "I'm a teapot!";
    return msg;
  }
}
