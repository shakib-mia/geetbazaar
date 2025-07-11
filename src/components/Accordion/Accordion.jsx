import gsap from "gsap";
import React, { useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const AccordionItem = ({
  title,
  content,
  isOpen,
  toggleAccordion,
  listItems,
}) => {
  // listItems ? console.log(listItems) : console.log("object");

  const accordionRef = React.useRef(null);

  useEffect(() => {
    gsap.to(accordionRef.current, {
      opacity: 1,
      left: 0,
      scrollTrigger: {
        trigger: accordionRef.current,
        start: "top 80%",
        // toggleActions: "play none none none",
      },
    });
  }, [isOpen]);

  return (
    <>
      <div
        className="text-white rounded-lg overflow-hidden relative opacity-0 -left-7"
        ref={accordionRef}
      >
        <button
          className="accordion-title flex justify-between w-full py-2 text-left lg:text-lg bg-gradient-to-tr from-black to-grey-dark px-3 rounded-t-lg"
          onClick={toggleAccordion}
        >
          {title}
          <FaChevronDown
            className={`transition-transform duration-300 ease-in-out ${
              isOpen ? "rotate-180" : "rotate-0"
            }`}
          />
        </button>

        <div
          className={`accordion-content px-0 overflow-hidden transition-[max-height_padding] duration-300 ease-in-out rounded-b-lg bg-black ${
            isOpen ? "max-h-[500px] py-2" : "max-h-0 py-0"
          }`}
        >
          <div className="lg:px-4 text-white">
            {listItems ? (
              <>
                {content} <br />
                <ul className="mt-1">
                  {listItems.map((item, key) => (
                    <li key={key}>{item}</li>
                  ))}
                </ul>
              </>
            ) : (
              content
            )}
          </div>
        </div>
      </div>
      {/* <div className="w-full h-[1px] bg-gradient-to-r from-interactive-light to-black"></div> */}
    </>
  );
};

const Accordion = ({ data }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="accordion space-y-1">
      {data.map((item, index) => (
        <AccordionItem
          key={index}
          title={item.title}
          content={item.content}
          isOpen={openIndex === index}
          toggleAccordion={() => toggleAccordion(index)}
          listItems={item.listItems}
        />
      ))}
    </div>
  );
};

export default Accordion;
