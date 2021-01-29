// src/controller/netflow.ts
import {
  Body, Controller, Delete, Get, Patch, Path, Post, Route, Tags,
} from 'tsoa';

import { Netflow } from '@/entry';
import { UpdateNetflowDTO } from '@/entry/dto';
import { NetflowService } from '@/service';

@Tags('Netflow')
@Route('netflow')
export class NetflowController extends Controller {
  @Get('{ip}')
  public async getByIp(
    @Path('ip') ip: number,
  ): Promise<Netflow> {
    return NetflowService.getInstance().getByIp(ip);
  }

  @Delete('{ip}')
  public async deleteByIp(
    @Path('ip') ip: number,
  ): Promise<void> {
    NetflowService.getInstance().deleteByIp(ip);
  }

  @Post()
  public async add(
    @Body() form: Netflow,
  ): Promise<any> {
    const {
      ip, lanDownload, lanUpload, wanDownload, wanUpload,
    } = form;
    return NetflowService.getInstance().add(ip, wanUpload, wanDownload, lanUpload, lanDownload);
  }

  @Patch('{ip}')
  public async updateByIp(
    @Path('ip') ip: number,
      @Body() form: UpdateNetflowDTO,
  ): Promise<any> {
    const {
      lanDownload, lanUpload, wanDownload, wanUpload,
    } = form;
    return NetflowService.getInstance().updateByIp(
      ip, wanUpload, wanDownload, lanUpload, lanDownload,
    );
  }
}
