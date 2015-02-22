# Bubbles's Coding Style

## Preface

### All code in any code-base should look like a single person typed it, no matter how many people contributed.
### I do not intend to impose my style preferences on other people's code or projects; if an existing common style exists, it should be respected.

> ### "Arguments over style are pointless. There should be a style guide, and you should follow it"
>_Rebecca_ _Murphey_

&nbsp;

> ### "Part of being a good steward to a successful project is realizing that writing code for yourself is a Bad Idea™. If thousands of people are using your code, then write your code for maximum clarity, not your personal preference of how to get clever within the spec."
>_Idan_ _Gazit_

## Whitespaces 
- Use soft indents (**spaces**) instead of real tabs.
- Set your editor's indent size to **2 chars**.
- If your editor supports it, always work with the "**show invisibles**" setting turned on. The benefits of this practice are:
  - Enforced **consistency**.
  - Eliminating _'end of line'_ (EOF) whitespace.
  - Eliminating _'blank line'_ whitespace.
  - _Commits_ and _diffs_ are **easier to read**.

## Beautiful Syntax
### Parens, Braces, Linebreaks

`if/else/for/while/try` always have **spaces**, **braces** and **span multiple lines**
This encourages **readability**

Examples of really **cramped syntax**:

```javascript
  if(condition) doSomething();

  while(condition) iterating++;

  for(var i=0;i<100;i++) someIterativeFn();
```

Use **whitespace** to promote **readability**

```javascript
  if ( condition ) {
    // statements
  }

  while ( condition ) {
    // statements
  }

  for ( var i = 0; i < 100; i++ ) {
    // statements
  }
```

Even better:

```javascript
  var i,
    length = 100;

  for ( i = 0; i < length; i++ ) {
    // statements
  }
```

Or...

```javascript
  var i = 0,
    length = 100;

  for ( ; i < length; i++ ) {
    // statements
  }

  var prop;

  for ( prop in object ) {
    // statements
  }


  if ( true ) {
    // statements
  } else {
    // statements
  }
```

### Assignments, Declarations, Functions ( Named, Expression, Constructor )

#### Variables
  
```javascript
var foo = "bar",
  num = 1,
  undef;
```

#### Literal notations

```javascript
  var array = [],
    object = {};
```

- Using only one _**`var`**_ per scope (function) promotes readability and keeps your declaration list free of clutter (also saves a few keystrokes)

	- **Bad**:

	```javascript
		var foo = "";
		var bar = "";
		var qux;
	```

	- **Good**:

	```javascript
		var foo = "",
  		bar = "",
  		qux;
    
		// or..
  
		var // Comment on these
		foo = "",
		bar = "",
		quux;
	```

- `var` statements should always be in the beginning of their respective scope (function):

	- **Bad**:
  
  ```javascript
	function foo() {

  	// some statements here

  	var bar = "",
    	qux;
	}
  ```

	- **Good**:
  
  ```javascript
	function foo() {
  	var bar = "",
    	qux;

  	// all statements after the variables declarations.
	}
  ```

- `const` and `let`, from **ECMAScript 6**, should likewise be at the top of their scope (block).

	- **Bad**:
  
  ```javascript
	function foo() {
  	let foo,
    	bar;
  	if (condition) {
    	bar = "";
    	// statements
  	}
	}
  ```
  
	- **Good**:
  
  ```javascript
	function foo() {
  	let foo;
  	if (condition) {
    	let bar = "";
    	// statements
  	}
	}
	```

- Named Function Declaration

```javascript
function foo( arg1, argN ) {

}

// Usage
foo( arg1, argN );
```

- Named Function Declaration'

```javascript
function square( number ) {
  return number * number;
}

// Usage
square( 10 );

// Really contrived continuation passing style
function square( number, callback ) {
  callback( number * number );
}

square( 10, function( square ) {
  // callback statements
});
```

- Function Expression

```javascript
var square = function( number ) {
  // Return something valuable and relevant
  return number * number;
};

// Function Expression with Identifier
// This preferred form has the added value of being
// able to call itself and have an identity in stack traces:
var factorial = function factorial( number ) {
  if ( number < 2 ) {
    return 1;
  }

  return number * factorial( number - 1 );
};
```

