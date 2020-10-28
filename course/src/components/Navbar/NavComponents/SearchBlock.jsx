import React from "react";
import {Button, Form, FormControl} from "react-bootstrap";

const SearchBlock = (props) =>{
    return(
        <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2"/>
            <Button variant="outline-info">Search</Button>
        </Form>
    )
}

export default SearchBlock