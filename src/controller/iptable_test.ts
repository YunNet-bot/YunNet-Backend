// src/controller/iptable_test.ts
import {
  Body, Controller, Delete, Get, Patch, Path, Post, Route, Tags,
} from 'tsoa';

import { IpTableTest } from '@/entry';
import {
  AddResultDTO, UpdateIptableTestDTO,
} from '@/entry/dto';
import { IpTableTestService } from '@/service';
import { UpdateResultDTO, DeleteResultDTO } from '@yunology/ts-multi-tenancy';

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
  ): Promise<DeleteResultDTO> {
    return IpTableTestService.getInstance().deleteByIp(ip);
  }

  @Post()
  public async add(
    @Body() form: IpTableTest,
  ): Promise<AddResultDTO> {
    const {
      description, gid, ip, ip_type_id, is_unlimited,
      is_updated, lock_id, mac, port, port_type, switch_id, uid,
    } = form;
    return IpTableTestService.getInstance().add(
      ip, ip_type_id, is_unlimited, switch_id, port,
      port_type, mac, is_updated, uid, gid, description, lock_id,
    );
  }

  @Patch('{ip}')
  public async updateByIp(
    @Path('ip') ip: string,
      @Body() form: UpdateIptableTestDTO,
  ): Promise<UpdateResultDTO> {
    const {
      description, gid, ip_type_id, is_unlimited,
      is_updated, lock_id, mac, port, port_type, switch_id, uid,
    } = form;
    return IpTableTestService.getInstance().updateByIp(
      ip, ip_type_id, is_unlimited, switch_id, port,
      port_type, mac, is_updated, uid, gid, description, lock_id,
    );
  }
}
