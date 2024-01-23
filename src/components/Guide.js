import React from 'react';
import { View, StyleSheet, ScrollView,Image,Text } from 'react-native';
import { Paragraph } from 'react-native-paper';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

// カスタムのテーマオブジェクトを作成
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#4c9753', // 薄暗い緑色に設定
  },
};

export default function Input() {
  const navigation = useNavigation(); // useNavigaぴんマップ関数コンポーネント内で呼び出す

  return (
    <PaperProvider theme={theme}>
      <View style={styles.container}>
        <ScrollView style={{ padding: 16}}>
          <Paragraph  style={styles.ptest}>以下使い方ガイドになります</Paragraph>
          <Image
                source={require('../../assets/説明Main.png')}
                style={{ height: 720, width: 350, marginBottom:20 }}
              />
              <Text style={styles.textStyle}>①現在地</Text>
              <Text style={styles.textStyle}>②現在地に移動</Text>
              <Text style={styles.textStyle}>③ピン追加マップ</Text>
              <Paragraph style={styles.ptest}>③を選択すると以下のピン追加マップに移動します</Paragraph>
              <Image
                source={require('../../assets/ピンマップ.png')}
                style={{ height: 720, width: 350, marginBottom:20 }}
              />
              <Paragraph style={styles.ptest}>ピンを立てる場所をタップすると以下のピン登録ページに移動します</Paragraph>
              <Image
                source={require('../../assets/ピン登録.png')}
                style={{ height: 720, width: 350, marginBottom:20 }}
              />
               <Paragraph style={styles.ptest}>登録ボタンでマップにピンを登録できます</Paragraph>
              <Text style={styles.textStyle}>④お問い合わせ画面へ</Text>
              <Image
                source={require('../../assets/お問合せ.png')}
                style={{ height: 720, width: 350, marginBottom:20 }}
              />
              <Paragraph style={styles.ptest}>送信ボタンで送信ができます</Paragraph>

              <Text style={styles.textStyle}>⑤その他</Text>
              <Paragraph style={styles.ptest}>利用規約と使い方ガイドが表示できます</Paragraph>

              <Text style={styles.textStyle}>⑥検索</Text>
              <Paragraph style={styles.ptest}>スポット、昆虫を検索することができます</Paragraph>
              <Image
                source={require('../../assets/検索.png')}
                style={{ height: 700, width: 350, marginBottom:20 }}
              />

              <Text style={styles.textStyle}>⑦ピンの詳細</Text>
              <Paragraph style={styles.ptest}>カブトムシのピンをタップするとピンの詳細データが見れます。</Paragraph>
              <Image
                source={require('../../assets/詳細データ.png')}
                style={{ height: 720, width: 350, marginBottom:20 }}
              />
              <Paragraph style={styles.ptest}>1.現在値からのルートを案内することができます</Paragraph>
              <Paragraph style={styles.ptest}>2.コメントを投稿することができます</Paragraph>
              <Paragraph style={styles.ptest}>3.ピンの削除依頼を送信することができます</Paragraph>
        </ScrollView>
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
   marginBottom:'10%',
   backgroundColor:'grey'
  },
  textStyle:{
   fontSize:20,
   fontWeight:'bold',
   marginBottom:20
  },
  ptest:{
    marginBottom:10,
    fontSize:14,
    fontWeight:'bold',
  }
});
