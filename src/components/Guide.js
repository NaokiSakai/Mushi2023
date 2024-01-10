import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Paragraph } from 'react-native-paper';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

// カスタムのテーマオブジェクトを作成
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#2E8B57', // 薄暗い緑色に設定
  },
};

export default function Input() {
  const navigation = useNavigation(); // useNavigationを関数コンポーネント内で呼び出す

  return (
    <PaperProvider theme={theme}>
      <View style={styles.container}>
        <ScrollView style={{ padding: 16 }}>
          <Paragraph>ここに利用規約の本文を書きます。</Paragraph>
          <Paragraph>ここに利用規約の本文を書きます。</Paragraph>
        </ScrollView>
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({});
