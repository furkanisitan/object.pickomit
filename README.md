# object.pickomit [![npm](https://img.shields.io/npm/v/object.pickomit)](https://www.npmjs.com/package/object.pickomit) 

> Returns a copy of the object based on which object properties are included or excluded.
> If the key has a - in front, it is marked excluded, otherwise it is marked as included.
> Also can be specified which properties will be included by default.

## Install

Install with [npm](https://www.npmjs.com/):

```sh
$ npm i object.pickomit
```

## Usage

```js
const pickOmit = require('object.pickomit');
```

To pick or omit, pass the `keys` as an array:

```js
pickOmit.select({ a: 'a', b: 'b', c: 'c', d: 'd' }, ['a', 'b'])
// pick => { a: 'a', b: 'b' }

pickOmit.select({ a: 'a', b: 'b', c: 'c', d: 'd' }, ['-a', '-b'])
// omit => { c: 'c', d: 'd' }
```

`keys` can also be pass as string.

```js
pickOmit.select({ a: 'a', b: 'b', c: 'c', d: 'd' }, 'a b')
// pick => { a: 'a', b: 'b' }

pickOmit.select({ a: 'a', b: 'b', c: 'c', d: 'd' }, '-a -b')
// omit => { c: 'c', d: 'd' }
```

Throws an error if pick and omit keys are passed together.

```js
pickOmit.select({ a: 'a', b: 'b', c: 'c', d: 'd' }, 'a -b')
// Error: Keys cannot have a mix of inclusion and exclusion.
```

### setDefaultPicks

It sets the keys to be picked by default even if they are not passed as parameters. Keys can be passed as string or
arrays as above.

```js
const pickOmit = require('object.pickomit').setDefaultPicks('a b');

pickOmit.select({ a: 'a', b: 'b', c: 'c', d: 'd' }, 'd')
// => { a: 'a', b: 'b', d: 'd' }
```

If the default pick keys are not wanted to be included, they are passed with a - in front of the key.

```js
pickOmit.select({ a: 'a', b: 'b', c: 'c', d: 'd' }, '-a d')
// => { b: 'b', d: 'd' }
```

### Author

**Furkan Işıtan**

* [github/furkanisitan](https://github.com/furkanisitan)

### License

Copyright © 2020, [Furkan Işıtan](https://github.com/furkanisitan)
Released under the [MIT License](LICENSE).
