import React from 'react';
import Headlines from './../Shared/Headlines/Headlines';
import instructor from '../../assets/Gif/instructor.gif'
import { Link } from 'react-router-dom';

const Becomeinstructor = () => {
    return (
        <div>
            <div className='my-20'>
                <Headlines heading={"Become an Instructor"} subHeading={"Share Your Knowledge and Make a Difference"}></Headlines>

                <div className="card bg-base-100 w-8/12 p-6 rounded-2xl shadow-lg mx-auto">
                    <div className="flex">
                    <div className='w-6/12 flex justify-center'>
                    <img src={instructor} alt="" className='w-8/12 ' />
                        </div>
                        <div className='w-6/12 flex flex-col justify-center items-center gap-8'>
                            <h3 className="text-4xl font-bold">Instructing is Fun, Not Boring!</h3>
                            <p className='text-md font-semibold text-gray-600'>At Edukator, we believe teaching should be exciting and rewarding! Join our community of passionate instructors and create interactive, engaging learning experiences that inspire students to achieve their best. Whether you're sharing knowledge in your field of expertise or guiding others to unlock their potential, Edukator gives you the tools to make a lasting impact.</p>
                            <button className="p-2 rounded-xl hover:bg-transparent hover:border-gray-800 hover:border-2 hover:text-black bg-orange-400 text-white text-lg w-4s/12 "><Link to="/teach">Start Teaching Today</Link></button>
                            </div>
                    </div>

                </div>



            </div>
            
        </div>
    );
};

export default Becomeinstructor;