- Constructor Declaration

```javascript
function FooBar( options ) {

  this.options = options;
}

// Usage
var fooBar = new FooBar({ a: "alpha" });

fooBar.options;
// { a: "alpha" }
```

### Exceptions, Slight Deviations

#### Functions with callbacks

```javascript
foo(function() {
  // Note there is no extra space between the first paren
  // of the executing function call and the word "function"
});

// Function accepting an array, no space
foo([ "alpha", "beta" ]);
```

#### Function accepting an object, no space

```javascript
foo({
  a: "alpha",
  b: "beta"
});

// Single argument string literal, no space
foo("bar");

// Inner grouping parens, no space
if ( !("foo" in obj) ) {

}
```

### Consistency Always Wins

In previous sections, the whitespace rules are set forth as a recommendation with a simpler, higher purpose: consistency.
It's important to note that formatting preferences, such as "inner whitespace" should be considered optional, but only one style should exist across the entire source of your project.

```javascript
if (condition) {
  // statements
}

while (condition) {
  // statements
}

for (var i = 0; i < 100; i++) {
  // statements
}

if (true) {
  // statements
} else {
  // statements
}
```

> **NOTE:**

> Whitespace can ruin diffs and make changesets impossible to read. Consider incorporating a pre-commit hook that removes end-of-line whitespace and blanks spaces on empty lines automatically.

## Type Checking (Courtesy jQuery Core Style Guidelines)

### Actual Types

#### String:

    typeof variable === "string"

#### Number:

    typeof variable === "number"

#### Boolean:

    typeof variable === "boolean"

#### Object:

    typeof variable === "object"

#### Array:

    Array.isArray( arrayLikeObject )
    (wherever possible)

#### Node:

    elem.nodeType === 1

#### null:

    variable === null

#### null or undefined:

    variable == null

#### undefined:

  - Global Variables:

    	typeof variable === "undefined"

  - Local Variables:

    	variable === undefined

  - Properties:

    	object.prop === undefined
    	object.hasOwnProperty( prop )
    	"prop" in object`

### Coerced Types

Consider the implications of the following...

Given this HTML:

```html
<input type="text" id="foo-input" value="1">
```

```javascript
// `foo` has been declared with the value `0` and its type is `number`
var foo = 0;

// typeof foo;
// "number"
...

// Somewhere later in your code, you need to update `foo`
// with a new value derived from an input element

foo = document.getElementById("foo-input").value;

// If you were to test `typeof foo` now, the result would be `string`
// This means that if you had logic that tested `foo` like:

if ( foo === 1 ) {

	importantTask();

}

// `importantTask()` would never be evaluated, even though `foo` has a value of "1"
```

```javascript
// You can preempt issues by using smart coercion with unary + or - operators:

foo = +document.getElementById("foo-input").value;
//    ^ unary + operator will convert its right side operand to a number

// typeof foo;
// "number"

if ( foo === 1 ) {

  importantTask();

}

// `importantTask()` will be called
```

Here are some common cases along with **coercions**:


```javascript
var number = 1,
  string = "1",
  bool = false;

number;
// 1

number + "";
// "1"

string;
// "1"

+string;
// 1

+string++;
// 1

string;
// 2

bool;
// false

+bool;
// 0

bool + "";
// "false"
```

```javascript
var number = 1,
  string = "1",
  bool = true;

string === number;
// false

string === number + "";
// true

+string === number;
// true

bool === number;
// false

+bool === number;
// true

bool === string;
// false

bool === !!string;
// true
```

- **Bad**:

	```javascript
	var array = [ "a", "b", "c" ];

	!!~array.indexOf("a");
	// true

	!!~array.indexOf("b");
	// true

	!!~array.indexOf("c");
	// true

	!!~array.indexOf("d");
	// false
	```

- **Good**:
  
  > Note that the above should be considered "unnecessarily clever"
	> Prefer the obvious approach of comparing the returned value of
	> indexOf.

	```javascript
	if ( array.indexOf( "a" ) >= 0 ) {
	  // ...
	}
	```

```javascript
var num = 2.5;

