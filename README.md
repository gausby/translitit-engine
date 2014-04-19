Translitit Engine
=====================
A simple transliteration engine, build for commonjs environments, such as [Node](http://nodejs.org/).

It comes with no transliteration tables. A transliteration table has to be given on initialization. This makes it flexible, and the resulting transliteration function nimbler. Some distributions package the engine with a transliteration table, and are ready to go, examples of these can be found in the 'Projects using the Translitit Engine'-section.

This project was inspired by two transliteration projects made by the github users [Podviaznikov][podviaznikov] and [Staltec][staltec], who made two similar projects. Another transliteration engine project is [Eldargab's][eldargab] project [translit][translit]. It is kinda similar to this one, but it has a slightly different approach. Be sure to check that out before choosing on your transliteration engine.

[podviaznikov]: https://github.com/podviaznikov/
[staltec]: https://github.com/staltec/
[eldargab]: https://github.com/eldargab/
[translit]: https://github.com/eldargab/translit


## Usage
The transliteration engine need a table to do its transliteration from. A transliteration table is a simple key-value object that is given to the engine as an argument upon initialization.

    var translitEngine = require('translitit-engine');
    var transliterationTable = {
      'á': 'a',
      'é': 'e'
      // etc...
    }
    var transliterate = translitEngine(transliterationTable);

    transliterate('écoule'); // returns 'ecoule';
    transliterate('ça va?'); // returns 'ca va?';

This is all there is to it. Keep reusing the same transliteration instance to allow the interpreter to optimize over time.


## Projects using the Translitit Engine

The following projects use the translitit engine:

  * [translitit-cyrillic-russian-to-latin][translitit-cyrillic-russian-to-latin]
  * [translitit-cyrillic-ukrainian-to-latin][translitit-cyrillic-ukrainian-to-latin]
  * [translitit-latin-to-mkhedruli-georgian][translitit-latin-to-mkhedruli-georgian]

**Notice**: Please follow the same naming structure if you create your own transliteration table, and add it to this list and create a pull request.

[translitit-cyrillic-russian-to-latin]: https://github.com/gausby/translitit-cyrillic-russian-to-latin/
[translitit-cyrillic-ukrainian-to-latin]: https://github.com/gausby/translitit-cyrillic-ukrainian-to-latin/
[translitit-latin-to-mkhedruli-georgian]: https://github.com/batumi/translitit-latin-to-mkhedruli-georgian

## How it works
It creates a regular expression from the given transliteration table object. This regular expression is used in the returned function to find and replace occurrences in the given input string.

The following transliteration table would result in the following regular expression:

    var transliterateEngine = require('translitit-engine');
    var table = {
      'aa': 'å',
      'á': 'a',
      'é': 'e'
      'oe': 'ø',
    }

    var transliterate = transliterateEngine(table);
    // ´transliterate´ will use the following regexp: /oe|aa|[áé]/g

The keys in the object will get sorted, and the longest keys will be put it the beginning of the regular expression. Single letter keys will be tried last.

A function that takes a string as an input will be returned.

    var transliterateEngine = require('translitit-engine');
    var table = {
      'å': 'aa', 'Å': 'Aa',
      'æ': 'ae', 'Æ': 'Ae',
      'ø': 'oe', 'Ø': 'Oe'
    };

    var transliterate = transliterateEngine(table);
    console.log(transliterate('På øen i søen stod et træ.'));
    // Returns: 'Paa oeen i soeen stod et trae.'

If a character is not found it will just get passed through.

**Notice**, even though it all ends up as a regular expression, we can not use complex regular expressions as keys, because a key like `\bI` would look for the value `I` in the transliteration table, omitting the word boundary part. Support for such keys might be added later, and they would most likely be implemented as pre- and/or post-processors; functions that could get parsed to the transliteration engine and do more advanced stuff.


## Translitit Engine Development
After cloning the project you will have to run `npm install` in the project root. This will install the various grunt plugins and other dependencies.


### QA tools
The QA tools rely on the [Grunt](http://gruntjs.com) task runner. To run any of these tools, you will need the grunt-cli installed globally on your system. This is easily done by typing the following in a terminal.

    $ npm install grunt-cli -g

The unit tests will need the [Buster](http://busterjs.org/) unit test framework.

    $ npm install -g buster

These two commands will install the buster and grunt commands on your system. These can be removed by typing `npm uninstall buster -g` and `npm uninstall grunt-cli -g`.


#### Unit Tests
When developing you want to run the script watcher. Navigate to the project root and type the following in your terminal.

    $ grunt watch:scripts

This will run the jshint and tests each time a file has been modified.


## License
The MIT License (MIT)

Copyright (c) 2013 Martin Gausby

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
