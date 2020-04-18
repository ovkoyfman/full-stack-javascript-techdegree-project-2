/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
*******************************************/

const studentList = document.querySelectorAll('.student-list li');
const pageCount = Math.ceil(studentList.length/10);

//added data- attribute to track pages
function paginateListOfStudents(){
   for (let i=1; i <= studentList.length; i++){
      studentList[i-1].setAttribute('data-page', Math.ceil(i/10));
   }  
}

function showAllStudents(){
   let hiddenStudents = document.querySelectorAll('li[style="display:none"]');
   for (let i=0; i < hiddenStudents.length; i++){
      hiddenStudents[i].removeAttribute('style');
   }
}

function showPage(pageNumber){
   //to show all students that previously were hidden
   showAllStudents();
   let studentList = document.querySelectorAll('.student-list li');
   //to hide students that are not needed
   for (let i=0; i < studentList.length; i++){
      if(studentList[i].getAttribute('data-page') != pageNumber){
         studentList[i].setAttribute('style','display:none');
      }
   }
}

//created and appeneded to the div.page pagination
function appendPaginationLinks(){

   const parentElement = document.querySelector('.page');
   const paginationDiv = document.createElement('div');
   paginationDiv.className = "pagination";
   parentElement.appendChild(paginationDiv);

   //built content for pagination div
   let paginationString = `<ul>`;
   for(let i = 1; i <= pageCount; i++){
      paginationString += `<li><a href="#">${i}</a></li>`;
   }
   paginationString +=`</ul>`;
   paginationDiv.innerHTML = paginationString;

   //added event listener to the pagination
   paginationDiv.addEventListener('click',function(e){
      showPage(e.target.text);
   })
}

//set of functions calls to run main functionality
paginateListOfStudents();
appendPaginationLinks();
showPage(1);
