
const result = document.getElementById("result");
const goBtn = document.getElementById("go-button");

// declare all our inputs
const authorInput = document.getElementById("author-input");
const nameInput = document.getElementById("name-input");
const imageURLInput = document.getElementById("image-url-input");
const urlInput = document.getElementById("url-input");

console.log("hi!");


let showAllProjects = () => {
    $.ajax({
        type: 'GET',
        url: "http://localhost:3200/allProject",
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

// ADDING THE GO BTN ONCLICK FOR ADDING IN NEW PROJECTS 
goBtn.onclick = () => {
    console.log("clicked");
    $.ajax({
        url: "http://localhost:3200/addProject",
        // use the post type to create data somewhere
        // requesting to POST our data
        type: "POST",
        // we can send objects through to the backend, using the data argument
        data: {
            // the first property (i.e. the one on the left) called name has to be spelt exactly as the schema
            name: nameInput.value,
            author: authorInput.value,
            image_url: imageURLInput.value,
            url: urlInput.value,
        },
        success: () => {
            console.log("A new portfolio was added.");
            showAllProjects();
        },
        error: () => {
            console.log("Error: cannot reach the backend");
        },
    });
};


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
    $('#updateProject').click(function () {
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
            let currentId = editButtonsArray[i].parentNode.parentNode.id;
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
        <div class="folio-item-wrap" id="${item._id}">
            <h3>${item.name}</h3>
            <img src="${item.img_url}">
            <div class="author-cont">
                <h5>${item.author}</h5>
                <button href="${item.url}">View More</button>
            </div>
            <div class="functions-cont">

            <i class="bi bi-trash3 delete-button"></i>
            <i class="bi bi-pencil edit-button" data-bs-toggle="modal" data-bs-target="#editModal"></i>
            </div>
        </div>
        `;
    });

    //collect edit buttons 
    collectEditButtons();
    collectDeleteButtons();

};

// DELETING PROJECTS ---------------------------------------------

// this function gets run when we click on a delete button
let deleteProject = (projectId) => {
    // use ajax and go to the delete route
    $.ajax({
        // Let's go to our route
        url: `http://localhost:3200/deleteProject/${projectId}`,
        type: "DELETE",
        success: () => {
            // at this point, we can assume that the delete was successful
            showAllProjects();
        },
        error: () => {
            console.log("Cannot call API");
        },
    });
};

// this function will handle all our deletes
let collectDeleteButtons = () => {
    // this will return an Array, but it's a slightly different one
    // it returns HTML "nodes" instead
    // we'll have use a regular loop to loop over these
    let deleteButtonsArray = document.getElementsByClassName("delete-button");
    // this will loop over every delete button
    for (let i = 0; i < deleteButtonsArray.length; i++) {
        deleteButtonsArray[i].onclick = () => {
            let currentId = deleteButtonsArray[i].parentNode.parentNode.id;
            // delete project based on the id
            deleteProject(currentId);
        };
    }
};

showAllProjects();