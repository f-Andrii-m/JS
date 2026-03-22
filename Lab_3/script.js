(function () {
  console.log("Додатковий спосіб селекції: якщо довжина імені парна — Hello, якщо непарна — Good Bye.");

  var names = ["Bill", "John", "Jen", "Jason", "Paul", "Frank", "Steven", "Larry", "Paula", "Laura", "Jim"];

  for (var i = 0; i < names.length; i++) {
    var name = names[i];

    if (name.length % 2 === 0) {
      helloSpeaker.speak(name);
    } else {
      byeSpeaker.speak(name);
    }
  }
})();
