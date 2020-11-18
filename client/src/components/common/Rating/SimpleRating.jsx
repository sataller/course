import React from 'react';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';

export default function SimpleRating(props) {

    const [value, setValue] = React.useState(props.rating);

    const onRatingChange = (event, newValue) => {
        props.updateRating(newValue);
        setValue(newValue);

    };


    return (
        <div>
            <Box component="fieldset" mb={3} borderColor="transparent"
                 size="small">
                <Rating
                    name="simple-controlled"
                    value={value}
                    onChange={onRatingChange}
                />
            </Box>
        </div>
    );
}