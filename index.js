/*
 * object.pickomit <https://github.com/furkanisitan/object.pickomit>
 *
 * Copyright (c) 2020, Furkan Işıtan.
 * Released under the MIT License.
 */

'use strict';

const isObject = require("isobject");

class PickOmit {

    #defaultPickKeys

    /**
     * Passed keys are included by default, unless otherwise specified.
     * @param {string|string[]} keys - The property keys for pick.
     * @returns {PickOmit}
     */
    setDefaultPicks(keys) {

        if (typeof keys === 'string')
            keys = keys.split(/\s+/);

        if (Array.isArray(keys))
            this.#defaultPickKeys = keys;
        return this;
    }

    /**
     * Returns a copy of the object based on which object properties are included or excluded.
     * If the key has a - in front, it is marked excluded, otherwise it is marked as included.
     * @param {Object} obj - The source object.
     * @param {string|string[]} keys - The property keys for pick or omit.
     * @returns {Object} - Returns the new object.
     */
    select(obj, keys) {

        if (!isObject(obj)) return {};
        if (keys === undefined) return obj;

        if (typeof keys === 'string')
            keys = keys.split(/\s+/);

        if (!Array.isArray(keys)) return {};

        const picks = [], omits = [], omitDefaultPicks = [];
        for (let key of keys) {

            if (key.startsWith('-')) {
                key = key.substring(1);
                this.#defaultPickKeys?.includes(key) ? omitDefaultPicks.push(key) : omits.push(key);
            } else picks.push(key)
        }

        if (omitDefaultPicks.length > 0)
            obj = this.#pickOrOmit(obj, omitDefaultPicks, false);

        if (omits.length > 0 && picks.length > 0)
            throw new Error("Keys cannot have a mix of inclusion and exclusion.");

        if (picks.length > 0)
            return this.#pickOrOmit(obj, picks.concat(this.#defaultPickKeys));
        return this.#pickOrOmit(obj, omits, false);
    }

    /**
     *
     * @param {Object} obj - The source object.
     * @param {string|string[]} keys - The property keys for pick or omit.
     * @param {boolean} pick - true => pick, false => omit
     * @returns {Object} - Returns the new object.
     * @private
     */
    #pickOrOmit(obj, keys, pick = true) {

        const res = {};
        for (const key in obj)
            if (keys?.includes(key) === pick) res[key] = obj[key];
        return res;
    }

}

module.exports = new PickOmit();
