import { useEffect, ReactNode } from "react";
import { useLocation } from "react-router-dom";

interface ScrollToTopProps {
  children: ReactNode;
}

const ScrollToTop = (props: ScrollToTopProps) => {
  const location = useLocation();
  useEffect(() => {
    
    window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
  }, [location]);

  return <>{props.children}</>
};

export default ScrollToTop;
