import React from 'react';
import Banner from '../../Coverages/Banner';
import Partners from '../../Coverages/Partners';
import Becomeinstructor from '../../Coverages/Becomeinstructor';
import Growth from '../../Coverages/Growth';
import Faq from '../../Coverages/Faq';
import Feedback from '../../Coverages/Feedback';
import PopularClasses from './../../Coverages/PopularClasses';

const Home = () => {
    return (
        <div>
            <Banner></Banner>    
            <Partners></Partners>    
            <PopularClasses></PopularClasses>
            <Feedback></Feedback>
            <Growth></Growth>
            <Becomeinstructor></Becomeinstructor>   
            <Faq></Faq> 
        </div>
    );
};

export default Home;