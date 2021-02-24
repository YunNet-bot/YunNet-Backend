// src/controller/switch.ts
import {
  Body, Controller, Delete, Get, Patch, Path, Post, Route, Tags,
} from 'tsoa';

import { Switch } from '@/entry';
import {
  AddResultDTO, DeleteResultDTO, UpdateResultDTO,
  UpdateSwitchDTO,
} from '@/entry/dto';
import { SwitchService } from '@/service';

@Tags('Switch')
@Route('switch')
export class SwitchController extends Controller {
  @Get('{id}')
  public async getById(
    @Path('id') id: number,
  ): Promise<Switch> {
    return SwitchService.getInstance().getById(id);
  }

  @Delete('{id}')
  public async deleteById(
    @Path('id') id: number,
  ): Promise<DeleteResultDTO> {
    return SwitchService.getInstance().deleteById(id);
  }

  @Post()
  public async add(
    @Body() form: Switch,
  ): Promise<AddResultDTO> {
    const {
      account, ip, id, location, machine_type, password, port_description,
      port_type, upper_port, upper_port_type, upper_switch, vlan,
    } = form;
    return SwitchService.getInstance().add(
      id, upper_switch, upper_port, upper_port_type, location,
      account, password, vlan, machine_type, port_description, port_type, ip,
    );
  }

  @Patch('{id}')
  public async updateById(
    @Path('id') id: number,
      @Body() form: UpdateSwitchDTO,
  ): Promise<UpdateResultDTO> {
    const {
      account, ip, location, machine_type, password, port_description,
      port_type, upper_port, upper_port_type, upper_switch, vlan,
    } = form;
    return SwitchService.getInstance().updateById(
      id, upper_switch, upper_port, upper_port_type, location,
      account, password, vlan, machine_type, port_description, port_type, ip,
    );
  }
}
