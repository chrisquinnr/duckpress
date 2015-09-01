if (Meteor.isClient) {
  var output = [];
  var outputDep = new Tracker.Dependency;

  var getOutput = function () {
    outputDep.depend();
    return output;
  };

  var addSpacer = function ( newValue ) {
    var existing = getOutput();
    var src = '/spacer.png';
    existing.push(src);
    output = existing;
    outputDep.changed();
  };

  var addOutput = function ( newValue ) {
    var existing = getOutput();
    var src = '/DUCKS/'+newValue+'.jpg';
    existing.push(src);
    output = existing;
    outputDep.changed();
  };

  var trimOutput = function ( newValue ) {
    var existing = getOutput();
    output.pop();
    outputDep.changed();
  };

  var removeAll = function(){
    output = [];
    outputDep.changed();
  };

  Template.hello.helpers({
    getOutput: function(){
      return getOutput();
    }
  });

  Template.hello.events({
    'click button': function () {
      // increment the counter when button is clicked
      Session.set('counter', Session.get('counter') + 1);
    },
    'keyup #input': function(e) {
      //var mySound = new buzz.sound("/squeak.mp3");
      //buzz.all().play();
      var snd = new Audio("/squeak.mp3"); // buffers automatically when created
      snd.play();
      if(e.keyCode == 8){
        trimOutput();
      } else if (e.keyCode == '32'){
        addSpacer();
      } else if (e.keyCode > '64' && e.keyCode < '91'){
        addOutput(e.keyCode);
      }
    },
    'click #reset':function(){
      removeAll();
      $('#input').val('');
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
