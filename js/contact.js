$(document).ready(function () {
  console.log("jQuery ready!");
  $(".contact_submit").click(function () {
    $(".contact_form").hide();
    $(".getbackmesg").show();
  });
});
