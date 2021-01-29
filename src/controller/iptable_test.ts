// src/controller/iptable_test.ts
import {
  Body, Controller, Delete, Get, Patch, Path, Post, Route, Tags,
} from 'tsoa';

import { IpTableTest } from '@/entry';
import { UpdateIptableTestDTO } from '@/entry/dto';
import { IpTableTestService } from '@/service';

@Tags('Iptable Test')
@Route('iptable_test')
export class IptableTestController extends Controller {
  @Get('{ip}')
  public async getByIp(
    @Path('ip') ip: string,
  ): Promise<IpTableTest> {
    return IpTableTestService.getInstance().getByIp(ip);
  }

  @Delete('{ip}')
  public async deleteByIp(
    @Path('ip') ip: string,
  ): Promise<void> {
    IpTableTestService.getInstance().deleteByIp(ip);
  }

  @Post()
  public async add(
    @Body() form: IpTableTest,
  ): Promise<any> {
    const {
      description, gid, ip, ipTypeId, isUnlimited,
      isUpdated, lockId, mac, port, portType, switchId, uid,
    } = form;
    return IpTableTestService.getInstance().add(
      ip, ipTypeId, isUnlimited, switchId, port,
      portType, mac, isUpdated, uid, gid, description, lockId,
    );
  }

  @Patch('{ip}')
  public async updateByIp(
    @Path('ip') ip: string,
      @Body() form: UpdateIptableTestDTO,
  ): Promise<any> {
    const {
      description, gid, ipTypeId, isUnlimited,
      isUpdated, lockId, mac, port, portType, switchId, uid,
    } = form;
    return IpTableTestService.getInstance().updateByIp(
      ip, ipTypeId, isUnlimited, switchId, port,
      portType, mac, isUpdated, uid, gid, description, lockId,
    );
  }
}
