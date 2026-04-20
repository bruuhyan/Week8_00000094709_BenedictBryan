import {
  View,
  Text,
  FlatList,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  getPostDetail,
  getUser,
  getComments,
} from "../services/api";

export default function PostDetail() {
  const { id } = useLocalSearchParams();

  const [post, setPost] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const postData = await getPostDetail(Number(id));
    setPost(postData);

    const userData = await getUser(postData.userId);
    setUser(userData);

    const commentData = await getComments(Number(id));
    setComments(commentData);
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20 }}>
        {post?.title}
      </Text>

      <Text>{post?.body}</Text>

      <Text style={{ marginTop: 10 }}>
        Author: {user?.name}
      </Text>

      <Text style={{ marginTop: 20 }}>
        Comments:
      </Text>

      <FlatList
        data={comments}
        keyExtractor={(item: any) => item.id.toString()}
        renderItem={({ item }: any) => (
          <View style={{ marginVertical: 10 }}>
            <Text>{item.name}</Text>
            <Text>{item.body}</Text>
          </View>
        )}
      />
    </View>
  );
}