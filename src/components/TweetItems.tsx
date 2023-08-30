import React from 'react';
import {FlatList, View, Text, TouchableOpacity, StyleSheet} from 'react-native';

interface Content {
  id: number;
  tweet: string;
}

interface Props {
  tweet: Content[];
  likeTweet: (content: Content) => void;
  commentTweet: () => void;
}

const TweetItems: React.FC<Props> = ({tweet, likeTweet, commentTweet}) => {
  const renderItem = ({item}: {item: Tweet}) => (
    <View style={styles.tweet}>
      <Text style={styles.tweetText}>{item.text}</Text>
      <TouchableOpacity onPress={() => likeTweet(item.id)}>
        <Text>{`${item.likes} Likes`}</Text>
      </TouchableOpacity>
    </View>
  );
  return (
    <FlatList
      data={tweet}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      style={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tweet: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  tweetText: {
    fontSize: 16,
  },
});
export default TweetItems;
