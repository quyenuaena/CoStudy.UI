import { useTheme } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  Image,
  Text,
  FlatList,
  View,
  ScrollView,
  TouchableHighlight,
  TouchableOpacity,
  Pressable,
  SafeAreaView,
  TextInput,
} from 'react-native';
import { useDispatch } from 'react-redux';
import styles from 'components/screen/Conversation/styles';
import TextStyles from 'helpers/TextStyles';
import strings from 'localization';
import { color } from 'react-native-reanimated';
import {
  main_2nd_color,
  main_color,
  touch_color,
  active_color,
  background_gray_color,
} from 'constants/colorCommon';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Card } from 'react-native-elements';
const tmpConversation = {
  id: '1',
  title: 'Đây là title 1',
  author: 'Nguyễn Văn Nam',
  content:
    'Bọn mình sẽ sử dụng Python, Jupiter Notebook và Google Collab để phân tích, hiển thị dữ liệu, vẽ biểu đồ các kiểu con đà điểu và bình luận nhé. Bọn mình sẽ sử dụng Python, Jupiter Notebook và Google Collab để phân tích, hiển thị dữ liệu, vẽ biểu đồ các kiểu con đà điểu và bình luận nhé',
  createdDate: '10 phut truoc',
};
const list = [
  {
    author: 'Võ Thanh Tâm',
    content: 'Đây là content Đây là content Đây làaaaaa content Đây là content',
    createdDate: '10 phut truoc',
    amountVote: 10,
    amountComment: 20,
    userId: '1',
    id: '1',
  },
  {
    author: 'Võ Thanh Tâm',
    content: 'Đây là content',
    createdDate: '10 phut truoc',
    amountVote: 10,
    amountComment: 20,
    userId: '1',

    id: '2',
  },

  {
    author: 'Võ Thanh Tâm',
    content:
      'Đây là contentĐây là content Đây là content Đây là content Đây là contentsss',
    createdDate: '10 phut truoc',
    amountVote: 10,
    amountComment: 20,
    userId: '2',

    id: '3',
  },

  {
    author: 'Võ Thanh Tâm',
    content: 'Đây là content',
    createdDate: '10 phut truoc',
    amountVote: 10,
    amountComment: 20,
    userId: '1',

    id: '4',
  },
  {
    author: 'Võ Thanh Tâm',
    content: 'Đây là content',
    createdDate: '10 phut truoc',
    amountVote: 10,
    amountComment: 20,
    userId: '2',

    id: '6',
  },
];
const comment = {
  author: 'Võ Thanh Tâm',
  content: 'Đây là content',
  createdDate: '10 phut truoc',
  amountVote: 10,
  amountComment: 20,
};

function RightMessage({ content }) {
  const [showTime, setShowTime] = useState(false);
  return (
    <TouchableOpacity onPress={() => setShowTime(!showTime)}>
      <View style={styles.containerRightMessage}>
        <View style={{ alignSelf: 'center' }}>
          <FontAwesome5 name={'check-circle'} size={12} />
        </View>

        <View>
          <View style={styles.boxRightMessage}>
            <Text>{content}</Text>
          </View>

          {showTime ? (
            <View style={styles.timeRight}>
              <Text>11:00</Text>
            </View>
          ) : null}
        </View>
      </View>
    </TouchableOpacity>
  );
}
function LeftMessage({ content }) {
  const [showTime, setShowTime] = useState(false);

  return (
    <TouchableOpacity onPress={() => setShowTime(!showTime)}>
      <View style={styles.containerLeftMessage}>
        <View>
          <Image
            style={styles.imgAvatar}
            source={require('../../../assets/avatar.jpeg')}
          />
        </View>
        <View style={styles.shink1}>
          <View style={styles.boxMessage}>
            <Text>{content}</Text>
          </View>
          {showTime ? (
            <View
              style={styles.timeLeft}
            >
              <Text>11:00</Text>
            </View>
          ) : null}
        </View>
      </View>
    </TouchableOpacity>
  );
}
function Conversation(props) {
  const post = tmpConversation;
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const [showOption, setShowOption] = useState(true);

  const renderItem = ({ item }) => {
    if (item.userId == '1') return <RightMessage content={item.content} />;
    else return <LeftMessage content={item.content} />;
  };
  return (
    <View style={styles.largeContainer}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.containerChat}>
        <SafeAreaView>
          <FlatList
            inverted={-1}
            initialScrollIndex={1}
            showsVerticalScrollIndicator={false}
            data={list}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
        </SafeAreaView>
      </ScrollView>
      <View style={styles.containerInput}>
        {showOption ? (
          <View style={styles.grOption}>
            <TouchableOpacity style={styles.btnInputOption}>
              <FontAwesome5 name={'plus-circle'} size={24} color={main_color} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnInputOption}>
              <FontAwesome5
                name={'square-root-alt'}
                size={24}
                color={main_color}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnInputOption}>
              <FontAwesome5 name={'images'} size={24} color={main_color} />
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
          style={styles.btnInputOption}
          onPress={() => setShowOption(true)}
          >
            <FontAwesome5 name={'angle-right'} size={24} color={main_color} />
          </TouchableOpacity>
        )}
        <TextInput
          multiline={true}
          style={styles.input}
          onTouchEnd={() => setShowOption(false)}
          placeholder="Nhập j đi tml.."
        />
        <TouchableOpacity style={styles.btnInputOption}>
          <FontAwesome5 name={'paper-plane'} size={24} color={main_color} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Conversation;
