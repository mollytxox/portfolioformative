
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


fillEditInputs = (project, id) => {
    let projectName = document.getElementById("projectName");
    let projectAuthor = document.getElementById("author");
    let imageUrl = document.getElementById("imgUrl");
    let projectUrl = document.getElementById("url");

    projectName.value = project.name;
    projectAuthor.value = project.author;
    imageUrl.value = project.img_url;
    projectUrl.value = project.url;

    let imagePreview = document.getElementById('image-preview');

    imagePreview.innerHTML = `
    <img src="${project.img_url}" alt="${projectName}">
    `;

     //=================================
    //      EDIT CLICK LISTENER
    //=================================
    $('#updateProject').click(function(){
        event.preventDefault();
        let projectId = id;
        let projectName = document.getElementById("projectName").value;
        let projectAuthor = document.getElementById("author").value;
        let imageUrl = document.getElementById("imgUrl").value;
        let projectUrl = document.getElementById("url").value;;

        console.log(projectId, projectName, projectAuthor, imageUrl, projectUrl)

        $.ajax({
            url: `http://localhost:3200/updateProject/${projectId}`,
            type: 'PATCH',
            data: {
                name: projectName,
                author: projectAuthor,
                img_url: imageUrl,
                url: projectUrl,
            },
            success: (data) => {
                console.log(data);
                console.log("Success - project was updated")
                showAllProjects();
                $("#updateProjects").off('click');
                
            },
            error: () => {
                console.log("Error no Updatey");
            }
        })
    });

}

//this function will ask the backend for data relating to the coffee we clicked on to edit 
populateEditModal = (projectId) => {
    console.log(projectId)
    $.ajax({
        url: `http://localhost:3200/project/${projectId}`,
        type: 'GET',
        success: (projectData) => {
           console.log("Project was found!")
           console.log(projectData);
           fillEditInputs(projectData, projectId);

        },
        error: () => {
            console.log(error)
        }
    })
};

//this function will handle all our edits and add a click listener 
//if we click on an edit button it will get the id from the parent node (the div around around our projects)
let collectEditButtons = () => {
    // this will return an Array, but it's a slightly different one
    // it returns HTML "nodes" instead
    // Well have to use a regular loop over these 
    let editButtonsArray = document.getElementsByClassName("edit-button");
    //this will loop over every edit button 
    for (let i = 0; i < editButtonsArray.length; i++) {
        editButtonsArray[i].onclick = () => {
            console.log(editButtonsArray[i].id);
            console.log("edit button clicked");
            let currentId = editButtonsArray[i].parentNode.id;
            //edit projects based on the id 
           populateEditModal(currentId);
           // showAllProjects();
        };
    }
};


let renderProjects = (projects) => {
    console.log("the render projects function is working");
    result.innerHTML = "";
    projects.forEach((item) => {
        result.innerHTML += `
        <div class="product-wrapper" id="${item._id}">
            <h3>${item.name}</h3>
            <img src="${item.img_url}">
            <h5>${item.author}</h5>

            <button ahref="${item.url}">View More</button>

            <i class="bi bi-trash3"></i>
            <i class="bi bi-pencil edit-button" data-bs-toggle="modal" data-bs-target="#editModal"></i>
            
        </div>
        `;
    });

    //collect edit buttons 
    collectEditButtons();

};


showAllProjects();