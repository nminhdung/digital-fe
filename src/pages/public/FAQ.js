import React, { useState } from 'react'
import { BreadCumbs } from "../../components";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
const FAQs = [
  {
    id: 1,
    title: '1. What payment you accept?',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, Lorem ipsum dolor sit amet, consectetur adipisicing elit, Lorem ipsum dolor sit amet, consectetur adipisicing elit,'
  },
  {
    id: 2,
    title: '2. In what country can you deliver? ',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit,ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  },
  {
    id: 3,
    title: '3. How to track my parcel? ',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit,sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim '
  },
  {
    id: 4,
    title: '4. Why amadea is the best e-commerce theme? ',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit,'
  },

]
const FAQ = () => {
  const [actived, setActive] = useState([])
  const handleActive = (faqId) => {
    if (actived.some(id => id === faqId)) {
      const deletedActive = actived.filter(id => id !== faqId)
      setActive(deletedActive)
    } else {
      setActive([...actived, faqId])
    }
  }
  return (
    <div className="w-full mb-[100px]">
      <div className="bg-gray-100 h-[81px] flex md:justify-center items-center">
        <div className="xl:w-main">
          <h3 className="font-bold">FAQ</h3>
          <BreadCumbs category="faq" />
        </div>
      </div>
      <div className='xl:w-main mx-auto'>
        <div className="">
          {FAQs.map((faq) => {
            return (
              <div className=' my-4 border cursor-pointer' key={faq.id} onClick={() => handleActive(faq.id)}>
                <h2 className={`w-full   p-4 flex items-center justify-between ${actived.some(id => id === faq.id) ? 'bg-red-500 text-white' : 'bg-white text-black'}`}>

                  {faq.title}
                  {actived.some(id => id === faq.id) ? <FaMinus /> : <FaPlus />}
                </h2>
                {actived.some(id => id === faq.id) ? <p className="w-full p-2">
                  {faq.description}
                </p> : ""}
              </div>
            )
          })}

        </div>
      </div>
    </div>
  )
}

export default FAQ