import React from 'react';
import underConstruction from "../../assets/images/under-construction.webp";
// import underConstruction from "../../"

const Construction = () => {
    return (
        <div className="w-screen h-screen flex items-center justify-center">
            <img
                src={underConstruction}
                alt="This is site is under maintenance"
                className="xl:w-1/2"
            />
        </div>
    );
};

export default Construction;