import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const useWindow = (size) => {
  // getWindowDimensions
  const [windowSize, setWindowSize] = useState(size || 768);
  useEffect(() => {
    function viewport() {
      var width = Math.max(
        document.documentElement.clientWidth,
        window.innerWidth || 0
      );
      setWindowSize(width);
    }
    viewport();
    window.onresize = viewport;
  }, []);

  return windowSize;
};

const ExampleComponent = () => {
  const windowWidth = useWindow(768); // Hook to detect window size

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }} // Initial animation state
      animate={{ opacity: 1, y: 0 }} // Final animation state
      transition={{ duration: 0.5 }} // Animation duration
      key={windowWidth} // This triggers re-animation when window size changes
    >
      <h1>The window size is {windowWidth}px</h1>
    </motion.div>
  );
};

export default ExampleComponent;
