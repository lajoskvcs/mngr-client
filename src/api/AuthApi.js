class AuthApi {
    static getTokens(username, password) {
        return fetch(
            'http://localhost:8080/oauth/token?grant_type=password&username='+username+'&password='+password,
            {
                method: "POST",
                headers: {
                    'Authorization': 'Basic '+btoa('trusted-client:asd123'),
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
            }
        ).then(
            response => {
                return response.json();
            }
        ).catch(error => {
            return error;
        });
    }
    static getCurrentUser(accessToken) {
        return fetch(
            'http://localhost:8080/users/current?access_token='+accessToken
        ).then(response => {
            return response.json();
        }).catch(error => {
            return error;
        });
    }
}
export default AuthApi;