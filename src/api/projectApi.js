class ProjectApi {
    static getAllProjects(accessToken) {
        return fetch(
            'http://localhost:8080/projects?access_token='+accessToken
        ).then(response => {
            return response.json();
        }).catch(error => {
            return error;
        });
    }
}
export default ProjectApi;