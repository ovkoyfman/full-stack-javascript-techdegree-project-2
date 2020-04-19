/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
*******************************************/

const studentListItems = document.querySelectorAll('.student-list li');
const mainDiv = document.querySelector('.page');
const headerDiv = document.querySelector('.page-header');
let pageCount = Math.ceil(studentListItems.length/10);
const noResultsMessage = document.createElement('h3');
noResultsMessage.className = "no-results";
noResultsMessage.innerText = "No results";

//added data- attribute to track pages
const paginateListOfStudents = arrayOfStudents => {
   pageCount = Math.ceil(arrayOfStudents.length/10);
   const clearStudentsPagination = () => {
      for (let i=1; i <= studentListItems.length; i++){
         studentListItems[i-1].removeAttribute('data-page');
      }  
   }
   clearStudentsPagination();
   for (let i=1; i <= arrayOfStudents.length; i++){
      arrayOfStudents[i-1].setAttribute('data-page', Math.ceil(i/10));
   }  
}

const restructurePageLook = arrayOfStudents => {
   paginateListOfStudents(arrayOfStudents);

   //cleared pagination links and no results message if they are already on the page 
   removeElementFromHTML('.pagination');
   removeElementFromHTML('.no-results');

   //added new pagination based on new array of Students
   if ( pageCount > 1 ) { appendPaginationLinks(); }
   else if ( pageCount === 0 ){
      insertedNode = mainDiv.insertBefore(noResultsMessage, mainDiv.querySelector('.student-list'));
   }
}

//function helper for removing elements from page
const removeElementFromHTML = className => {
   if (document.querySelector(className)){
      document.querySelector(className).remove();
   }
}

//to reset view of the page to all students visible default mode
const showAllStudents = () => {
   let hiddenStudents = document.querySelectorAll('li[style="display:none"]');
   for (let i=0; i < hiddenStudents.length; i++){
      hiddenStudents[i].removeAttribute('style');
   }
}

const showStudentsOnPage = pageNumber => {

   //to show all students that previously were hidden
   showAllStudents();

   //to hide students that are not needed
   for (let i=0; i < studentListItems.length; i++){
      if(studentListItems[i].getAttribute('data-page') != pageNumber){
         studentListItems[i].setAttribute('style','display:none');
      }
   }
}

//created and appeneded to the div.page pagination
const appendPaginationLinks = () => {
   //created pagination div
   const paginationDiv = document.createElement('div');
   paginationDiv.className = "pagination";
   mainDiv.appendChild(paginationDiv);
   //built content for pagination div
   let paginationString = `<ul>`;
   for(let i = 1; i <= pageCount; i++){
      if (i === 1){
         paginationString += `<li><a href="#"  class="active">${i}</a></li>`;
      }else{
         paginationString += `<li><a href="#">${i}</a></li>`;
      }
      
   }
   paginationString +=`</ul>`;
   paginationDiv.innerHTML = paginationString;

   //added event listener to the pagination
   paginationDiv.addEventListener('click',function(e){
      showStudentsOnPage(e.target.text);

      //removed class .active from current active pagination number
      e.target.parentElement.parentElement.querySelector('.active').className = "";
      
      //and added class .active to the just clicked on
      e.target.className = "active";
   })
}
const createSearchField = () => {
   const searchDiv = document.createElement('div');
   searchDiv.className = 'student-search';
   headerDiv.appendChild(searchDiv);
   searchDiv.innerHTML = '<input placeholder="Search for students..."><button>Search</button>';
   const button = document.querySelector('.student-search button');
   const inputField = document.querySelector('.student-search input');
   function searchStudents(){
      const tempStudentsArray = [];
         for (let i=0; i < studentListItems.length; i++){
            const studentName = studentListItems[i].querySelector('h3').textContent.toLowerCase();
            const searchTerm = inputField.value.toLowerCase();
            if( studentName.includes(searchTerm)){
               tempStudentsArray.push(studentListItems[i]);
            }
         }
         restructurePageLook(tempStudentsArray);
         showStudentsOnPage(1);
   }
   button.addEventListener('click',()=>{
      searchStudents();
   });
   inputField.addEventListener('keyup',()=>{
      searchStudents();
   });
}

createSearchField();
restructurePageLook(studentListItems);
showStudentsOnPage(1);
