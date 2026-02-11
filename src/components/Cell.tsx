import React, { memo, useEffect, useRef, useMemo } from 'react';
import { TouchableOpacity, Text, StyleSheet, View, Animated } from 'react-native';
import { Cell as CellType } from '../types/game';
import { useTheme } from '../theme/ThemeContext';
import { ThemeColors } from '../theme/colors';

interface CellProps {
  cell: CellType;
  isSelected: boolean;
  isHinted: boolean;
  onPress: () => void;
}

const CellComponent = memo(({ cell, isSelected, isHinted, onPress }: CellProps) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;
  const hintAnim = useRef(new Animated.Value(0)).current;
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const isCleared = cell.status === 'cleared';

  // Pulse animation for hint
  useEffect(() => {
    if (isHinted) {
      const pulse = Animated.loop(
        Animated.sequence([
          Animated.timing(hintAnim, {
            toValue: 1,
            duration: 600,
            useNativeDriver: false,
          }),
          Animated.timing(hintAnim, {
            toValue: 0,
            duration: 600,
            useNativeDriver: false,
          }),
        ])
      );
      pulse.start();
      return () => pulse.stop();
    } else {
      hintAnim.setValue(0);
    }
  }, [isHinted, hintAnim]);

  // Scale bounce on selection
  useEffect(() => {
    if (isSelected) {
      Animated.spring(scaleAnim, {
        toValue: 0.92,
        useNativeDriver: true,
        friction: 5,
      }).start();
    } else {
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        friction: 5,
      }).start();
    }
  }, [isSelected, scaleAnim]);

  if (isCleared) {
    return <View style={styles.container} />;
  }

  const hintBorderColor = hintAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [colors.surface, '#4CAF50'],
  });

  const hintBg = hintAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [colors.surface, '#1B5E20'],
  });

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ scale: scaleAnim }],
          opacity: opacityAnim,
        },
      ]}
    >
      <TouchableOpacity
        style={[
          styles.active,
          isSelected && styles.selected,
        ]}
        onPress={onPress}
        activeOpacity={0.7}
      >
        {isHinted ? (
          <Animated.View
            style={[
              styles.hintOverlay,
              {
                borderColor: hintBorderColor,
                backgroundColor: hintBg,
              },
            ]}
          >
            <Text style={[styles.text, styles.hintText]}>{cell.value}</Text>
          </Animated.View>
        ) : (
          <Text style={[styles.text, isSelected && styles.selectedText]}>
            {cell.value}
          </Text>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
});

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      aspectRatio: 1,
      margin: 2,
    },
    active: {
      flex: 1,
      backgroundColor: colors.surface,
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
    },
    selected: {
      backgroundColor: colors.selectedBackground,
      borderWidth: 2,
      borderColor: colors.accent,
    },
    hintOverlay: {
      flex: 1,
      width: '100%',
      borderRadius: 8,
      borderWidth: 2,
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      fontSize: 20,
      fontWeight: 'bold',
      color: colors.text,
    },
    selectedText: {
      color: colors.accent,
    },
    hintText: {
      color: '#4CAF50',
    },
  });

export default CellComponent;
