import { Test } from '@nestjs/testing';
import { CommonModule } from '../../common/common.module';
import { GwApiModule } from '../../gw-api/gw-api.module';
import { DealFinder } from './deal-finder.service';
import { PriceFinder } from './price-finder.service';
import { RecipeFinderService } from './recipe-finder.service';
import { CoreModule } from '../../core/core.module';
import { ItemDao } from '../../common/service/item.dao';
import { ItemModel } from '../../common/model/item-model';
import {ConfigModule} from "../../core/config/config.module";
import {DatabaseModule} from "../../database/database.module";
import {TradeListingService} from "./trade-listing.service";
import {FlippingFinderService} from "./flipping-finder.service";

describe('Deal finder', () => {
  let dealFinder: DealFinder;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [DealFinder, PriceFinder,RecipeFinderService, TradeListingService, FlippingFinderService],
      imports: [CommonModule, GwApiModule, CoreModule,ConfigModule,DatabaseModule],
    }).compile();

    dealFinder = moduleRef.get<DealFinder>(
      DealFinder,
    );
  });


  describe('craftable object', () => {
    it('create', async () => {
      try {
        const result = await dealFinder.findDeal();
        console.log(result)
        //expect(result.creditNoteSellingItems.length).toEqual(2);
      } catch (e) {
        fail(e);
      }
    });
  });
});
