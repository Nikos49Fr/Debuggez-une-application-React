/**
 *
 */

import { getMonth } from './index';

describe('Date helper', () => {
    describe('When getMonth is called', () => {
        it('the function return janvier for 2022-01-01 as date', () => {
            expect(getMonth(new Date('2022-01-01'))).toBe('janvier');
        });

        it('the function return juillet for 2022-07-08 as date', () => {
            expect(getMonth(new Date('2022-07-08'))).toBe('juillet');
        });

        it('the function return décembre for 2026-12-25', () => {
            expect(getMonth(new Date('2026-12-25'))).toBe('décembre');
        });
    });
});
