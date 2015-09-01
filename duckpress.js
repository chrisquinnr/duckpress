if (Meteor.isClient) {
  var output = [];
  var outputDep = new Tracker.Dependency;

  var getOutput = function () {
    outputDep.depend();
    return output;
  };

  var addSpacer = function ( newValue ) {
    var src = '/spacer.png';
    output.push(src);
    outputDep.changed();
  };

  var addOutput = function ( newValue ) {
    var src = '/DUCKS/'+newValue+'.jpg';
    output.push(src);
    outputDep.changed();
  };

  var trimOutput = function ( newValue ) {
    output.pop();
    outputDep.changed();
  };

  var removeAll = function(){
    output = [];
    outputDep.changed();
  };

  Template.duckpress.helpers({
    getOutput: function(){
      return getOutput();
    }
  });

  Template.duckpress.events({
    'keyup #input': function(e) {
      var clip = Random.choice(['/squeak.mp3', '/squeak_2.mp3', '/squeak_3.mp3'])
      var snd = new Audio(clip); // buffers automatically when created
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
