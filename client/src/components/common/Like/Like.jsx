import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

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