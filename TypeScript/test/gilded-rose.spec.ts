import { expect } from 'chai';
import { Item, GildedRose } from '../app/gilded-rose';

describe('Gilded Rose', function () {
    it('should foo', function() {
        const gildedRose = new GildedRose([ new Item('foo', 0, 0) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].name).to.equal('fixme');
    });

    it('the quality of items should degrade by 1 at the end of each day', () => {

    });

    it ('the quality of items should degrade by 2 at the end of each day if their sell by date has passed', () => {

    });

    it('the quality of an item should never degrade below 0', () => {

    });

    describe('Sulfuras', () => {
        it('quality should never degrade', () => {
    
        });
    });

    describe('Aged Brie', () => {
        it('quality should increase in quality by 1 at the end of each day', () => {

        });

        it('quality should not increase beyond 50', () => {

        });
    });

    describe('Backstage Passes', () => {
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
