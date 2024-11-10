import React from 'react';
import { useParams } from "react-router-dom";


function GenericList(props) {
    const { table } = useParams();
    return (
        <div>
            generic {table}
        </div>
    );
}

export default GenericList;