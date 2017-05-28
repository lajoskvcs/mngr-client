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
    static getProject(accessToken, id) {
        return fetch(
            'http://localhost:8080/projects/' + id + '?access_token='+accessToken
        ).then(response => {
            return response.json();
        }).catch(error => {
            return error;
        });
    }

    static getAllTasks(accessToken, projectId) {
        return fetch(
            'http://localhost:8080/projects/'+projectId+'/tasks?access_token='+accessToken
        ).then(response => {
            return response.json();
        }).catch(error => {
            return error;
        });
    }

    static getNotes(accessToken, id) {
        return fetch(
            'http://localhost:8080/projects/' + id + '/note?access_token='+accessToken
        ).then(response => {
            return response.json();
        }).catch(error => {
            return error;
        });
    }
    static patchNote(accessToken, noteId, note) {
        return fetch(
            'http://localhost:8080/projects/' + id + '/note?access_token='+accessToken,
            {
                method: 'PATCH',
                data: JSON.stringify({
                    id: noteId,
                    note: note
                })
            }
        ).then(response => {
            return response.json();
        }).catch(error => {
            return error;
        });
    }
}
export default ProjectApi;