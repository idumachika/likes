import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
// import firebase from 'firebase/app';
import firebase from 'firebase/firestore';
import {
  collection,
  onSnapshot,
  addDoc,
  doc,
  updateDoc,
  increment,
  getDoc,
} from 'firebase/firestore';
import {auth, fireStore} from '../util/fireBase';
import {getAuth, onAuthStateChanged} from 'firebase/auth';

import TweetItems from '../components/TweetItems';
import Input from '../components/Input';
import Button from '../components/CustomButton';
import {colors} from '../util/theme';
import {z} from 'zod';
import {SubmitHandler, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Tweet {
  id: string;
  // ... Other fields in your tweet
}
interface TweetsScreenProps {
  fireStore: firebase.firestore.Firestore;
}
interface Comment {
  id: string;
  text: string;
  userId: string;
  createdAt: Date;
}

const schema = z.object({
  tweetText: z
    .string({
      required_error: 'tweet  is required',
    })
    .min(1, 'tweet is required'),
});

export type TwitterSchema = z.infer<typeof schema>;
const TweetsScreen: React.FC<TweetsScreenProps> = () => {
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const {control, handleSubmit} = useForm<TwitterSchema>({
    defaultValues: {
      tweetText: '',
    },
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    const tweetsRef = collection(fireStore, 'tweets');
    const unsubscribe = onSnapshot(tweetsRef, querySnapshot => {
      const tweetsData: Tweet[] = [];
      querySnapshot.forEach(doc => {
        tweetsData.push({id: doc.id, ...doc.data()});
      });
      setTweets(tweetsData);
    });

    return () => unsubscribe();
  }, [fireStore]);

  const handlePostTweet: SubmitHandler<TwitterSchema> = async data => {
    setIsLoading(true);
    const userId = await AsyncStorage.getItem('userId');

    if (data.tweetText.trim() !== '') {
      if (userId) {
        const newTweet = {
          text: data.tweetText,
          userId: userId,
          createdAt: new Date(),
          likes: 0,
          comments: [],
        };

        const tweetsCollectionRef = collection(fireStore, 'tweets');
        setIsLoading(false);

        addDoc(tweetsCollectionRef, newTweet)
          .then(docRef => {
            setIsLoading(false);
          })
          .catch(error => {})
          .finally(() => {
            setIsLoading(false);
          });
      } else {
      }
    }
  };

  const likeTweet = (tweetId: string) => {
    const tweetRef = doc(fireStore, 'tweets', tweetId);

    updateDoc(tweetRef, {
      likes: increment(1),
    })
      .then(() => {
      })
      .catch(error => {
      });
  };

  const commentTweet = async (tweetId: string, commentText: string) => {
    if (commentText.trim() !== '') {
      const userId = await AsyncStorage.getItem('userId');

      if (userId) {
        const newComment: Comment = {
          id: Date.now().toString(),
          text: commentText,
          userId: userId,
          createdAt: new Date(),
        };

        const tweetRef = doc(fireStore, 'tweets', tweetId);
        const tweetSnapshot = await getDoc(tweetRef);
        const currentComments = tweetSnapshot.data()?.comments || [];
        const updatedComments = [...currentComments, newComment];

        await updateDoc(tweetRef, {comments: updatedComments});
      } else {
      }
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Input
          control={control}
          name="tweetText"
          label="tweetText"
          placeholder={"What's on your mind?"}
        />
        <Button
          title={
            isLoading ? <ActivityIndicator color={colors.white} /> : 'tweet'
          }
          backgroundColor={'#0074D9'}
          textColor={'#fff'}
          onPress={handleSubmit(handlePostTweet)}
        />
      </View>

      <TweetItems
        tweet={tweets}
        likeTweet={likeTweet}
        commentTweet={commentTweet}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 20,
  },
  formContainer: {
    marginTop: 38,
    gap: 20,
  },
});

export default TweetsScreen;
