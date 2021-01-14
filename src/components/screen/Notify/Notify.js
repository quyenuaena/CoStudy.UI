import { useTheme, useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { Text, View, FlatList, ToastAndroid } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import styles from 'components/screen/Notify/styles';
import TextStyles from 'helpers/TextStyles';
import strings from 'localization';
import { getUser } from 'selectors/UserSelectors';
import NotifyCard from '../../common/NotifyCard';
import { api } from 'constants/route';
import moment from 'moment';
import { getAPI } from '../../../apis/instance';
import messaging from '@react-native-firebase/messaging';
import Toast from 'react-native-toast-message';
import { setNotify } from 'actions/NotifyAction';
function Notify() {
  const { colors } = useTheme();
  const [list, setList] = useState([]);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const curUser = useSelector(getUser);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(setNotify(0));
    });

    return unsubscribe;
  }, [navigation]);
  const onDeleteCallBack = React.useCallback(id => {
    let tmp = list.filter(i => i.oid !== id);

    setList([...tmp]);
    setTimeout(() => ToastAndroid.show('Đã xóa thông báo.', 1000), 1000);
  });
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      if (
        typeof JSON.parse(
          JSON.stringify(JSON.parse(JSON.stringify(remoteMessage)).data)
        ).notification == 'undefined'
      )
        return;
      const res = JSON.parse(
        JSON.parse(
          JSON.stringify(JSON.parse(JSON.stringify(remoteMessage)).data)
        ).notification
      );
      if (
        JSON.parse(
          JSON.parse(
            JSON.stringify(JSON.parse(JSON.stringify(remoteMessage)).data)
          ).notification
        ).AuthorId != curUser.oid
      )
        Toast.show({
          type: 'success',
          position: 'top',
          text1: JSON.parse(
            JSON.parse(
              JSON.stringify(JSON.parse(JSON.stringify(remoteMessage)).data)
            ).notification
          ).Content,
          visibilityTime: 2000,
        });
      setList([
        {
          author_avatar: res.AuthorAvatar,
          content: res.Content,
          created_date: new Date(),
          isUnread: true,
        },
        ...list,
      ]);
    });

    return unsubscribe;
  }, [list]);

  useEffect(() => {
    let isRender = true;

    const fetch = async () => {
      await getAPI(curUser.jwtToken)
        .get(api + 'Noftication/current')
        .then(res => {
          res.data.result.sort(
            (d1, d2) => new Date(d2.modified_date) - new Date(d1.modified_date)
          );
          res.data.result.map(i => (i.isUnread = false));
          setList(res.data.result);
        })
        .catch(err => console.log(err));
    };
    fetch();
    return () => {
      isRender = false;
    };
  }, []);

  const renderItem = ({ item }) => {
    return <NotifyCard notify={item} onDelete={onDeleteCallBack} />;
  };
  return (
    <View>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={list}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

export default Notify;
