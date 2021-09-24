export enum Inventory {
    AgedBrie = "Aged Brie",
    BackstagePass = "Backstage passes to a TAFKAL80ETC concert",
    Sulfuras = "Sulfuras, Hand of Ragnaros",
    DexterityVest = "+5 Dexterity Vest",
    MongooseElixir = "Elixir of the Mongoose",
    ConjuredManaCake = "Conjured Mana Cake",
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

    static isLegendaryItem(item) {
        return item.name === Inventory.Sulfuras;
    }

    static isBrie(item) {
        return item.name === Inventory.AgedBrie;
    }

    static isBackstagePass(item) {
        return item.name === Inventory.BackstagePass;
    }

    static isConjuredItem(item) {
        return item.name === Inventory.ConjuredManaCake;
    }

    static isGeneralItem(item) {
        return (
            !GildedRose.isBackstagePass(item) &&
            !GildedRose.isBrie(item) &&
            !GildedRose.isConjuredItem(item) &&
            !GildedRose.isLegendaryItem(item)
        );
    }

    decrementSellIn(item) {
        item.sellIn -= 1;
        return item;
    }

    updateGeneralItemQuality(item) {
        if (item.sellIn < 0 && item.quality > 0) {
            item.quality -= 1;
        }
        if (item.quality > 0) {
            item.quality -= 1;
        }
        return item;
    }

    updateBrieQuality(item) {
        if (item.sellIn < 0 && item.quality < 50) {
            item.quality += 2;
        } else if (item.quality < 50) {
            item.quality += 1;
        }
        return item;
    }

    updateBackstagePassQuality(item) {
        if (item.sellIn < 0) {
            item.quality = 0;
        } else if (item.quality < 50) {
            item.quality += 1;
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
        return item;
    }

    updateConjuredItemQuality(item) {
        if (item.sellIn < 0 && item.quality > 0) {
            item.quality -= 2;
        }
        if (item.quality > 0) {
            item.quality -= 2;
        }
        return item;
    }

    updateQuality() {
        this.items
            .filter((item) => !GildedRose.isLegendaryItem(item))
            .map(this.decrementSellIn);

        this.items
            .filter(GildedRose.isGeneralItem)
            .map(this.updateGeneralItemQuality);

        this.items
            .filter(GildedRose.isConjuredItem)
            .map(this.updateConjuredItemQuality);

        this.items.filter(GildedRose.isBrie).map(this.updateBrieQuality);

        this.items
            .filter(GildedRose.isBackstagePass)
            .map(this.updateBackstagePassQuality);

        return this.items;
    }
}
