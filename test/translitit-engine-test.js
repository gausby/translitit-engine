/* global assert require */
/*jslint maxlen:140*/
'use strict';

var translitit = require('../lib/translitit-engine'),
    buster = require('buster'),
    assert = buster.assertions.assert,
    refute = buster.assertions.refute
;

buster.testCase('A translit engine', {
    'should return a function': function () {
        assert.isFunction(translitit());
    },

    'should return empty string for empty input': function () {
        var translit = translitit({'á': 'a'});

        assert.equals(translit(), '');
    },

    'should return empty string for falsy input': function () {
        var translit = translitit({'á': 'a'});

        assert.equals(translit(undefined), '');
        assert.equals(translit(false), '');
        assert.equals(translit(null), '');
    },

    'should transliterate all occurrences of a subject in a string': function () {
        var test = translitit({'a': 'b'});

        assert.equals(test('abaca'), 'bbbcb');
    },

    'should transliterate a string with accents': function () {
        var test = translitit({'é': 'e'});

        assert.equals(test('écoute'), 'ecoute');
    },

    'should transliterate a string with two or more accents': function () {
        var test = translitit({'é': 'e', 'á': 'a', 'å': 'a'});

        assert.equals(test('ézáxxå'), 'ezaxxa');
    },

    'should handle keys with more than one letter first': function () {
        var test = translitit({
            'á': 'a',
            'z': 's',
            'éz': 'es',
            'å': 'a',
            'é': 'e'
        });

        assert.equals(test('ézámmå'), 'esamma');
    },

    'should try to use the toString function if the input has one': function () {
        var test = translitit({'1': '2', 'ë': 'e', 'ö': 'o'});

        // build a simple object with a toString function attached
        function Test () {}

        Test.prototype.toString = function () {
            return 'Hëllö, wörld!';
        };

        assert.equals(test(1), '2');
        assert.equals(test(new Test()), 'Hello, world!');
    },

    'should still work if it only receive \'special cases\'': function () {
        var translit = translitit({'ae': 'æ', 'oe': 'ø', 'aa': 'å'});

        assert.equals(
            translit('Paa oeen i aaen staar et trae.'),
            'På øen i åen står et træ.'
        );
    }
});

buster.testCase('Claims made in documentation', {
    'section about usage': function () {
        var transliterationTable = {
            'ç': 'c',
            'é': 'e'
            // etc...
        };
        var transliterate = translitit(transliterationTable);

        assert.equals(transliterate('écoule'), 'ecoule');
        assert.equals(transliterate('ça va?'), 'ca va?');
    },

    'section about how it works': function () {
        var table = {
            'å': 'aa',
            'Å': 'Aa',
            'æ': 'ae',
            'Æ': 'Ae',
            'ø': 'oe',
            'Ø': 'Oe'
        };

        var transliterate = translitit(table);
        assert.equals(
            transliterate('På øen i søen stod et træ.'),
            'Paa oeen i soeen stod et trae.'
        );
    }
});
