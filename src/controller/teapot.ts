// src/controller/teapot.ts
import { Controller, Get, Route, Post, Body } from 'tsoa';
import { brewTeaService } from '@/service'

@Route('teapot')
export class TeapotController extends Controller {
  @Get()
  public async getTeapot(): Promise<string> {
    const msg = "I'm a teapot!";
    return msg;
  }

  @Post()
  public async returnMsg(
    @Body() requireTea :string ,
  ): Promise<string>{
    return brewTeaService.brewTea(requireTea) ;
  }

}
