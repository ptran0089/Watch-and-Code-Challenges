// console.log color
// '%c' + string/variable etc, 'color: green;'


var TinyTestHelper = {
    renderStats: function(numberOfTests, failures) {

        var successes = numberOfTests - failures;
        var statSum = document.createElement('h1');

        document.body.appendChild(statSum);

        statSum.innerHTML = 'Ran ' + numberOfTests + ' tests: ' + successes + ' successes, ' + failures + ' failures';
    }
}

var TinyTest = {

    run: function(tests) {
        var failures = 0;
        var numberOfTests = 0;

        for (var testName in tests) { // iterate through the properties of the object and run the Tinytest.run function for each property
            var testAction = tests[testName];
            try {
                numberOfTests++;
                testAction.apply(this);
                console.log('%c' + testName, 'color: green;');
            } catch (e) {
                failures++;
                console.groupCollapsed('%c' + testName, 'color: red;');
                console.error(e.stack);
                console.groupEnd();
            }
        }
        setTimeout(function() { // Give document a chance to complete
            if (window.document && document.body) {
                document.body.style.backgroundColor = (failures == 0 ? '#99ff99' : '#ff9999');

                TinyTestHelper.renderStats(numberOfTests, failures);

            }

        }, 0);
    },

    fail: function(msg) {
        throw new Error('fail(): ' + msg);
    },

    assert: function(value, msg) {
        if (!value) {
            throw new Error('assert(): ' + msg);
        }
    },

    assertEquals: function(expected, actual) {
        if (expected != actual) {
            throw new Error('assertEquals() "' + expected + '" != "' + actual + '"');
        }
    },

    assertStrictEquals: function(expected, actual) {
        if (expected !== actual) {
            throw new Error('assertStrictEquals() "' + expected + '" !== "' + actual + '"');
        }
    },

};

var fail               = TinyTest.fail.bind(TinyTest),
    assert             = TinyTest.assert.bind(TinyTest),
    assertEquals       = TinyTest.assertEquals.bind(TinyTest),
    eq                 = TinyTest.assertEquals.bind(TinyTest), // alias for assertEquals
    assertStrictEquals = TinyTest.assertStrictEquals.bind(TinyTest),
    tests              = TinyTest.run.bind(TinyTest);
