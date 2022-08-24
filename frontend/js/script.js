
const result = document.getElementById("result");
console.log("hi!");

let showAllProjects = () => {
    $.ajax({
        type: 'GET', 
        url: "http://localhost:3200/allProjects",
        //the success function contains an object which can be named anything 
        success: (projects) => {
            console.log(projects);
            console.log("is this running??");
            renderProjects(projects);
        },
        error: (error) => {
            console.log(error);
        }
    })
}



let renderProjects = (projects) => {
    console.log("the render projects function is working");
    result.innerHTML = "";
    projects.forEach((item) => {
        result.innerHTML += `
        <div class="product-wrapper" id="${item._id}">
            <h3>${item.name}</h3>
            <img src="${item.img_url}">
            <h5>${item.author}</h5>
            
        </div>
        `;
    });

};


showAllProjects();