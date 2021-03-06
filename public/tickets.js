const db = firebase.firestore();
const mainList = document.querySelector('#list_div');
const commentForm = document.querySelector('#add-comment-form');
const ticketList = document.querySelector('#comment-list');
var ticknum =  document.getElementById('ticketNumberCell').innerHTML;
var archivedComments = [];

// console.log("ticknum "+ticknum);

commentForm.addEventListener('submit', (e) => {
    e.preventDefault();

    db.collection("tickets").doc(ticknum).collection("comments").add({

        comment: commentForm.comment.value,
    })
    commentForm.comment.value = "";
    
    });


    function myFunction(x) {
    // var indexofrow=x.parentElement.parentElement.rowIndex;
    var iii=x.parentElement.parentElement.getAttribute('class');
    if(iii !=""){
        ticknum=iii;
    }
   
  
    // console.log("ID: " + iii);
    
    // console.log("Row index is: " + indexofrow);

    //get comments
    db.collection("tickets").doc(ticknum).collection("comments").onSnapshot(snapshot => {
        let changes = snapshot.docChanges();
        changes.forEach(change => {
        console.log(change.doc.data());

         // archivedComments.push(change.doc.data().comment);
        // console.log("archived comments: "+archivedComments);

        if(change.type === 'added'){
            renderCafe(change.doc);
        } else if (change.type === 'removed'){
            let li = ticketList.querySelector('[data-id=' + change.doc.id + ']');
            ticketList.removeChild(li);
        }
        });
        }); 


      
            }





