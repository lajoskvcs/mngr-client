import React from "react";
import {browserHistory} from 'react-router';

class HomePage extends React.Component {
    constructor(props, context) {
        super(props, context);
        browserHistory.push('/login');
    }

    render() {
        return (
            <div />
        );
    }

}

export default HomePage;