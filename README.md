#DUCKPRESS

Just another duckpress site. But in Meteor. Because Meteor is awesome.

## What is this I don't even

This is a demonstration of using Reactive Variables in a simple webapp. 

We create simple client side methods to manipulate our reactive variable thus: 


```
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

```

There's room for this to be refactored, but this syntax aids legiblity. By calling these methods when bound to particular events:

```
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
```

We can very quickly begin to construct a simple realtime webapp harnessing reactivity. 

There's a great many potential uses for this sort of behaviour, but hopefully Duckpress will allow you to get your head around how reactive variables can be used in a working example.
  
[@chrisquinnr](http://twitter.com/chrisquinnr)