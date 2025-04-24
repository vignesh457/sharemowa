import React, { useEffect, useRef } from 'react';
import { Animated, View, StyleSheet } from 'react-native';

const DOT_COUNT = 5;
const DOT_SIZE = 12;
const DOT_SPACING = 8;
const ANIMATION_HEIGHT = 8;
const ANIMATION_DURATION = 600;

const CustomLoader = () => {
  const animations = useRef(
    [...Array(DOT_COUNT)].map(() => new Animated.Value(0))
  ).current;

  useEffect(() => {
    const createWave = (animatedValue: Animated.Value | Animated.ValueXY, delay: number) => {
      return Animated.loop(
        Animated.sequence([
          Animated.timing(animatedValue, {
            toValue: -ANIMATION_HEIGHT,
            duration: ANIMATION_DURATION,
            delay,
            useNativeDriver: true,
          }),
          Animated.timing(animatedValue, {
            toValue: ANIMATION_HEIGHT,
            duration: ANIMATION_DURATION,
            useNativeDriver: true,
          }),
          Animated.timing(animatedValue, {
            toValue: 0,
            duration: ANIMATION_DURATION,
            useNativeDriver: true,
          }),
        ])
      );
    };

    animations.forEach((anim, index) => {
      createWave(anim, index * 100).start();
    });
  }, []);

  return (
    <View className="w-full h-full bg-[#00000080] absolute top-0 left-0 flex justify-center items-center pt-5 z-10">
    <View style={styles.container}>
      {animations.map((translateY, index) => {
        const backgroundColor = index % 2 === 0 ? '#DFDFDFD' : '#E27139';
        return (
          <Animated.View
            key={index}
            style={[
              styles.dot,
              {
                backgroundColor,
                transform: [{ translateY }],
                marginLeft: index === 0 ? 0 : DOT_SPACING,
              },
            ]}
          />
        );
      })}
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  dot: {
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
  },
});

export default CustomLoader;
