import React from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

type IoniconsName = React.ComponentProps<typeof Ionicons>['name'];

interface SettingsItemProps {
  icon: IoniconsName;
  label: string;
  onPress: () => void;
}

const SettingsItem = ({ icon, label, onPress }: SettingsItemProps) => (
  <TouchableOpacity style={styles.itemRow} onPress={onPress}>
    <View style={styles.itemLeft}>
      <Ionicons name={icon} size={24} color={colors.accent} />
      <Text style={styles.itemLabel}>{label}</Text>
    </View>
    <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
  </TouchableOpacity>
);

const SectionHeader = ({ title }: { title: string }) => (
  <Text style={styles.sectionHeader}>{title}</Text>
);

const SettingsScreen = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Preferences */}
      <SectionHeader title="PREFERENCES" />
      <SettingsItem
        icon="color-palette-outline"
        label="Theme"
        onPress={() => {}}
      />

      {/* Information */}
      <SectionHeader title="INFORMATION" />
      <SettingsItem
        icon="book-outline"
        label="Game Rules"
        onPress={() => {}}
      />
      <SettingsItem
        icon="bug-outline"
        label="Report Issue"
        onPress={() => {}}
      />
      <SettingsItem
        icon="information-circle-outline"
        label="About"
        onPress={() => {}}
      />

      {/* Legal */}
      <SectionHeader title="LEGAL" />
      <SettingsItem
        icon="shield-checkmark-outline"
        label="Privacy Policy"
        onPress={() => {}}
      />
      <SettingsItem
        icon="document-text-outline"
        label="Terms & Conditions"
        onPress={() => {}}
      />

      {/* Version */}
      <Text style={styles.version}>Version 1.0.0</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
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
});

export default SettingsScreen;
