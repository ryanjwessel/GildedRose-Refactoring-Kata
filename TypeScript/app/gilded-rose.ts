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

    updateQuality() {
        return this.items.map((item) => {
            if (
                item.name != Inventory.AgedBrie &&
                item.name != Inventory.BackstagePass
            ) {
                if (item.quality > 0) {
                    if (item.name != Inventory.Sulfuras) {
                        item.quality = item.quality - 1;
                    }
                }
            } else {
                if (item.quality < 50) {
                    item.quality = item.quality + 1;
                    if (item.name == Inventory.BackstagePass) {
                        if (item.sellIn < 11) {
                            if (item.quality < 50) {
                                item.quality = item.quality + 1;
                            }
                        }
                        if (item.sellIn < 6) {
                            if (item.quality < 50) {
                                item.quality = item.quality + 1;
                            }
                        }
                    }
                }
            }
            if (item.name != Inventory.Sulfuras) {
                item.sellIn = item.sellIn - 1;
            }
            if (item.sellIn < 0) {
                if (item.name != "Aged Brie") {
                    if (item.name != Inventory.BackstagePass) {
                        if (item.quality > 0) {
                            if (item.name != Inventory.Sulfuras) {
                                item.quality = item.quality - 1;
                            }
                        }
                    } else {
                        item.quality = item.quality - item.quality;
                    }
                } else {
                    if (item.quality < 50) {
                        item.quality = item.quality + 1;
                    }
                }
            }
            return item;
        });
    }
}
