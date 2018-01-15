const cardArray = Array.from(document.querySelectorAll('.card'));
let rating = document.querySelectorAll('.rate');
let ratingShadow = document.querySelectorAll('.rate-shadow');
let moveCount = 0;
let time = new Date();
let timeStart = time.getTime();
let timeId;
let min = 0;
let sec = 0;

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
  cardArray.forEach(function(newCard) {
    newCard.className = 'card'
    document.querySelector('.board').appendChild(newCard);
  });
  //Shakes the cards
  clearAnim();
  clearRating();
  cardArray.forEach(function(obj) {
    obj.className += ' animated wobble';
  });
  moveCount = 0;
  min = 0;
  sec = 0;
  //Resets timer and move counter
  moveCounter();
  clearInterval(timeId);
  document.querySelector('.chrono').innerHTML = '00:00';
}

function startTimer() {
  min = 0;
  sec = 0;
  time = new Date();
  timeStart = time.getTime();
  console.log('start timer');
  clearInterval(timeId);
  timeId = setInterval(timer, 1000);
}

function timer() {
  curTime = new Date();
  elapsed = curTime.getTime();
  /*if (document.querySelectorAll('.animated').length == 16) {
    return;
  } else */ if (elapsed > timeStart) {
    sec++;
    if (sec == 60) {
      sec = 0;
      min++;
    }
    if ((sec < 10) && (min < 10)) {
      document.querySelector('.chrono').innerHTML = '0' + min + ':0' + sec;
    } else if ((sec >= 10) && (min < 10)) {
      document.querySelector('.chrono').innerHTML = '0' + min + ':' + sec;
    } else if ((sec < 10) && (min >= 10)) {
      document.querySelector('.chrono').innerHTML = min + ':0' + sec;
    } else if ((sec >= 10) && (min >= 10)) {
      document.querySelector('.chrono').innerHTML = min + ':' + sec;
    }
  }
}


function moveCounter() {
  if (moveCount == 1) {
    document.querySelector('.moves').innerHTML = moveCount + ' move this round';
  } else {
    document.querySelector('.moves').innerHTML = moveCount + ' moves this round';
  }
  ratingCheck();
}

function turnCard(ele) {
  clearAnim();
  ele.className += ' face-up animated bounceIn';
}

function cardMatch() {
  faceUp = document.querySelectorAll('.face-up');
  clearAnim();
  for (i = 0; i < faceUp.length; i++) {
    faceUp[i].className += ' match animated tada';
    faceUp[i].classList.remove('face-up');
  }
  setTimeout(clearAnim, 750);
}

function noMatch(ele) {
  faceUp = document.querySelectorAll('.face-up');
  clearAnim();
  for (i = 0; i < faceUp.length; i++) {
    faceUp[i].className += ' wrong animated shake';
    faceUp[i].classList.remove('face-up');
  }
  setTimeout(clearAnim, 750);
}

function ratingCheck() {
  console.log('ratingCheck');
  clearAnim()
  if (moveCount >= 12){
    rating[0].style.color = '#b5b0ba';
    rating[3].style.color = '#b5b0ba';
  }
  if (moveCount >= 18) {
    rating[1].style.color = '#b5b0ba';
    rating[4].style.color = '#b5b0ba';
  }
  if (moveCount >= 25) {
    rating[2].style.color = '#b5b0ba';
    rating[5].style.color = '#b5b0ba';
  }
}

function clearRating() {
  for (i = 0; i < rating.length; i++) {
    rating[i].style.color = '#849324';
  }
}

function win() {
  clearAnim();
  document.querySelector('.win-screen').style.display = 'initial';
  document.querySelector('.win-message').className += ' animated tada';
  document.querySelector('.time').innerHTML = document.querySelector('.chrono').innerHTML;
  document.querySelector('.move-count').innerHTML = moveCount;
  clearInterval(timeId);
}

// Clears animation classes (manually add all animation classes used to .remove statement)
function clearAnim() {
  toClear = document.querySelectorAll('.animated');
  for (i = 0; i < toClear.length; i++) {
    toClear[i].classList.remove('animated','wrong', 'wobble', 'bounceIn', 'tada', 'shake');
  }
}
//Event Listeners
  //Reset Button
document.querySelector('.reset').addEventListener('click', function() {
  cardArray.shuffle();
});
  //Play Again Button
document.querySelector('.again-button').addEventListener('click', function() {
  cardArray.shuffle();
  document.querySelector('.win-screen').style.display = 'none';
});
  //Card listeners
cardArray.forEach(function(check) {
  check.addEventListener("click", function() {
    anim = document.querySelectorAll('.animated');
    match = document.querySelectorAll('.match');
    faceUp = document.querySelectorAll('.face-up');
    //Blocks action if 2 cards are already shown
    if (faceUp.length == 2) {
      console.log('ANIMATION');
      return
    //If 1 card is already shown, increment move counter, turn the card
    } else if ((faceUp.length == 1) && ((check.classList.contains('face-up') || check.classList.contains('match')) == false)) {
      moveCount++;
      moveCounter();
      turnCard(check);
      setTimeout(function() {
        faceUp = document.querySelectorAll('.face-up');
        console.log('timeout');
        //Compare cards for match or no match
        if (faceUp[0].innerHTML == faceUp[1].innerHTML) {
          cardMatch(check);
          console.log('match');
          setTimeout(function() {
            match = document.querySelectorAll('.match');
            if (match.length == 16) {
              console.log('wincondition')
              win();
            }
          }, 1200);
        } else {
          noMatch(check);
          console.log('nomatch');
        }
      }, 750);
    //If no card is already selected, turn card and start timer if it needs to.
  } else if ((check.classList.contains('face-up') || check.classList.contains('match'))  == false) {
      turnCard(check);
      if (document.querySelector('.chrono').innerHTML == '00:00') {
        startTimer();
      }
      console.log('solo');
    }
  });
});
