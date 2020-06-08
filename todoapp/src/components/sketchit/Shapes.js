import React from 'react'

const Shapes = ({ customShapesMap, handleUpdateShapes }) => {

    const shapeList = customShapesMap.length ? (
        customShapesMap.map(eachShape => {
            // console.log(eachShape.shape);
            return (
                <g key={eachShape.id}>
                    {eachShape.shape}
                </g>);
        })
    ) : (
            <></>
        )

    // console.log(shapeList);


    return (
        <>
            {shapeList}
        </>
    );
}

export default Shapes;
