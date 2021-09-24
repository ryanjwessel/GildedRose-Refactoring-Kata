import { expect } from "chai";
import { Item, GildedRose, Inventory } from "../app/gilded-rose";

const simulateDays = (gildedRose: GildedRose, days: number) => {
    let items: Item[] = [];
    for (let i = 0; i < days; i += 1) {
        items = gildedRose.updateQuality();
    }
    return { items };
};

const qualityTest = ({
    item,
    sellIn,
    quality,
    duration,
    expected,
}: {
    item: Inventory;
    sellIn: number;
    quality: number;
    duration: number;
    expected: number;
}) => {
    const gildedRose = new GildedRose([new Item(item, sellIn, quality)]);
    const { items } = simulateDays(gildedRose, duration);
    expect(items[0].quality).to.equal(expected);
};

describe("Gilded Rose", () => {
    describe("General Items", () => {
        it("the quality of items should degrade by 1 at the end of each day", () =>
            qualityTest({
                item: Inventory.MongooseElixir,
                sellIn: 20,
                quality: 20,
                duration: 20,
                expected: 0,
            }));

        it("the quality of items should degrade by 2 at the end of each day if their sell by date has passed", () =>
            qualityTest({
                item: Inventory.MongooseElixir,
                sellIn: 0,
                quality: 20,
                duration: 10,
                expected: 0,
            }));

        it("the quality of an item should never degrade below 0", () =>
            qualityTest({
                item: Inventory.MongooseElixir,
                sellIn: 0,
                quality: 20,
                duration: 100,
                expected: 0,
            }));
    });

    describe(Inventory.Sulfuras, () => {
        it("quality should never degrade", () =>
            qualityTest({
                item: Inventory.Sulfuras,
                sellIn: 0,
                quality: 80,
                duration: 100,
                expected: 80,
            }));

        it("sellIn value should never decrease", () => {
            const gildedRose = new GildedRose([
                new Item(Inventory.Sulfuras, 100, 80),
            ]);
            const { items } = simulateDays(gildedRose, 100);
            expect(items[0].sellIn).to.equal(100);
        });
    });

    describe(Inventory.AgedBrie, () => {
        it("quality should increase in quality by 1 at the end of each day", () =>
            qualityTest({
                item: Inventory.AgedBrie,
                sellIn: 20,
                quality: 0,
                duration: 20,
                expected: 20,
            }));

        it("quality should increase in quality by 2 at the end of each day after the sell by date has passed", () =>
            qualityTest({
                item: Inventory.AgedBrie,
                sellIn: 0,
                quality: 0,
                duration: 20,
                expected: 40,
            }));

        it("quality should not increase beyond 50", () =>
            qualityTest({
                item: Inventory.AgedBrie,
                sellIn: 0,
                quality: 0,
                duration: 100,
                expected: 50,
            }));
    });

    describe(Inventory.BackstagePass, () => {
        it("quality should increase by 1 at the end of each day when its sell by date is more than 10 days away", () =>
            qualityTest({
                item: Inventory.BackstagePass,
                sellIn: 50,
                quality: 0,
                duration: 40,
                expected: 40,
            }));

        it("quality should increase by 2 at the end of each day when its sell by date is between 6-10 days away", () =>
            qualityTest({
                item: Inventory.BackstagePass,
                sellIn: 10,
                quality: 10,
                duration: 5,
                expected: 20,
            }));

        it("quality should increase by 3 at the end of each day when its sell by date is between 0-5 days away", () =>
            qualityTest({
                item: Inventory.BackstagePass,
                sellIn: 5,
                quality: 10,
                duration: 5,
                expected: 25,
            }));

        it("quality should drop to 0 once the sell by date has passed", () =>
            qualityTest({
                item: Inventory.BackstagePass,
                sellIn: 10,
                quality: 0,
                duration: 11,
                expected: 0,
            }));

        it("quality should not increase beyond 50", () =>
            qualityTest({
                item: Inventory.BackstagePass,
                sellIn: 50,
                quality: 0,
                duration: 50,
                expected: 50,
            }));
    });
});
