class DashboardApi {
    static getDashboard(accessToken) {
        return fetch(
            'http://localhost:8080/dashboard?access_token='+accessToken
        ).then(response => {
            return response.json();
        }).catch(error => {
            return error;
        });
    }
}
export default DashboardApi;