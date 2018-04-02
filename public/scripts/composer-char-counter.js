$(function() {
  $("#tweet-text").on("keyup", function() {
    let $tweetLength = $(this).val().length;
    let $counter = $(this).siblings("span.counter");

    $counter.text(140 - $tweetLength);
    if ($tweetLength > 140) {
      $counter.css("color", "red");
    } else {
      $counter.css("color", "black");
    }
  })
})