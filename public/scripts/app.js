$(function () {

  function escape(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  //New tweets will always pop up as the first one from the top
  function renderTweets(tweets) {
    $(".tweets-container").empty();
    tweets.forEach(tweet => {
      const eachTweet = createTweetElement(tweet);
      $(".tweets-container").prepend(eachTweet);
    });
  }

  //Building a whole tweet element with js/jQuery instead of HTML
  function createTweetElement(tweet) {
    let username = escape(tweet.user.name);
    let profilepic = tweet.user.avatars.small;
    let theHandle = tweet.user.handle;
    let tweeterText = escape(tweet.content.text);
    let posttime = moment(tweet.created_at).fromNow();

    let $tweet = $("<article>").addClass("tweet");

    let $header = $("<header>").addClass("user-info");
    $tweet.append($header);

    let $profilePic = $("<img>").addClass("profile");
    $profilePic.attr("src", profilepic);
    $header.append($profilePic);

    let $userName = $("<h2>").addClass("user-name");
    $userName.append(username);
    $header.append($userName);

    let $handle = $("<p>").addClass("handle");
    $handle.append(theHandle);
    $header.append($handle);

    let $textBox = $("<div>");
    $tweet.append($textBox);

    let $tweetedText = $("<p>").addClass("tweetedtext");
    $tweetedText.append(tweeterText);
    $textBox.append($tweetedText);

    let $footer = $("<footer>").addClass("tweet-footer");
    $tweet.append($footer);

    let $postWhen = $("<p>").addClass("postTime");
    $postWhen.append(posttime);
    $footer.append($postWhen);

    let $flagIcon = $("<i>").addClass("fas fa-flag");
    let $retweetIcon = $("<i>").addClass("fas fa-retweet");
    let $heartIcon = $("<i>").addClass("fas fa-heart");

    let $icons = $("<span>").addClass("icons");
    $icons.append($flagIcon, $retweetIcon, $heartIcon);
    $footer.append($icons);

    return $tweet;
  }

  //Tweet validation function
  function validate(text) {
    return (text === "" || text === null || text === undefined || text.trim() === "" || text.length > 140 || text.length === 0) ? false : true;
  }

  function loadTweets() {
    $.get("/tweets").then(data => renderTweets(data));
  }

  //Tweet form can slide up/down when "Compose" button clicked
  $(".compose").on("click", () => {
    $(".new-tweet").slideToggle();
    $(".new-tweet textarea").focus();
  })

  //Either successfully post a new tweet with tweet-counter reset to 140 or error message
  $("#createTweet").on("submit", e => {
    e.preventDefault();
    if (validate(escape($("#tweet-text").val()))) {
      let data = $("#createTweet").serialize();
      $($("#tweet-text").val(""));
      $.post("/tweets", data).done(data => loadTweets(data));
      $(".counter").text(140);
    } else {
      alert("Your tweet isn't between 1 to 140 characters.")
    }
  })
  loadTweets();
})

