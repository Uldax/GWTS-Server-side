import {Injectable, Logger} from "@nestjs/common";

import {CacheService} from "../../core/cache/cache.service";
import {GWAPI} from "../../gw-api/gw-api-type";
import {ItemDao} from "../../common/service/item.dao";
import {TradeListingService} from "./trade-listing.service";
import {defaultDealCriteria} from "../conf/deal-critera";
import {first} from "lodash";
import {ItemModel} from "../../common/model/item-model";


@Injectable()
export class FlippingFinderService {
  logger = new Logger(FlippingFinderService.name);
  configuration = defaultDealCriteria;

  constructor(private readonly cacheService : CacheService,
              private readonly itemDao : ItemDao,
              private readonly tradeListingService : TradeListingService) {
  }

  async shouldFlipItem(item: ItemModel): Promise<{ itemId: number; buy: number; sell: number; gain: number ,
    itemName : string,
    chatLink : string} | undefined> {
    const listing = await this.tradeListingService.getListing(item.id);

    const buyPrice=  first(listing.buys).unit_price;
    const sellPrice = first(listing.sells).unit_price;
    // 15% tax on trading post
    const possibleGainIfFlipping =  (sellPrice - buyPrice) * 0.85;
    if( possibleGainIfFlipping < this.configuration.minGain){
      this.logger.debug(`min gain not reached for ${item.id} : ${possibleGainIfFlipping}`);
      return;
    }
    return {
      gain : possibleGainIfFlipping,
      buy : buyPrice,
      sell : sellPrice,
      itemId : item.id,
      itemName : item.name,
      chatLink : item.chatLink
    }
  }
}
