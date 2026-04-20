import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Button,
} from "react-native";
import { useState, useCallback } from "react";
import { useRouter } from "expo-router";
import { useFocusEffect } from "expo-router";
import { getPosts } from "../services/api";
import { getLocalPosts } from "./store";

export default function Index() {
  const [posts, setPosts] = useState<any[]>([]);  const router = useRouter();

  const fetchPosts = async () => {
    const data = await getPosts();
    setPosts([...getLocalPosts(), ...data]);
  };

  useFocusEffect(
    useCallback(() => {
      fetchPosts();
    }, [])
  );

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Button
        title="Add New Post"
        onPress={() => router.push("/addPost")}
      />

      <FlatList
        data={posts}
        keyExtractor={(item: any) => item.id.toString()}
        renderItem={({ item }: any) => (
          <TouchableOpacity
            onPress={() =>
              router.push(`/postDetail?id=${item.id}`)
            }
          >
            <View
              style={{
                borderWidth: 1,
                padding: 10,
                marginVertical: 5,
              }}
            >
              <Text>Post Number: {item.id}</Text>
              <Text>Title: {item.title}</Text>
              <Text>Body: {item.body}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}