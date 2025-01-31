import styled from 'styled-components';
import { motion } from 'motion/react';
import { useRef } from 'react';

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Box = styled(motion.div)`
  width: 200px;
  height: 200px;
  display: grid;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 40px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const BiggerBox = styled.div`
  width: 600px;
  height: 600px;
  background-color: rgba(255, 255, 255, 0.4);
  border-radius: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const boxVariants = {
  hover: { rotateZ: 90 },
  click: { borderRadius: '100px' },
  drag: { backgroundColor: 'rgb(46, 204, 113)' },
  dragConstraints: {},
};

const MotionGestures = () => {
  const biggerBoxRef = useRef<HTMLDivElement>(null);

  return (
    <Wrapper>
      <BiggerBox ref={biggerBoxRef}>
        <Box
          drag
          dragSnapToOrigin
          dragElastic={0}
          dragConstraints={biggerBoxRef}
          variants={boxVariants}
          whileHover={'hover'}
          whileTap={'click'}
          whileDrag={'drag'}
        />
      </BiggerBox>
    </Wrapper>
  );
};

export default MotionGestures;
