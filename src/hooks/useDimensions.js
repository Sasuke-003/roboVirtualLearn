import React, {useState, useEffect} from 'react';
import {Dimensions} from 'react-native';

const useDimension = () => {
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));

  useEffect(() => {
    const onChange = e => {
      setDimensions(e.window);
    };
    const subscribe = Dimensions.addEventListener('change', onChange);
    return () => {
      subscribe.remove();
    };
  }, []);
  return {...dimensions, isPortrait: dimensions.height > dimensions.width};
};
export default useDimension;
