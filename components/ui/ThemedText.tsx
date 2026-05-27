import { Text, TextProps, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';

type TextType = 'h1' | 'h2' | 'h3' | 'body' | 'caption' | 'label';

interface ThemedTextProps extends TextProps {
  type?: TextType;
  muted?: boolean;
}

export function ThemedText({ style, type = 'body', muted = false, ...rest }: ThemedTextProps) {
  return (
    <Text
      style={[
        textStyles[type],
        muted && { color: Colors.textMuted },
        style,
      ]}
      {...rest}
    />
  );
}

const textStyles = StyleSheet.create({
  h1: { fontSize: 28, fontWeight: '800', color: Colors.text, letterSpacing: -0.5 },
  h2: { fontSize: 22, fontWeight: '700', color: Colors.text, letterSpacing: -0.3 },
  h3: { fontSize: 17, fontWeight: '700', color: Colors.text },
  body: { fontSize: 14, color: Colors.textSecondary, lineHeight: 22 },
  caption: { fontSize: 12, color: Colors.textMuted },
  label: { fontSize: 10, fontWeight: '700', color: Colors.textMuted, letterSpacing: 1, textTransform: 'uppercase' },
});
