class ProjectApi {
    static getAllProjects() {
        return fetch('http://localhost:8080/api/v1/projects').then(response => {
            return response.json();
        }).catch(error => {
            return error;
        });
    }
export default ProjectApi;