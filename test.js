const _      = require('lodash');
const modeler = require('./index.js');

const equals = (value, target) => {
  return _.differenceWith([value], [target], _.isEqual).length === 0;
};

const test = (value, target) => {
  console.log(equals(value, target));
};

test(modeler.parse('string'), {
  type: 'string'
});

test(modeler.parse(1.5), {
  type: 'number'
});

test(modeler.parse(true), {
  type: 'boolean'
});

test(modeler.parse([1]), {
  "type": "array",
  "items": {
    "type": "integer"
  }
});

test(modeler.parse({
  "address": {
    "streetAddress": "21 2nd Street",
    "city": "New York"
  },
  "phoneNumber": [
    {
      "location": "home",
      "code": 44
    }
  ]
}), {
  "type": "object",
  "properties": {
    "address": {
      "type": "object",
      "properties": {
        "streetAddress": {
          "type": "string"
        },
        "city": {
          "type": "string"
        }
      },
      "required": [
        "streetAddress",
        "city"
      ]
    },
    "phoneNumber": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "location": {
            "type": "string"
          },
          "code": {
            "type": "integer"
          }
        },
        "required": [
          "location",
          "code"
        ]
      }
    }
  },
  "required": [
    "address",
    "phoneNumber"
  ]
});