parseInt( num, 10 );

// is the same as...

~~num;

num >> 0;

num >>> 0;

// All result in 2


// Keep in mind however, that negative numbers will be treated differently...

var neg = -2.5;

parseInt( neg, 10 );

// is the same as...

~~neg;

neg >> 0;

// All result in -2
// However...

neg >>> 0;

// Will result in 4294967294

```

## Conditional Evaluation

### When only evaluating that an array has length
instead of this:

```javascript
if ( array.length > 0 ) ...
```

...evaluate truthiness, like this:

```javascript
if ( array.length ) ...
```

### When only evaluating that an array is empty

instead of this:

```javascript
if ( array.length === 0 ) ...
```

...evaluate truthiness, like this:

```javascript
if ( !array.length ) ...
```

### When only evaluating that a string is not empty

instead of this:

```javascript
if ( string !== "" ) ...
```

...evaluate truthiness, like this:

```javascript
if ( string ) ...
```

### When only evaluating that a string _is_ empty

instead of this:

```javascript
if ( string === "" ) ...
```

...evaluate falsy-ness, like this:

```javascript
if ( !string ) ...
```

### When only evaluating that a reference is true

instead of this:

```javascript
if ( foo === true ) ...
```

...evaluate like you mean it, take advantage of built in capabilities:

```javascript
if ( foo ) ...
```

### When evaluating that a reference is false

instead of this:

```javascript
if ( foo === false ) ...
```

...use negation to coerce a true evaluation

```javascript
if ( !foo ) ...
```

...Be careful, this will also match: 0, "", null, undefined, NaN
### If you _MUST_ test for a boolean false, then use

```javascript
if ( foo === false ) ...
```

### When only evaluating a ref that might be null or undefined, but NOT false, "" or 0

instead of this:

```javascript
if ( foo === null || foo === undefined ) ...
```

...take advantage of == type coercion, like this:

```javascript
if ( foo == null ) ...

// Remember, using == will match a `null` to BOTH `null` and `undefined`
// but not `false`, "" or 0
null == undefined
```
### <u>_ALWAYS_</u> evaluate for the best, most accurate result - the above is a guideline, not a dogma.

```javascript
// Type coercion and evaluation notes

// Prefer `===` over `==` (unless the case requires loose type evaluation)

// === does not coerce type, which means that:

"1" === 1;
// false

// == does coerce type, which means that:

"1" == 1;
// true

// Booleans, Truthies & Falsies

// Booleans:
true, false

// Truthy:
"foo", 1

// Falsy:
"", 0, null, undefined, NaN, void 0
```

## Naming

### You are not a human code compiler/compressor, so don't try to be one.

The following code is an example of egregious naming:

```javascript
// Example of code with poor names

function q(s) {
  return document.querySelectorAll(s);
}
var i,a=[],els=q("#foo");
for(i=0;i<>els.length;i++){a.push(els[i]);}
```

Without a doubt, you've written code like this - hopefully that ends today.

Here's the same piece of logic, but with kinder, more thoughtful naming (and a readable structure):

```javascript
// Example of code with improved names

function query( selector ) {
  return document.querySelectorAll( selector );
}

var idx = 0,
  elements = [],
  matches = query("#foo"),
  length = matches.length;

for ( ; idx < length; idx++ ) {
  elements.push( matches[ idx ] );
}
```

A few additional naming pointers:

### Naming strings

`dog` is a string


### Naming arrays

`dogs` is an array of `dog` strings

### Naming functions, objects, instances, etc

**camelCase** => `function` and `var` declarations

### Naming constructors, prototypes, etc.

**PascalCase** => constructor function

### Naming regular expressions

```javascript
rDesc = //;
```

### From the Google Closure Library Style Guide

```javascript
functionNamesLikeThis;
variableNamesLikeThis;
ConstructorNamesLikeThis;
EnumNamesLikeThis;
methodNamesLikeThis;
SYMBOLIC_CONSTANTS_LIKE_THIS;
```

### Faces of `this`

Beyond the generally well known use cases of `call` and `apply`, always prefer `.bind( this )` or a functional equivalent, for creating `BoundFunction` definitions for later invocation. Only resort to aliasing when no preferable option is available.

```javascript
function Device( opts ) {

  this.value = null;

  // open an async stream,
  // this will be called continuously
  stream.read( opts.path, function( data ) {

    // Update this instance's current value
    // with the most recent value from the
    // data stream
    this.value = data;

}.bind(this) );

// Throttle the frequency of events emitted from
  // this Device instance
  setInterval(function() {

    // Emit a throttled event
    this.emit("event");

  }.bind(this), opts.freq || 100 );
}

