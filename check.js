(function(window, document, undefined) {
  var _Amelia = function (params) {
    return new Amelia (params);
  };

  var Amelia = function (params) {
    var selector = document.querySelectorAll(params),
      i = 0;
    this.length = selector.length;
    this.version = '0.0.0';
    for (; i < this.length ; i++) {
      this[i] = selector[i];
    }

    // return the object
    return this;
  }

  Amelia.fn = Amelia.prototype = {
    hide: function () {
      var len = this.length;

      while (len--) {
        this[len].style.display = 'none';
      };

      return this;
    }
  };
  var checkStrength = function () {
    var get = {
      strength: function (p) {
        var length = p.length,
            uppercase = p.replace(/[^A-Z]/g, '').length,
            lowercase = p.replace(/[^a-z]/g, '').length,
            numbers = p.replace(/[^0-9]/g, '').length,
            symbols = p.replace(/[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/, '').length,
            consecutiveUppercase = p.split(/[^A-Z]/g),
            consecutiveLowercase = p.split(/[^a-z]/g),
            consecutiveNumbers = p.split(/[^0-9]/g),
            consecutiveSymbols = p.split(/[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/),
            //sequentialLetters = p.split(/[^A-Z,a-z]/g),
            requirementsCount = 0,
            score = {
                total: 0,
                validLength: false,
                symbols: false,
                numbers: false,
                uppercase: false,
                lowercase: false 
            };
        
        var scoreAdd = {
            length: length * 4,
            uppercase: uppercase > 0 ? (length - uppercase) * 2 : 0, // (len - n) * 2
            lowercase: lowercase > 0 ? (length - lowercase) * 2 : 0, // (len - n) * 2
            numbers: numbers * 4,
            symbols: symbols * 6,
            requirements: 0
        },
        scoreDeduct = {
            letters: uppercase + lowercase === length ? length : 0,
            numbers: numbers === length ? length : 0,
            consecutiveUppercase: 0,
            consecutiveLowercase: 0,
            consecutiveNumbers: 0,
            sequentialLetters: 0,
            sequentialNumbers: 0,
            sequentialSymbols: 0
        };

        // determine if at least the basic length and 3 of the secondary requirements are met
        if (length >= 8) {
            requirementsCount++;
            score.validLength = true;
            if (uppercase !== 0) { requirementsCount++; score.uppercase = true; } // add or remove one for uppercase letters
            if (lowercase !== 0) { requirementsCount++; score.lowercase = true; } // add or remove one for lowercase letters
            if (numbers !== 0) { requirementsCount++; score.numbers = true; } // add or remove one for numbers
            if (symbols !== 0) { requirementsCount++; score.symbols = true; } // add or remove one for symbols

            // tally the score addition if the count is at 4 or highter
            if (requirementsCount >= 4) {
                scoreAdd.requirements = requirementsCount * 2;
            }
        }

        // count the consecutive Uppercase letters
        angular.forEach(consecutiveUppercase, function (array) {
            if (array.length > 1) {
                scoreDeduct.consecutiveUppercase += (array.length - 1) * 2;
            }
        });
        // count the consecutive Lowercase letters
        angular.forEach(consecutiveLowercase, function (array) {
            if (array.length > 1) {
                scoreDeduct.consecutiveLowercase += (array.length - 1) * 2;
            }
        });
        // count the consecutive numbers
        angular.forEach(consecutiveNumbers, function (array) {
            if (array.length > 1) {
                scoreDeduct.consecutiveNumbers += (array.length - 1) * 2;
            }
        });
        // count the sequential symbols
        angular.forEach(consecutiveSymbols, function (array) {
            if (array.length >= 3) {
                scoreDeduct.sequentialSymbols += (array.length - 2) * 3;
            }
        });

        // Add to the score
        angular.forEach(scoreAdd, function (value) {
            score.total += value;
        });

        // deduct from the score
        angular.forEach(scoreDeduct, function (value) {
            score.total -= value;
        });

        console.log('Score adds: ', scoreAdd);
        console.log('Score deducts: ', scoreDeduct);

        return score;

      }
    }
  };

  if (!window.Amelia) {
    window.Amelia = _Amelia;
  }
}(window, document));