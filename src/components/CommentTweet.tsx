import React, {useState} from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import Button from '../components/CustomButton';

interface Content {
  id: number;
  tweet: string;
  likes: number;
}

interface Props {
  tweet: Content[];
  tweetId: string;

  commentTweet: (content: Content, commentText: string) => void;
}
const CommentForm: React.FC<Props> = ({ tweetId, commentTweet }) => {
    console.log('tweetId===', tweetId);
  const [commentText, setCommentText] = useState('');

  const handleSubmit = () => {
    if (commentText.trim() !== '') {
      commentTweet(tweetId, commentText);
      setCommentText('');
    }
  };

  return (
    <View>
      <TextInput
        style={styles.commentInput}
        placeholder="Add a comment"
        value={commentText}
        onChangeText={setCommentText}
      />
      <Button
        backgroundColor={'#0074D9'}
        textColor={'#fff'}
        title="Comment"
        onPress={handleSubmit}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  commentInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 8,
    marginBottom: 8,
  },
});

export default CommentForm;
