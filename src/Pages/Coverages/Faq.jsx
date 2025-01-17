import { useState } from 'react';
import Headlines from '../Shared/Headlines/Headlines';

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAnswer = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = 
    
  [
    {
      "question": "How do I become an instructor on Edukator?",
      "answer": "To become an instructor on Edukator, sign up for an account, create a profile, and submit your course or class ideas. Once your submission is approved, you can start creating and managing your classes directly from your instructor dashboard."
    },
    {
      "question": "Is there a cost to enroll in classes on Edukator?",
      "answer": "The cost of enrolling in classes on Edukator varies. Some classes are free, while others may have a fee. You can view the price for each class before enrolling on the course page."
    },
    {
      "question": "How can I create my own class as an instructor?",
      "answer": "To create a class, log in to your instructor dashboard and click on the 'Create New Class' option. Fill in the required details such as course title, description, and materials, and then publish your class once it's ready."
    },
    {
      "question": "How do I track my learning progress on Edukator?",
      "answer": "You can track your progress by accessing the 'My Courses' section in your account. Each course will display your completion percentage, grades, and any upcoming assignments or tests."
    },
    {
      "question": "Can I interact with other students in Edukator?",
      "answer": "Yes! Edukator allows students to interact with each other through discussion forums, chat features, and group assignments. You can also connect with instructors to ask questions and get feedback."
    },
    {
      "question": "What if I need help with a class?",
      "answer": "If you need help with a class, you can contact the instructor directly through the course page or post your questions in the course's discussion forum. You can also reach out to Edukator support for additional assistance."
    },
    {
      "question": "How do I become a premium instructor on Edukator?",
      "answer": "To become a premium instructor, you need to meet certain criteria such as having a number of successful classes, positive feedback, and engagement. You can apply for premium status through your instructor dashboard."
    },
    {
      "question": "Can I invite others to join Edukator?",
      "answer": "Yes! You can invite friends or colleagues to join Edukator by sharing your referral link. Once they sign up, you can collaborate, share courses, and learn together."
    }
  ]
  
  ;

  return (
    <div className="py-16 ">
        <Headlines heading={"Frequently Asked Questions"} subHeading={"Explore Our Most Frequently Asked Questions"}></Headlines>
      <div className="text-center bg-base-100 w-10/12 sm:w-8/12 mx-auto py-16 px-4 sm:px-10  rounded-3xl  shadow-md">
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-200">
              <div
                className="cursor-pointer flex justify-between items-center py-4"
                onClick={() => toggleAnswer(index)}
              >
                <h3 className="text-xl sm:text-2xl font-medium ">{faq.question}</h3>
                <span className="text-xl ">
                  {activeIndex === index ? '-' : '+'}
                </span>
              </div>
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  activeIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="text-gray-600 py-4 text-start text-lg">
                  <p>{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Faq;