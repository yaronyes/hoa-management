import React, { useState } from 'react';
import { MDBInput } from 'mdbreact';
import './FilterBox.css';

const FilterBox = ({ onFilterChanged }) => {
    const [filter, setFilter] = useState("");

    const filterChanged = event => {
        onFilterChanged(event.target.value);

        setFilter(event.target.value);
    };

    return (
        <div className="filter-box">
            <MDBInput label="Filter" icon="search" value={filter} onChange={filterChanged}/>
        </div>
        
    );
};

export default FilterBox;