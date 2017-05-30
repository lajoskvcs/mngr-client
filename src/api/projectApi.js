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

    static getTask(accessToken, taskId) {
        return fetch(
            'http://localhost:8080/tasks/'+taskId+'?access_token='+accessToken
        ).then(response => {
            return response.json();
        }).catch(error => {
            return error;
        });
    }
    static updateTask(accessToken, task) {
        return fetch(
            'http://localhost:8080/tasks/'+task.id+'?access_token='+accessToken,
            {
                method: 'PATCH',
                body: JSON.stringify(task),
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                }
            }
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
    static addProject(accessToken, project) {
        return fetch(
            'http://localhost:8080/projects?access_token='+accessToken,
            {
                method: 'POST',
                body: JSON.stringify(project),
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                }
            }
        ).then(response => {
            return response.json();
        }).catch(error => {
            return error;
        });
    }

    static addTask(accessToken, task) {
        return fetch(
            'http://localhost:8080/tasks?access_token='+accessToken,
            {
                method: 'POST',
                body: JSON.stringify(task),
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                }
            }
        ).then(response => {
            return response.json();
        }).catch(error => {
            return error;
        });
    }

    static updateProject(accessToken, project) {
        return fetch(
            'http://localhost:8080/projects/' + project.id + '?access_token='+accessToken,
            {
                method: 'PATCH',
                body: JSON.stringify(project),
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                }
            }
        ).then(response => {
            return response.json();
        }).catch(error => {
            return error;
        });
    }

    static deleteProject(accessToken, id) {
        return fetch(
            'http://localhost:8080/projects/' + id + '?access_token='+accessToken,
            {
                method: 'DELETE'
            }
        ).then(response => {
            return response.json();
        }).catch(error => {
            return error;
        });

    }

    static patchNote(accessToken, projectId,  noteId, note) {
        return fetch(
            'http://localhost:8080/projects/' + projectId + '/note?access_token='+accessToken,
            {
                method: 'PATCH',
                body: JSON.stringify({
                    id: noteId,
                    note: note
                }),
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                }
            }
        ).then(response => {
            return response.json();
        }).catch(error => {
            return error;
        });
    }
    static deleteTask(accessToken,  taskId) {
        return fetch(
            'http://localhost:8080/tasks/' + taskId + '?access_token='+accessToken,
            {
                method: 'DELETE'
            }
        ).then(response => {
            return response.json();
        }).catch(error => {
            return error;
        });
    }

    static deleteMaterial(accessToken,  materialId) {
        return fetch(
            'http://localhost:8080/materials/' + materialId + '?access_token='+accessToken,
            {
                method: 'DELETE'
            }
        ).then(response => {
            return response.json();
        }).catch(error => {
            return error;
        });
    }

}
export default ProjectApi;