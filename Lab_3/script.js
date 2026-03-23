(function () {

  var names = ["Bill", "John", "Jen", "Jason", "Paul", "Frank", "Steven", "Larry", "Paula", "Laura", "Jim"];

  
  

  for (var i = 0; i < names.length; i++) {
    var name = names[i];
    var firstLetter = name.charAt(0).toLowerCase();

    if (firstLetter === 'j') {
      byeSpeaker.speak(name);
    } else {
      helloSpeaker.speak(name);
    }
  }

  
  console.log("Якщо довжина парна — Hello, якщо непарна — Good Bye");

  for (var i = 0; i < names.length; i++) {
    var name = names[i];

    if (name.length % 2 === 0) {
      helloSpeaker.speak(name);
    } else {
      byeSpeaker.speak(name);
    }
  }

})();
