import styled from 'styled-components';
import { motion, AnimatePresence } from 'motion/react';
import { useRef, useState } from 'react';

const Wrapper = styled(motion.div)`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Box = styled(motion.div)`
  width: 400px;
  height: 200px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 40px;
  position: absolute;
  top: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 28px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const Buttons = styled.div`
  display: flex;
  gap: 20px;
`;

const boxVariants = {
  entry: (isPrev: boolean) => ({
    x: isPrev ? -500 : 500,
    opacity: 0,
    scale: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
    },
  },
  exit: (isPrev: boolean) => ({
    x: isPrev ? 500 : -500,
    opacity: 0,
    scale: 0,
    transition: {
      duration: 0.3,
    },
  }),
};

const MotionSlider = () => {
  const [sliderIndex, setSliderIndex] = useState<number>(1);
  const isPrev = useRef<boolean>(false);

  const onClickNext = () => {
    isPrev.current = false;
    setSliderIndex((prev) => (prev === 10 ? 10 : prev + 1));
  };

  const onClickPrev = () => {
    isPrev.current = true;
    setSliderIndex((prev) => (prev === 1 ? 1 : prev - 1));
  };

  return (
    <Wrapper>
      <AnimatePresence mode={'wait'} custom={isPrev.current}>
        <Box
          key={`box-${sliderIndex}`}
          custom={isPrev.current}
          variants={boxVariants}
          initial={'entry'}
          animate={'center'}
          exit={'exit'}
        >
          {sliderIndex}
        </Box>
      </AnimatePresence>

      <Buttons>
        <button onClick={onClickPrev}>Prev</button>
        <button onClick={onClickNext}>Next</button>
      </Buttons>
    </Wrapper>
  );
};

export default MotionSlider;
