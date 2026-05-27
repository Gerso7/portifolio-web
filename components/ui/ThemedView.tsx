import { View, ViewProps, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';

type ViewVariant = 'default' | 'card' | 'surface';

interface ThemedViewProps extends ViewProps {
  variant?: ViewVariant;
}

export function ThemedView({ style, variant = 'default', ...rest }: ThemedViewProps) {
  return <View style={[viewStyles[variant], style]} {...rest} />;
}

const viewStyles = StyleSheet.create({
  default: { backgroundColor: Colors.background },
  card: {
    backgroundColor: Colors.card,
    borderColor: Colors.border,
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
  },
  surface: { backgroundColor: Colors.surface, borderRadius: 12 },
});
