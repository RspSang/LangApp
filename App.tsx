import React, { useRef, useState } from "react";
import { Animated, Dimensions, Pressable } from "react-native";
import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const Box = styled(Animated.View)`
  background-color: tomato;
  width: 200px;
  height: 200px;
`;

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function App() {
  const POSITION = useRef(
    new Animated.ValueXY({
      x: -SCREEN_WIDTH / 2 + 100,
      y: -SCREEN_HEIGHT / 2 + 100,
    })
  ).current;
  const topLeft = Animated.timing(POSITION, {
    toValue: { x: -SCREEN_WIDTH / 2 + 100, y: -SCREEN_HEIGHT / 2 + 100 },
    useNativeDriver: false,
  });

  const bottomLeft = Animated.timing(POSITION, {
    toValue: { x: -SCREEN_WIDTH / 2 + 100, y: SCREEN_HEIGHT / 2 - 100 },
    useNativeDriver: false,
  });
  const bottomRight = Animated.timing(POSITION, {
    toValue: { x: SCREEN_WIDTH / 2 - 100, y: SCREEN_HEIGHT / 2 - 100 },
    useNativeDriver: false,
  });
  const topRight = Animated.timing(POSITION, {
    toValue: { x: SCREEN_WIDTH / 2 - 100, y: -SCREEN_HEIGHT / 2 + 100 },
    useNativeDriver: false,
  });
  const moveUp = () => {
    Animated.loop(
      Animated.sequence([bottomLeft, bottomRight, topRight, topLeft])
    ).start();
  };
  const rotation = POSITION.y.interpolate({
    inputRange: [-300, 300],
    outputRange: ["-360deg", "360deg"],
  });
  const borderRadius = POSITION.y.interpolate({
    inputRange: [-300, 300],
    outputRange: [100, 0],
  });
  const bgColor = POSITION.y.interpolate({
    inputRange: [-300, 300],
    outputRange: ["rgb(255,99,71)", "rgb(71,166,255)"],
  });
  return (
    <Container>
      <Pressable onPress={moveUp}>
        <Box
          style={{
            borderRadius: borderRadius,
            backgroundColor: bgColor,
            transform: [
              ...POSITION.getTranslateTransform(),
              // { translateX: POSITION.x },
              // { translateY: POSITION.y },
            ],
          }}
        />
      </Pressable>
    </Container>
  );
}
