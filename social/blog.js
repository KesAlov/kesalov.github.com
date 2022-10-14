$(function() {
  var ref = new Firebase("https://console.firebase.google.com/u/0/project/kacomments-e9531/database/kacomments-e9531-default-rtdb/data/~2F"),
  postRef = ref.child(slugify(window.location.pathname));

  postRef.on("child_added", function(snapshot) {
    var newPost = snapshot.val();
    $(".comments").prepend('<div class="comment">' +
    '<h4>' + newPost.name + '</h4>' +
    '' +
    '<span class="date">' + moment(newPost.postedAt).fromNow() + '</span><p>' + newPost.message  + '</p></div>');
  });

  $("#comment").submit(function() {
    postRef.push().set({
    name: $("#name").val(),
    message: $("#message").val(),
    md5Email: md5($("#email").val()),
    postedAt: Firebase.ServerValue.TIMESTAMP
  });

  $("input[type=text], textarea").val("");
    return false;
  });
});

function slugify(text) {
  return text.toString().toLowerCase().trim()
    .replace(/&/g, '-and-')
    .replace(/[\s\W-]+/g, '-')
    .replace(/[^a-zA-Z0-9-_]+/g,'');
}