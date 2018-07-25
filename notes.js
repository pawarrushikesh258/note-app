
      const fs=require('fs');
      const _=require('lodash');

      var fetchNotes=()=>{

        try {
          var noteContent=fs.readFileSync('notesContent.json');
          //var noteString=JSON.stringify(noteContent);
          //var notes=JSON.parse(notString);             //Doesn't work, though it should, given that type of notecontent is object
          var notes=JSON.parse(noteContent);

        } catch (e) {

          fs.writeFileSync('notesContent.json',"[]");
          var noteContent=fs.readFileSync('notesContent.json');
          var notes=JSON.parse(noteContent);
        }

        return notes;

      }


      var writeNotes=(notes)=>{

        try {
        fs.writeFileSync('notesContent.json',JSON.stringify(notes));
        } catch (e) {
          console.log("Error, can't write to the file. Exiting now.", e);
        }
      }


      var addNote=(title, body)=>{
        console.log("A new note with title ", title, "is being added...");
        console.log("With Note content...: "+body);

        var notes = [];
        var note={
          title,
          body
        };


      notes=fetchNotes();
      var count=0;

      if(notes==undefined) {
        notes.push(note);
      }

      else if(notes!=null) {
        for (var i = 0; i < notes.length; i++) {


            if (notes[i].title==title)
            {

              count++;

            }
          }
        }


      if(count==0){
      notes.push(note);

      }

      else {
        console.log("Duplicates, not possible to add");
      }


      fs.writeFileSync('notesContent.json',JSON.stringify(notes));
      return notes;

      //ALWAYS RETURN SOMETHING, ELSE
      //JAVASCRIPT RETURNS
      //UNDEFINED

      }


      var getAll=()=>{

        var notes = fetchNotes();
        //console.log(notes); //Object notation format
        return notes;
      }


      var remove=(title)=>{
        //var new_title=title; //not needed, it's already in function scope
        var notes=fetchNotes();
        console.log("Initial notes", notes);
        //console.log(_.isArray(notes));
        var new_array=notes.filter((note)=>(note.title!=title));
        //notes=new_array.slice();
        console.log("remaining notes", new_array);
        writeNotes(new_array);
        //console.log(notes.length);
        return notes.length!=new_array.length;
      }

      var readNote=(title)=>{
        var notes=fetchNotes();
        for (var i = 0; i < notes.length; i++) {
          if(notes[i].title==title)
          {
            return notes[i].body;
            return;
          }
        }
        var empty_array=[];
        return empty_array;
        //return [];
      }



      module.exports={
        addNote:addNote,
        getAll:getAll,
        remove:remove,
        readNote:readNote
      }
