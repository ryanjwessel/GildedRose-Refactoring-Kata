export enum Inventory {
    AgedBrie = "Aged Brie",
    BackstagePass = "Backstage passes to a TAFKAL80ETC concert",
    Sulfuras = "Sulfuras, Hand of Ragnaros",
    DexterityVest = "+5 Dexterity Vest",
    MongooseElixir = "Elixir of the Mongoose",
}

export class Item {
    name: string;
    sellIn: number;
    quality: number;

    constructor(name, sellIn, quality) {
        this.name = name;
        this.sellIn = sellIn;
        this.quality = quality;
    }
}

export class GildedRose {
    MAX_QUALITY = 50;
    items: Array<Item>;

    constructor(items = [] as Array<Item>) {
        this.items = items;
    }

    decrementSellIn(item) {
        if (item.name != Inventory.Sulfuras) {
            item.sellIn -= 1;
        }
        return item;
    }

    updateGeneralItemQuality(item) {
        if (
            item.name !== Inventory.AgedBrie &&
            item.name !== Inventory.BackstagePass &&
            item.name !== Inventory.Sulfuras
        ) {
            if (item.sellIn < 0 && item.quality > 0) {
              item.quality -= 1;
            }
            if (item.quality > 0) {
                item.quality -= 1;
            }
        }
        return item;
    }

    updateBrieQuality(item) {
        if (item.name === Inventory.AgedBrie) {
            if (item.sellIn < 0 && item.quality < 50) {
                item.quality += 2;
            } else if (item.quality < 50) {
                item.quality += 1;
            }
        }
        return item;
    }

    updateBackstagePassQuality(item) {
        if (item.name === Inventory.BackstagePass) {
            if (item.sellIn < 0) {
                item.quality = 0;
            } else if (item.quality < 50) {
                item.quality += 1;
                if (item.name == Inventory.BackstagePass) {
                    if (item.sellIn < 10) {
                        if (item.quality < 50) {
                            item.quality += 1;
                        }
                    }
                    if (item.sellIn < 5) {
                        if (item.quality < 50) {
                            item.quality += 1;
                        }
                    }
                }
            }
        }
        return item;
    }

    updateQuality() {
        return this.items
            .map(this.decrementSellIn)
            .map(this.updateGeneralItemQuality)
            .map(this.updateBrieQuality)
            .map(this.updateBackstagePassQuality)
    }
}
