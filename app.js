$("card").on("click", function(){
    $(".detail").addClass("active");
});

$(".close-detail").on("click",function(){
    $(".detail").removeClass("active");
});

$(".menu-bar").on("click",function(){
    $(".sidebar").addClass("active");
});

$(".logo").on("click",function(){
    $(".detail").removeClass("active");
});

 // Define API endpoint
 const apiEndpoint = "https://api.jobtheater.com/positions.json?search[location]=Japan";

 // Fetch job data from API
 function fetchJobs() {
   fetch(apiEndpoint)
     .then((response) => response.json())
     .then((data) => {
       jobData = data.results;
       displayJobs(jobData);
     })
     .catch((error) => console.error(error));
 }

 // Display job data on webpage
 function displayJobs(jobs) {
   const cardContainer = $(".card-container");
   cardContainer.empty();
   if (jobs.length === 0) {
     cardContainer.append("<p>No jobs found.</p>");
   } else {
     jobs.forEach((job) => {
       const card = `
         <div class="card" data-id="${job.id}">
           <div class="card-left">
             <img src="${job.company_logo}" alt="${job.company_name} logo">
           </div>
           <div class="card-center">
             <h3>${job.title}</h3>
             <p class="card-loc"><ion-icon name="location-outline"></ion-icon>${job.location}</p>
             <div class="card-sub">
               <p><ion-icon name="today-outline"></ion-icon>${job.created_at}</p>
               <p><ion-icon name="hourglass-outline"></ion-icon>${job.contract_type}</p>
               <p><ion-icon name="people-outline"></ion-icon>${job.applications_count} Applicants</p>
             </div>
           </div>
           <div class="card-right">
             <div class="card-tag">
               <h5>Division</h5>
               ${job.tags.map((tag) => `<a href="#">${tag}</a>`).join("")}
             </div>
             <div class="card-salary">
               <p><b>${job.salary_min} - ${job.salary_max}</b><span>/ year </span></p>
             </div>
           </div>
         </div>
       `;
       cardContainer.append(card);
     });
   }
 }

 // Display job detail on webpage
 function displayJobDetail(job) {
   const detailContainer = $(".detail-container");
   detailContainer.empty();
   const detail = `
     <div class="detail-header">
       <img src="${job.company_logo}" alt="${job.company_name} logo">
       <div class="detail-header-content">
         <h2>${job.title}</h2>
         <p>${job.company_name}</p>
         <p><ion-icon name="location-outline"></ion-icon>${job.location}</p>
       </div>
     </div>
     <div class="divider"></div>
     <div class="detail-desc">
       <h4>About the job:</h4>
       