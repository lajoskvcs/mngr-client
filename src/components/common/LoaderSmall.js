import React, {PropTypes} from 'react';
import 'loaders.css';
class LoaderSmall extends React.Component {
    render() {
        return (
            <div class="loader">
                <div class="ball-clip-rotate-multiple">
                    <div></div>
                    <div></div>
                </div>
            </div>
        );
    }
}



export default LoaderSmall;