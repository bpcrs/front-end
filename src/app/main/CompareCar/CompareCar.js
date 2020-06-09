import React, { Component, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    layoutRoot: {}
});
class CompareCar extends Component {
    render() {
        return (
            <div>This is CompareCar page</div>
        )
    }

}

export default withStyles(styles, { withTheme: true })(CompareCar);