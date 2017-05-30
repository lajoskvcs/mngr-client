class AuthApi {
    static getTokens(username, password) {
        return fetch(
            'http://localhost:8080/oauth/token?grant_type=password&username='+username+'&password='+password,
            {
                method: "POST",
                headers: {
                    'Authorization': 'Basic '+btoa('trusted-client:asd123'),
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
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
    static registerUser(
        username,
        password,
        firstname,
        lastname,
        email,
        address,
        borndate,
        company
    ){
        let data = {
            username: username,
            password: password,
            firstName: firstname,
            lastName: lastname,
            email: email,
            address: address,
            bornDate: borndate,
            company: company
        };
        return fetch(
            'http://localhost:8080/users/register',
            {
                method: 'POST',
                body: JSON.stringify(data),
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

    static updateUser(
        access_token,
        id,
        username,
        password,
        firstname,
        lastname,
        email,
        address,
        borndate,
        company
    ){
        let data = {
            id: id,
            username: username,
            password: password,
            firstName: firstname,
            lastName: lastname,
            email: email,
            address: address,
            bornDate: borndate,
            company: company
        };
        return fetch(
            'http://localhost:8080/user?access_token='+access_token,
            {
                method: 'PATCH',
                body: JSON.stringify(data),
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
}
export default AuthApi;