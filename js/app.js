const cardArray = Array.from(document.getElementsByClassName('card'));
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
  cardArray.forEach(function(obj) {
    obj.className += ' animated wobble';
  });
  moveCount = 0;
  min = 0;
  sec = 0;
  moveCounter();
  clearInterval(timeId);
  document.querySelector('.chrono').innerHTML = '00:00';
  return
}

function startTimer() {
  min = 0;
  sec = 0;
  time = new Date();
  timeStart = time.getTime();
  console.log('start timer');
  clearInterval(timeId);
  timeId = setInterval(timer, 1000);

  return
}

function timer() {
  curTime = new Date();
  elapsed = curTime.getTime();
  if (document.querySelectorAll('.animated').length == 16) {
    return;
  } else if (elapsed > timeStart) {
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
  return
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
  return
}

function noMatch(ele) {
  faceUp = document.querySelectorAll('.face-up');
  clearAnim();
  for (i = 0; i < faceUp.length; i++) {
    faceUp[i].className += ' wrong animated shake';
    faceUp[i].classList.remove('face-up');
  }
  setTimeout(clearAnim, 750);
  return
}

function win(ele) {
  clearAnim();
  return
}
// Clears animation classes (manually add all animation classes used to .remove statement)
function clearAnim() {
  toClear = document.querySelectorAll('.animated');
  for (i = 0; i < toClear.length; i++) {
    toClear[i].classList.remove('animated','wrong', 'wobble', 'bounceIn', 'tada', 'shake');
  }
  return
}
//Event Listeners
  //Reset Button
document.querySelector('.reset').addEventListener('click', function() {
  cardArray.shuffle();
  return
});
  //Play Again Button
document.querySelector('.again-button').addEventListener('click', function() {
  cardArray.shuffle();
  return
});
  //Card listeners
cardArray.forEach(function(check) {
  check.addEventListener("click", function() {
    anim = document.querySelectorAll('.animated');
    match = document.querySelectorAll('.match');
    faceUp = document.querySelectorAll('.face-up');
    if ((anim.length == 16) && (match.length < 16)) {
      clearAnim();
      turnCard(check);
      if (document.querySelector('.chrono').innerHTML == '00:00') {
        startTimer();
      }
    } else if (faceUp.length == 2) {
      console.log('ANIMATION');
      return
    } else if ((faceUp.length == 1) && (check.classList.contains('face-up') == false)) {
      moveCount++;
      moveCounter();
      turnCard(check);
      setTimeout(function() {
        faceUp = document.querySelectorAll('.face-up');
        console.log('timeout');
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
    } else if ((check.classList.contains('face-up') || check.classList.contains('match') || (anim.length == 16))  == false) {
      turnCard(check);
      if (document.querySelector('.chrono').innerHTML == '00:00') {
        startTimer();
      }
      console.log('solo');
    }
    return
  });
});
