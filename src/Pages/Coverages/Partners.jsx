import React from 'react';
import logo1 from '../../assets/Partnerships/wordpress.png'
import logo2 from '../../assets/Partnerships/cisco.png'
import logo3 from '../../assets/Partnerships/it.png'
import logo4 from '../../assets/Partnerships/notion.png'
import logo5 from '../../assets/Partnerships/socialpilot.png'
import logo6 from '../../assets/Partnerships/tesla.png'
import logo7 from '../../assets/Partnerships/zoom.png'
import Headlines from './../Shared/Headlines/Headlines';

const Partners = () => {
    return (
        <>
        <div className='my-16'>

            <Headlines heading={"Our Partners"} subHeading={"Trusted by over 15,000 companies and millions of learners around the world"} ></Headlines>


        <div className="card bg-base-100 w-8/12  rounded-2xl shadow-lg mx-auto ">

        <div className='flex flex-row justify-around p-6 py-10'>
          <img src={logo1} alt="Partner 1" className="w-24 h-2w-24 object-contain "/>
          <h2 className='border-r-2'></h2>
          <img src={logo2} alt="Partner 2" className="w-24 h-2w-24 object-contain "/>
          <h2 className='border-r-2'></h2>

          <img src={logo3} alt="Partner 3" className="w-24 h-2w-24 object-contain "/>
          <h2 className='border-r-2'></h2>

          <img src={logo4} alt="Partner 4" className="w-24 h-2w-24 object-contain "/>
          <h2 className='border-r-2'></h2>

          <img src={logo5} alt="Partner 5" className="w-24 h-2w-24 object-contain "/>
          <h2 className='border-r-2'></h2>

          <img src={logo6} alt="Partner 6" className="w-24 h-2w-24 object-contain "/>
          <h2 className='border-r-2'></h2>

          <img src={logo7} alt="Partner 7" className="w-24 h-2w-24 object-contain "/>
        </div>


</div>
        </div>
            
        </>
    );
};

export default Partners;