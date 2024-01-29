import React, { useEffect, useState, useRef } from "react";

const CustomLazyLoad = ({
  className,
  src,
  innerRef = null,
  placeholderSrc = window.location.origin + "/assets/images/small-loader.svg",
  ...props
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isInView, setIsInView] = useState(false);
  const root = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(onIntersection, { threshold: 0 });
    observer.observe(root.current);

    function onIntersection(entries) {
      const { isIntersecting } = entries[0];

      if (isIntersecting) {
        observer.disconnect();
      }

      setIsInView(isIntersecting);
    }
  }, []);

  function onLoad() {
    setIsLoading((prev) => !prev);
  }

  return (
    <div
      ref={root}
      className={`lazyLoder`}
    >
      <img
        className={`img ${className ? className : ""}`}
        src={isInView ? src : placeholderSrc}
        alt=""
        onLoad={onLoad}
        ref={innerRef}
        {...props}
      />
    </div>
  );
};

export default CustomLazyLoad