// Just pretend we've inherited EventEmitter ;)
```

When unavailable, functional equivalents to `.bind` exist in many modern JavaScript libraries.


```javascript
// eg. lodash/underscore, _.bind()
function Device( opts ) {

  this.value = null;

  stream.read( opts.path, _.bind(function( data ) {

    this.value = data;

  }, this) );

  setInterval(_.bind(function() {

    this.emit("event");

    }, this), opts.freq || 100 );
  }

  // eg. jQuery.proxy
  function Device( opts ) {

  this.value = null;

  stream.read( opts.path, jQuery.proxy(function( data ) {

    this.value = data;

  }, this) );

  setInterval( jQuery.proxy(function() {

    this.emit("event");

  }, this), opts.freq || 100 );
}

// eg. dojo.hitch
function Device( opts ) {

  this.value = null;

  stream.read( opts.path, dojo.hitch( this, function( data ) {

    this.value = data;

  }) );

  setInterval( dojo.hitch( this, function() {

    this.emit("event");

  }), opts.freq || 100 );
}
```

As a last resort, create an alias to `this` using `self` as an Identifier. This is **extremely bug prone** and <u>**should be avoided whenever possible**</u>.

```javascript
function Device( opts ) {
  var self = this;

  this.value = null;

  stream.read( opts.path, function( data ) {

    self.value = data;

  });

  setInterval(function() {

    self.emit("event");

  }, opts.freq || 100 );
}
```

### Use `thisArg`

Several prototype methods of ES 5.1 built-ins come with a special `thisArg` signature, which should be used whenever possible

```javascript

var obj;

obj = { f: "foo", b: "bar", q: "qux" };

Object.keys( obj ).forEach(function( key ) {

  // |this| now refers to `obj`

  console.log( this[ key ] );

}, obj ); // <-- the last arg is `thisArg`

// Prints...

// "foo"
// "bar"
// "qux"
```

`thisArg` can be used with `Array.prototype.every`, `Array.prototype.forEach`, `Array.prototype.some`, `Array.prototype.map`, `Array.prototype.filter`

## Misc

This section will serve to illustrate ideas and concepts that should not be considered dogma, but instead exists to encourage questioning practices in an attempt to find better ways to do common JavaScript programming tasks.

### Using `switch` should be avoided, modern method tracing will blacklist functions with switch statements

There seems to be drastic improvements to the execution of `switch` statements in latest releases of Firefox and Chrome.
http://jsperf.com/switch-vs-object-literal-vs-module

Notable improvements can be witnessed here as well:
https://github.com/rwldrn/idiomatic.js/issues/13

### Early `return`s promote code readability with negligible performance difference

- **Bad**:

	```javascript
	function returnLate( foo ) {
  	var ret;

  	if ( foo ) {
  	  ret = "foo";
  	} else {
  	  ret = "quux";
  	}
  	return ret;
	}
  ```

- **Good**:

	```javascript
	function returnEarly( foo ) {

  	if ( foo ) {
  	  return "foo";
  	}
  	return "quux";
	}
```

## The basic principle

### Don't do stupid shit and everything will be ok.

## Comments

- _Single line_ *above the code* that is subject
- _Multiline_ is *good*
- _End of line comments_ are *prohibited!*

----------------------------------------------------
> This document is and adaptation of @rwaldron's '[Idiomatic Javascript](https://github.com/rwaldron/idiomatic.js/blob/master/readme.md)' by Rodrigo González López.
