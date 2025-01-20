import React from 'react';

const Headlines = ({heading , subHeading}) => {
    return (
        <div className='text-center mt-20 mb-16'>

<h2 className='text-2xl sm:text-4xl font-bold text-orange-500'> <span className='border-b-2 p-3 border-orange-500'>~ {heading} ~</span></h2>
<h2 className='text-center my-8 font-semibold text-sm sm:text-lg'>{subHeading}</h2>

            
        </div>
    );
};

export default Headlines;