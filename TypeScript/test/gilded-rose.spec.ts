import { expect } from 'chai';
import { Item, GildedRose, Inventory } from '../app/gilded-rose';

const simulateDays = (gildedRose: GildedRose, days: number) => {
    let items: Item[] = [];
    for (let i = 0; i < days; i += 1) {
        items = gildedRose.updateQuality();
    }
    return { items };
}

describe('Gilded Rose', function () {
    describe('General Items', () => {
        it('the quality of items should degrade by 1 at the end of each day', () => {
    
        });
    
        it ('the quality of items should degrade by 2 at the end of each day if their sell by date has passed', () => {
    
        });
    
        it('the quality of an item should never degrade below 0', () => {
    
        });
    });

    describe(Inventory.Sulfuras, () => {
        it('quality should never degrade', () => {
    
        });
    });

    describe(Inventory.AgedBrie, () => {
        it('quality should increase in quality by 1 at the end of each day', () => {
            const gildedRose = new GildedRose([ new Item(Inventory.AgedBrie, 20, 0) ]);
            const { items } = simulateDays(gildedRose, 20);
            expect(items[0].quality).to.equal(20);
        });

        it('quality should increase in quality by 2 at the end of each day after the sell by date has passed', () => {
            const gildedRose = new GildedRose([ new Item(Inventory.AgedBrie, 0, 0) ]);
            const { items } = simulateDays(gildedRose, 20);
            expect(items[0].quality).to.equal(40);
        });

        it('quality should not increase beyond 50', () => {
            const gildedRose = new GildedRose([ new Item(Inventory.AgedBrie, 0, 0) ]);
            const { items } = simulateDays(gildedRose, 100);
            expect(items[0].quality).to.equal(50);
        });
    });

    describe(Inventory.BackstagePass, () => {
        it('quality should increase by 1 at the end of each day when its sell by date is more than 10 days away', () => {

        });

        it('quality should increase by 2 at the end of each day when its sell by date is between 6-10 days away', () => {

        });

        it('quality should increase by 3 at the end of each day when its sell by date is between 0-5 days away', () => {

        });

        it('quality should drop to 0 once the sell by date has passed', () => {

        });

        it('quality should not increase beyond 50', () => {

        });
    });
});
