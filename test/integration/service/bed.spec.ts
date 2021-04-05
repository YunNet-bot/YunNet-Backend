// test/integration/service/bed.spec.ts
import { expect } from 'chai';

import { Bed } from '@/entry';
import { AddResultDTO } from '@/entry/dto';
import { BedService } from '@/service';

import { conn } from '../hook.spec';

const addedBedPlace: Array<string> = [];

describe('Bed Service', async () => {
  describe('method add', () => {
    it('should add a new bed.', async () => {
      const newBedLocation: Bed = {
        bed: 'H2301-4',
        type: 0,
        portal: 'H2301',
        ip: '140.125.202.202'
      };
      const addResult: AddResultDTO = await BedService.getInstance().add(newBedLocation.bed, newBedLocation.type, newBedLocation.portal, newBedLocation.ip);
      if(!addResult.success) {
        throw new Error(`Add failed: ${addResult.message}`);
      }
      const bed: string = addResult.id[0] as string;
      const result = conn.getConn()
        .getRepository(Bed)
        .createQueryBuilder('b')
        .select(['b'])
        .where('bed = :bed', { bed });

      const resultBed = await result.getOneOrFail();
      expect(resultBed.bed).to.be.eq(bed);
      expect(resultBed.type).to.be.eq(newBedLocation.type);
      expect(resultBed.portal).to.be.eq(newBedLocation.portal);
      expect(resultBed.ip).to.be.eq(newBedLocation.ip);

      addedBedPlace.push(bed);
    });
  });

  describe('method getByBed', () => {
    it('should raise error when given not exists bed', async () => {
      const notExistsBed = 'Non';
      await expect(BedService.getInstance().getByBed(notExistsBed)).to.be.rejectedWith(Error, `No such Bed with Bed Position: ${notExistsBed}.`);
    });

    it('should get bedinfo with bed', async () => {
      const addResult: AddResultDTO = await BedService.getInstance().add('H3401-3', 0, 'H3401', '140.125.203.203');
      if(!addResult.success) {
        throw new Error(`Add failed: ${addResult.message}`);
      }
      const bed: string = addResult.id[0] as string;
      const bedinfo = await BedService.getInstance().getByBed(bed);
      expect(bedinfo.bed).to.be.eq(bed);
      expect(bedinfo.type).to.be.eq(0);
      expect(bedinfo.portal).to.be.eq('H3401');
      expect(bedinfo.ip).to.be.eq('140.125.203.203');

      addedBedPlace.push(bed);
    });
  });

  describe('method deleteByBed', () => {
    it('should delete a bedinfo by bed', async () => {
      const addResult: AddResultDTO = await BedService.getInstance().add('H4502-3', 0, 'H4501', '140.125.204.204');
      if(!addResult.success) {
        throw new Error(`Add failed: ${addResult.message}`);
      }
      const bed: string = addResult.id[0] as string;

      await BedService.getInstance().deleteByBed(bed);
      await expect(BedService.getInstance().getByBed(bed))
        .to.be.rejectedWith(Error, `No such Bed with Bed Position: ${bed}.`);
    });
  });

  describe('method updateByBed', () => {
    it('should change ip to something else', async () => {
      const addResult: AddResultDTO = await BedService.getInstance().add('H5603-2', 0, 'H5601', '140.125.205.205');
      if(!addResult.success) {
        throw new Error(`Add failed: ${addResult.message}`);
      }
      const bed: string = addResult.id[0] as string;
      await BedService.getInstance().updateByBed(bed, 1, 'H5601', '140.125.206.206');
      const updatedBed = await BedService.getInstance().getByBed(bed);
      expect(updatedBed.bed).to.be.eq(bed);
      expect(updatedBed.type).not.to.be.eq(0);
      expect(updatedBed.portal).to.be.eq('H5601');
      expect(updatedBed.ip).not.to.be.eq('140.125.205.205');

      addedBedPlace.push(bed);
    });
  });

  after('Recycle produced data', async () => {
    for( let i = 0; i < addedBedPlace.length; i++) {
      const bed = addedBedPlace[i];
      await BedService.getInstance().deleteByBed(bed);
    }
  });
});
