


let showAllProjects = () => {
    $.ajax({
        type: 'GET', 
        url: "http://localhost:3200/allProjects",
        //the success function contains an object which can be named anything 
        success: (projects) => {
            console.log(projects);
            console.log("is this running??");
        },
        error: (error) => {
            console.log(error);
        }
    })
}

showAllProjects();