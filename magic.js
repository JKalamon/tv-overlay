var beginHour = moment(new Date(2000, 10, 20, 12, 00, 00));
setInterval(function () {
  beginHour.add("1", "second");
  $(".hour").text(`${beginHour.format("HH:mm:ss")}`);
}, 1000);

var warningCounter = 10;
setInterval(function () {
  if(warningCounter > 0){
    warningCounter--;
  }
  $(".counter").text(warningCounter);
}, 1000);

$.get("/messages.json", function (data) {
  console.log(data);
  var currentIndex = 0;
  var mainCurrentIndex = 0;
  var change = function () {
    $(".main-label .news-content")
      .animate({ opacity: 0 }, 1000, function () {
        if (data.mainMessages[mainCurrentIndex].length > 50) {
          $(this).addClass("small-text");
        } else {
          $(this).removeClass("small-text");
        }
        $(this).text(data.mainMessages[mainCurrentIndex]);
        mainCurrentIndex++;
        if (mainCurrentIndex > data.mainMessages.length - 1) {
          mainCurrentIndex = 0;
        }
      })
      .animate({ opacity: 1 }, 1000);
  };

  var change2 = function () {
    $(".small-news-label .news-content")
      .animate({ opacity: 0 }, 1000, function () {
        if (data.messages[currentIndex].length > 70) {
          $(this).addClass("small-text");
        } else {
          $(this).removeClass("small-text");
        }
        $(this).text(data.messages[currentIndex]);
        currentIndex++;
        if (currentIndex >= data.messages.length) {
          currentIndex = 0;
        }
      })
      .animate({ opacity: 1 }, 1000);
  };
  //setInterval(change2, 50000);
  setInterval(change, 50000);
  change();
  // change2();
  var xx = '';
  data.messages.forEach(element => {
    xx += element + "     ■     ";
  });
  $('.small-news-label .news-content').html(xx);
  $('.small-news-label .news-content').marquee({
    duration: 20000,
    duplicated: true,
    startVisible: true,
  });
});
