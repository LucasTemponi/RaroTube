import { MutableRefObject, useEffect, useState } from "react";

export const useScroll = (scrollRef: MutableRefObject<Element | null>) => {
  const [ pagina,setPagina ] = useState(1);

  useEffect(() => {
    const intersectionObserver = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        console.log(pagina)
        setPagina((pagina)=>pagina + 1);
      }
    });
    if (scrollRef.current) {
      intersectionObserver.observe(scrollRef.current);
    }

    return () => {
      intersectionObserver.disconnect();
    };  
  },[]);

  return pagina
};