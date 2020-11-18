import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import FavoriteIcon from '@material-ui/icons/Favorite';

const StyledLike = withStyles({
    iconFilled: {
        color: '#ff6d75',
    },
    iconHover: {
        color: '#ff3d47',
    },
})(FavoriteIcon);


export default function CustomizedRatings() {
    return (
        <div>
            <StyledLike fontSize="inherit"/>
        </div>
    );
}