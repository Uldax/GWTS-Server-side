import {Ingredient} from "../common/type";

export interface BuyableIngredient extends Ingredient {
    originalBuyPrice: number;
    buyPrice: number;
    craftPrice: number;
}


export interface RecipeResult {
    ingredients: BuyableIngredient[];
    initialPrice: number
    finalPrice: number
    itemId : number
}

export interface DealCritera {
    minFactoryMarge: number,
    minGain: number,
    minimumNumberOfSale: number,
    minimumNumberOfBuy: number,
    maxCompo: number,
    doNotEvaluate: {
        rarity: string[]
        flags: string []
        types: string [],
        itemList : number[]
    }

}
