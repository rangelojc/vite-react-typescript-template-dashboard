import { useEffect, useState } from "react";
import { FaChevronUp } from "react-icons/fa";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const target = document.getElementById("appScrollContainer");
    if (!target) return;

    const handleScroll = () => {
      if (target.scrollTop > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    target.addEventListener("scroll", handleScroll);
    return () => target.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    const target = document.getElementById("appScrollContainer");
    if (!target) return;

    target.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed flex-row-center z-10 bottom-2 right-2 md:bottom-5 md:right-5 flex-none bg-secondary-500 text-white rounded-full size-10 shadow-lg hover:brightness-125 opacity-50 hover:opacity-100 transition-all duration-300 transform cursor-pointer"
        >
          <FaChevronUp />
        </button>
      )}
    </>
  );
};

export default ScrollToTopButton;
