/*
 * object.pickomit <https://github.com/furkanisitan/object.pickomit>
 *
 * Copyright (c) 2020, Furkan Işıtan.
 * Released under the MIT License.
 */

'use strict';

require('mocha');
const assert = require('assert');
const pickOmit = require('./');

describe('pickOmit.select()', function () {

    it('should pick a property from an object', function () {
        assert.deepStrictEqual(pickOmit.select({ a: 'a', b: 'b', c: 'c' }, 'a'), { a: 'a' });
        assert.deepStrictEqual(pickOmit.select({ a: 'a', b: 'b', c: 'c' }, ['a']), { a: 'a' });
    });

    it('should pick two property from an object', function () {
        assert.deepStrictEqual(pickOmit.select({ a: 'a', b: 'b', c: 'c' }, 'a b'), { a: 'a', b: 'b' });
        assert.deepStrictEqual(pickOmit.select({ a: 'a', b: 'b', c: 'c' }, ['a', 'b']), { a: 'a', b: 'b' });
    });

    it('should omit a property from the object', function () {
        assert.deepStrictEqual(pickOmit.select({ a: 'a', b: 'b', c: 'c' }, '-a'), { b: 'b', c: 'c' });
        assert.deepStrictEqual(pickOmit.select({ a: 'a', b: 'b', c: 'c' }, ['-a']), { b: 'b', c: 'c' });
    });

    it('should omit two property from the object', function () {
        assert.deepStrictEqual(pickOmit.select({ a: 'a', b: 'b', c: 'c' }, '-a -b'), { c: 'c' });
        assert.deepStrictEqual(pickOmit.select({ a: 'a', b: 'b', c: 'c' }, ['-a', '-b']), { c: 'c' });
    });

    it('should return the same object when no paths passed', function () {
        assert.deepStrictEqual(pickOmit.select({ a: 'a', b: 'b', c: 'c' }), { a: 'a', b: 'b', c: 'c' });
    });

    it('should return an empty object', function () {
        assert.deepStrictEqual(pickOmit.select(), {});
        assert.deepStrictEqual(pickOmit.select("string", 'a'), {});
        assert.deepStrictEqual(pickOmit.select([1, 2, 3], 'a'), {});
    });

    it('should throw exception when paths have a mix of inclusion and exclusion', function () {
        assert.throws(() => {
            pickOmit.select({ a: 'a', b: 'b', c: 'c' }, 'a -b')
        }, Error);
    });

});

pickOmit.setDefaultPicks('a');

describe('pickOmit.setDefaultPicks().select()', function () {

    it('return object should contain key "a"', function () {
        assert.deepStrictEqual(pickOmit.select({ a: 'a', b: 'b', c: 'c' }, 'b'), { a: 'a', b: 'b' });
    });

    it('return object should contain key "a" not contain key "b"', function () {
        assert.deepStrictEqual(pickOmit.select({ a: 'a', b: 'b', c: 'c' }, '-b'), { a: 'a', c: 'c' });
    });

    it('return object should not contain keys "a" and "b"', function () {
        assert.deepStrictEqual(pickOmit.select({ a: 'a', b: 'b', c: 'c' }, '-a -b'), {  c: 'c' });
    });

    it('should not throw exception when paths have a mix of inclusion and exclusion for default pick paths', function () {
        assert.deepStrictEqual(pickOmit.select({ a: 'a', b: 'b', c: 'c' }, '-a b'), {  b: 'b' });
    });
});