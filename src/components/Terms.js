import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Button, Appbar, Paragraph } from 'react-native-paper';
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
          <Paragraph>第1条　総則
            1.   この利用規約（以下「本利用規約」といいます）は、本アプリケーション「虫マップワールド」（以下「本アプリ」といいます）上で提供するサービスをユーザーが利用する際の一切の行為に適用されます。
            2.   本利用規約は、本サービスの利用条件を定めるものです。ユーザーは、本利用規約に従い本サービスを利用するものとします。
            3.   ユーザーは、本サービスを利用することにより、本利用規約の全ての記載内容について同意したものとみなされます。</Paragraph>
          <Paragraph>第2条　定義
            本利用規約において使用する用語の意義は、次の各号に定めるとおりとします。
            本アプリ：アプリケーション「虫マップワールド」をいいます。
            本サービス：本アプリ上で提供される全てのサービスをいいます。
            ユーザー：本アプリを閲覧した者をいいます。
            登録・コメント等の情報：テキスト、URL、画像など、本サービスを利用して投稿できる情報をいいます。
            投稿：ユーザーが本アプリに地点情報やコメント等の情報をアップロードする行為をいいます。</Paragraph>
         <Paragraph>ここに利用規約の本文を書きます。</Paragraph>
          
        </ScrollView>
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({});
