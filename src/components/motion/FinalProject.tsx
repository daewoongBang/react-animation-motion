import styled from 'styled-components';
import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  width: 50vw;
  gap: 10px;
`;

const Box = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 20px;
  height: 200px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const Circle = styled(motion.div)`
  background-color: #ffffff;
  height: 50px;
  width: 50px;
  border-radius: 25px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const Overlay = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Button = styled(motion.button)`
  position: absolute;
  bottom: 300px;
  padding: 5px 10px;
`;

const overlay = {
  hidden: { backgroundColor: 'rgba(0, 0, 0, 0)' },
  visible: { backgroundColor: 'rgba(0, 0, 0, 0.5)' },
  exit: { backgroundColor: 'rgba(0, 0, 0, 0)' },
};

const boxVariants = {
  hover: (id: string) => ({
    scale: 1.2,
    x: id === '1' || id === '3' ? -25 : id === '2' || id === '4' ? 25 : 0,
    y: id === '1' || id === '2' ? -15 : id === '3' || id === '4' ? 15 : 0,
  }),
};

const MotionFinalProject = () => {
  const [id, setId] = useState<string | null>(null);
  const [circleIndex, setCircleIndex] = useState<string>('2');

  const onClickBox = (id: string | null) => setId(id);

  const onClickSwitch = () =>
    setCircleIndex((prev) => (prev === '2' ? '3' : '2'));

  return (
    <Wrapper>
      <Grid>
        {['1', '2', '3', '4'].map((id) => (
          <Box
            key={`box-${id}`}
            variants={boxVariants}
            custom={id}
            whileHover={'hover'}
            transition={{ type: 'spring' }}
            onClick={() => onClickBox(id)}
            layoutId={id}
          >
            {id === circleIndex && <Circle layoutId={'circle'} />}
          </Box>
        ))}
      </Grid>

      <AnimatePresence>
        {id ? (
          <Overlay
            variants={overlay}
            onClick={() => onClickBox(null)}
            initial='hidden'
            animate='visible'
            exit='exit'
          >
            <Box
              layoutId={id}
              style={{
                width: 400,
                height: 200,
                backgroundColor: 'rgba(255, 255, 255, 1)',
              }}
            />
          </Overlay>
        ) : null}
      </AnimatePresence>

      <Button
        animate={{
          color: circleIndex === '2' ? 'blue' : 'red',
          scale: circleIndex === '2' ? 1 : 1.5,
        }}
        onClick={onClickSwitch}
      >
        switch
      </Button>
    </Wrapper>
  );
};

export default MotionFinalProject;
