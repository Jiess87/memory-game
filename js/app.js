const deckArray = Array.from(document.getElementsByClassName('card'));
const deck = document.getElementsByClassName('card');

//Fisher-Yates shuffle function
Array.prototype.shuffle = function() {
  var input = this;

  for (var i = input.length-1; i >=0; i--) {

      var randomIndex = Math.floor(Math.random()*(i+1));
      var itemAtIndex = input[randomIndex];

      input[randomIndex] = input[i];
      input[i] = itemAtIndex;
  }
//Replaces deck HTML
  deckArray.forEach(function(newCard) {
    document.querySelector('.board').appendChild(newCard);
  });

  return deckArray;
}
