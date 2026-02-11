import React, { useMemo } from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';
import { useThemeStore, ThemePreference } from '../store/themeStore';
import { ThemeColors } from '../theme/colors';

type IoniconsName = React.ComponentProps<typeof Ionicons>['name'];

interface SettingsItemProps {
  icon: IoniconsName;
  label: string;
  onPress: () => void;
  colors: ThemeColors;
}

const SettingsItem = ({ icon, label, onPress, colors }: SettingsItemProps) => {
  const styles = useMemo(() => createStyles(colors), [colors]);
  return (
    <TouchableOpacity style={styles.itemRow} onPress={onPress}>
      <View style={styles.itemLeft}>
        <Ionicons name={icon} size={24} color={colors.accent} />
        <Text style={styles.itemLabel}>{label}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
    </TouchableOpacity>
  );
};

const themeOptions: { label: string; value: ThemePreference }[] = [
  { label: 'System', value: 'system' },
  { label: 'Light', value: 'light' },
  { label: 'Dark', value: 'dark' },
];

const ThemeSelector = ({ colors }: { colors: ThemeColors }) => {
  const preference = useThemeStore((s) => s.preference);
  const setPreference = useThemeStore((s) => s.setPreference);
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <View style={styles.themeRow}>
      <View style={styles.itemLeft}>
        <Ionicons name="color-palette-outline" size={24} color={colors.accent} />
        <Text style={styles.itemLabel}>Theme</Text>
      </View>
      <View style={styles.pillContainer}>
        {themeOptions.map((opt) => {
          const isActive = preference === opt.value;
          return (
            <TouchableOpacity
              key={opt.value}
              style={[
                styles.pill,
                isActive ? styles.pillActive : styles.pillInactive,
              ]}
              onPress={() => setPreference(opt.value)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.pillText,
                  isActive ? styles.pillTextActive : styles.pillTextInactive,
                ]}
              >
                {opt.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const SettingsScreen = () => {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <ScrollView style={styles.container}>
      {/* Preferences */}
      <Text style={styles.sectionHeader}>PREFERENCES</Text>
      <ThemeSelector colors={colors} />

      {/* Information */}
      <Text style={styles.sectionHeader}>INFORMATION</Text>
      <SettingsItem
        icon="book-outline"
        label="Game Rules"
        onPress={() => {}}
        colors={colors}
      />
      <SettingsItem
        icon="bug-outline"
        label="Report Issue"
        onPress={() => {}}
        colors={colors}
      />
      <SettingsItem
        icon="information-circle-outline"
        label="About"
        onPress={() => {}}
        colors={colors}
      />

      {/* Legal */}
      <Text style={styles.sectionHeader}>LEGAL</Text>
      <SettingsItem
        icon="shield-checkmark-outline"
        label="Privacy Policy"
        onPress={() => {}}
        colors={colors}
      />
      <SettingsItem
        icon="document-text-outline"
        label="Terms & Conditions"
        onPress={() => {}}
        colors={colors}
      />

      {/* Version */}
      <Text style={styles.version}>Version 1.0.0</Text>
    </ScrollView>
  );
};

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    sectionHeader: {
      fontSize: 12,
      color: colors.textSecondary,
      textTransform: 'uppercase',
      paddingHorizontal: 16,
      paddingTop: 24,
      paddingBottom: 8,
      letterSpacing: 0.5,
    },
    itemRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 14,
      paddingHorizontal: 16,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: colors.surface,
    },
    itemLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
    },
    itemLabel: {
      fontSize: 16,
      color: colors.text,
    },
    version: {
      textAlign: 'center',
      color: colors.textSecondary,
      fontSize: 13,
      marginTop: 32,
      marginBottom: 24,
    },
    themeRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 14,
      paddingHorizontal: 16,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: colors.surface,
    },
    pillContainer: {
      flexDirection: 'row',
      gap: 6,
    },
    pill: {
      paddingHorizontal: 10,
      paddingVertical: 6,
      borderRadius: 14,
    },
    pillActive: {
      backgroundColor: colors.accent,
    },
    pillInactive: {
      backgroundColor: colors.surface,
    },
    pillText: {
      fontSize: 13,
      fontWeight: '600',
    },
    pillTextActive: {
      color: '#FFFFFF',
    },
    pillTextInactive: {
      color: colors.textSecondary,
    },
  });

export default SettingsScreen;