//close ticket
  function closeRow(){
    var y = document.getElementById("Ticketcontent");
    if (y.style.display === "block") {
        y.style.display = "none";
      } 
      ticketList.innerHTML = '';

  }

  //arcive ticket 
  function archiveRow(){

    var archivedID;

    console.log(ticknum);


    var docRef = db.collection("tickets").doc(ticknum);

    // Add a new document with a generated id.
    
    docRef.get().then(function(doc) {
        if (doc.exists) {
    
        //copy to other  collection

        db.collection("archives").add({

        Title : doc.data().Title,
        TFname: doc.data().TFname,
        TLname: doc.data().TLname,
        SFname: doc.data().SFname,
        SLname: doc.data().SLname,
        Grade: doc.data().Grade,
        Email: doc.data().Email,
        date: doc.data().date,
        department: doc.data().department,
        description: doc.data().description
                 
        }).then(function(docRef) {
            console.log("Document archived with ID: ", docRef.id);

            

            db.collection("archives").doc(docRef.id).collection("comments").add({

                archivedComments

            })
            .then(function(docRef) {
                console.log("Document written with ID: ", docRef.id);
            
            })
            .catch(function(error) {
                console.error("Error adding document: ", error);
            });
    
        })

        

        // delete from original

        docRef.delete().then(function() {
            console.log("ticket successfully archived!");
        }).catch(function(error) {
            console.error("Error archiving ticket: ", error);
        });
        
            
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}).catch(function(error) {
    console.log("Error getting document:", error);
});

  }

//get ticket data 
db.collection("tickets").onSnapshot(function(snapshot) {
    snapshot.docChanges().forEach(function(change) {
        if (change.type === "added") {
            // console.log(change.doc.data());
            ticketSummary(change.doc.id, change.doc.data().date,change.doc.data().TFname+" "+change.doc.data().TLname, change.doc.data().Title, change.doc.data().department);
        } else if (change.type === "removed") {

    // document.getElementById("ticketTableBody").deleteRow(x.parentElement.parentElement.rowIndex);
                    }
    });

 
});


function ticketSummary(ticketNumber,ticketDate,ticketTeacherFirstName,ticketTitle,ticketDepartment){

    let table = document.getElementById("ticketTableBody");
    let row = table.insertRow();
    row.className = ticketNumber;
    let ticketNumberCell = row.insertCell(0);
    let ticketDateCell = row.insertCell(1);
    let ticketTeacherFirstNameCell = row.insertCell(2);
    let ticketTitleCell = row.insertCell(3);
    let ticketDepartmentCell = row.insertCell(4);
    let ticketAction = row.insertCell(5);

    ticketNumberCell.innerHTML = ticketNumber;
    ticketDateCell.innerHTML = ticketDate;
    ticketTeacherFirstNameCell.innerHTML = ticketTeacherFirstName;
    ticketTitleCell.innerHTML = ticketTitle;
    ticketDepartmentCell.innerHTML = ticketDepartment;
    ticketAction.innerHTML= "<button id='myBtn' onclick='myFunction(this)'  class='btn-info'>View Details</button>"; 

  
    // deleting data
    // ticketAction.addEventListener('click', (e) => {
    // e.stopPropagation();
    // let id = e.target.parentElement.parentElement.getAttribute('class');
    // console.log(id);
    // db.collection('tickets').doc(id).delete();
    //     });

         // view data
    ticketAction.addEventListener('click', (e) => {
        var y = document.getElementById("Ticketcontent");
        //show div element
        if (y.style.display === "none") {
            y.style.display = "block";
          } 
    
        e.stopPropagation();
        var id = e.target.parentElement.parentElement.getAttribute('class');
        var newID;
        if(id !=null){
            newID=id;
        }
       

        // ticknum = id;
        // console.log("id "+id);
        // console.log("ticknum "+ticknum);

        ticketList.innerHTML = '';
        // console.log("new id "+id1);


       
  
        // window.open(
        //     'ticket_example.html',
        //     '_blank' // <- This is what makes it open in a new window.
        //   );

        var ddd = document.getElementById("deleteBtn");
        var sss = document.getElementById("submitBtn");
        var ccc = document.getElementById('comment');
        var lol = db.collection('tickets').doc(newID);
        lol.get().then(function(doc) {
            if (doc.exists) {
                //console.log("Document data:", doc.data());
                var ticketNumberCell = document.getElementById('ticketNumberCell');
                var ticketDateCell = document.getElementById('ticketDateCell');
                var ticketTitleCell = document.getElementById('ticketTitleCell');
                var ticketContentCell = document.getElementById('ticketContentCell');
                var ticketAuthorCell = document.getElementById('ticketAuthorCell');
                var ticketDateCell = document.getElementById('ticketDateCell');
                var ticketEmailCell = document.getElementById('ticketEmailCell');
                var ticketDepartmrntCell = document.getElementById('ticketDepartmrntCell');
                var ticketStudentCell = document.getElementById('ticketStudentCell');
                var ticketGradeCell = document.getElementById('ticketGradeCell');
                
                ddd.className = ticketNumber;
                sss.className = ticketNumber;
                ccc.className=ticketNumber;

                ticketNumberCell.innerHTML = doc.id;
                ticketDateCell.innerHTML = ticketDate;
                ticketTitleCell.innerHTML = ticketTitle;
                ticketContentCell.innerHTML = doc.data().description;
                ticketAuthorCell.innerHTML = doc.data().TFname+" "+doc.data().TLname;
                ticketEmailCell.innerHTML = doc.data().Email;
                ticketDepartmrntCell.innerHTML = doc.data().department;
                ticketStudentCell.innerHTML = doc.data().SFname+" "+doc.data().SLname;
                ticketGradeCell.innerHTML = doc.data().Grade;
                
            } 
            
            
            else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });
        
   
        
            });


 
       
}

 



//comments

function renderCafe(doc){
    let li = document.createElement('li');
    let name = document.createElement('span');
    //let cross = document.createElement('div');

    li.setAttribute('data-id', doc.id);
    name.textContent = doc.data().comment;
    //cross.textContent = 'x';
    li.appendChild(name);
   // li.appendChild(cross);
    ticketList.appendChild(li);


// // deleting data
//     cross.addEventListener('click', (e) => {
//         e.stopPropagation();
//         let id = e.target.parentElement.getAttribute('data-id');
//         db.collection("tickets").doc(id).collection("comments").delete();
//     });


 }


    
    
    
   
    




   

