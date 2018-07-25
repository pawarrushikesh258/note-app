  console.log('Starting app');

  const fs=require('fs');
  const os=require('os');
  const note=require('./notes.js');
  const _lo=require('lodash');
  const yargs=require('yargs');
  const argv=yargs.argv;
  var user=os.userInfo();

  var command=argv._[0];

  if(command==="add")
  {
    console.log("testing");
    var notes=note.addNote(argv.title,argv.body);
    console.log(notes);
  }
  else if(command==="get")
  {
    var notes=note.getAll();
    //console.log("All notes",notes);
    notes.forEach((note)=>logNotes(note));
  }
  else if(command==="remove")
  {
  var notes= note.remove(argv.title);
  var message=notes? 'Note Was removed' : 'Not was not found'
  // if(notes){
  //   console.log(`Notes with title ${argv.title} Removed`);
  // }
  // else { console.log(`Notes with title ${argv.title} Not Removed`);
  //     }
  console.log(message);
  }
else if(command==="read")
{
//debugger;
var noteBody=note.readNote(argv.title);
console.log("Note body is", noteBody);

}

function logNotes(notes)
{
  console.log("--------");
  console.log(`Note title is :  ${notes.title}`);
  console.log(`Note Body is : ${notes.body}`);
  console.log("--------");
}
