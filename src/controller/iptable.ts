// src/controller/iptable.ts
import {
  Body, Controller, Delete, Get, Patch, Path, Post, Route, Tags,
} from 'tsoa';

import { IpTable } from '@/entry';
import { UpdateIptableDTO } from '@/entry/dto';
import { IpTableService } from '@/service';

@Tags('IpTable')
@Route('iptable')
export class IpTableController extends Controller {
  @Get('{ip}')
  public async getByIp(
    @Path('ip') ip: string,
  ): Promise<IpTable> {
    return IpTableService.getInstance().getByIp(ip);
  }

  @Delete('{ip}')
  public async deleteByIp(
    @Path('ip') ip: string,
  ): Promise<void> {
    IpTableService.getInstance().deleteByIp(ip);
  }

  @Post()
  public async add(
    @Body() form: IpTable,
  ): Promise<any> {
    const {
      description, gid, ip, ipTypeId, isUnlimited,
      isUpdated, lockId, mac, port, portType, switchId, uid,
    } = form;
    return IpTableService.getInstance().add(
      ip, ipTypeId, isUnlimited, switchId, port,
      portType, mac, isUpdated, uid, gid, description, lockId,
    );
  }

  @Patch('{ip}')
  public async updateByIp(
    @Path('ip') ip: string,
      @Body() form: UpdateIptableDTO,
  ): Promise<any> {
    const {
      description, gid, ipTypeId, isUnlimited,
      isUpdated, lockId, mac, port, portType, switchId, uid,
    } = form;
    return IpTableService.getInstance().updateByIp(
      ip, ipTypeId, isUnlimited, switchId, port,
      portType, mac, isUpdated, uid, gid, description, lockId,
    );
  }
}
