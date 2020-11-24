import { useTheme } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  Text,
  View,
  FlatList,
  Pressable,
  TouchableHighlight,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useSelector } from 'react-redux';
import styles from 'components/screen/Chat/styles';
import TextStyles from 'helpers/TextStyles';
import strings from 'localization';
import { getUser } from 'selectors/UserSelectors';
import ChatCard from '../../common/ChatCard';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {
  background_gray_color,
  main_2nd_color,
  main_color,
  touch_color,
} from 'constants/colorCommon';
import Modal from 'react-native-modal';

const deviceWidth= Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
const list = [
  {
    id: '1',
    title: 'Đây là title',
    author: 'Nguyễn Văn Nam',
    latestChat: 'Đây là tin nhanw cuoi',
    latestTime: '10 phut truoc',
  },
  {
    id: '2',
    title: 'Đây là title',
    author: 'Nguyễn Văn Nam',
    latestChat: 'Đây là tin nhanw cuoi',
    latestTime: '10 phut truoc',
  },
  {
    id: '3',
    title: 'Đây là title',
    author: 'Nguyễn Văn Nam',
    latestChat: 'Đây là tin nhanw cuoi',
    latestTime: '10 phut truoc',
  },
];
function Chat() {
  const { colors } = useTheme();
  const [modalVisible, setModalVisible] = useState(false);

  const user = useSelector(getUser);
  const renderItem = ({ item }) => {
    return (
      <Pressable onLongPress={() => setModalVisible(true)}>
        <ChatCard chat={item} />
      </Pressable>
    );
  };
  return (
    <View
      style={[{ flex: 1, justifyContent: 'flex-end' }]}
    >
      <Pressable onPress={() => {
        setModalVisible(true);
      }}>
        <Text>show modal</Text>
      </Pressable>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={list}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      <Modal
        animationType={'slide'}
        onRequestClose={() => setModalVisible(false)}
        visible={modalVisible}
        transparent={true}
        swipeDirection={'down'}
        backdropOpacity={0.5}
        backdropColor={'rgba(100,100,100)'}
        deviceHeight={deviceHeight}
        deviceWidth={deviceWidth}
        onSwipeComplete= {() => setModalVisible(false)}
        style={{
          margin: 0,
        }}
      
      >
        <TouchableHighlight
          underlayColor={'#00000000'}
          style={{ flex: 1}}
          onPress={() => setModalVisible(false)}
        >
          <View
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            justifyContent: 'flex-end',
            backgroundColor: 'rgba(100,100,100, 0.5)',
          }}
   
          >
            <TouchableHighlight
              underlayColor={touch_color}
              onPress={() => alert('a')}
            >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingHorizontal: 8,
                  paddingVertical: 12,
                  backgroundColor: '#fff'
                }}
              >
                <Icon
                  style={{ marginHorizontal: 12 }}
                  name={'home'}
                  color={main_color}
                  size={24}
                />
                <Text style={{ fontSize: 16 }}>Xóa hội thoại</Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              underlayColor={'#00000000'}
              onPress={() => alert('a')}
            >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingHorizontal: 8,
                  paddingVertical: 12,
                  backgroundColor: '#fff'

                }}
              >
                <Icon
                  style={{ marginHorizontal: 12 }}
                  name={'home'}
                  color={main_color}
                  size={24}
                />
                <Text style={{ fontSize: 16 }}>Xóa hội thoại</Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              underlayColor={touch_color}
              onPress={() => {
                setModalVisible(false);
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingHorizontal: 8,
                  paddingVertical: 12,
                  backgroundColor: '#fff'

                }}
              >
                <Icon
                  style={{ marginHorizontal: 12 }}
                  name={'home'}
                  color={main_color}
                  size={24}
                />
                <Text style={{ fontSize: 16 }}>Xóa hội thoại</Text>
              </View>
            </TouchableHighlight>
          </View>
        </TouchableHighlight>
      </Modal>
    </View>
  );
}

export default Chat;
