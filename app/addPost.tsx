import {
  View,
  TextInput,
  Button,
  Alert,
} from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { postData } from "../services/api";
import { addLocalPost } from "./store";

export default function AddPost() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const router = useRouter();

  const handleSubmit = async () => {
    const data = {
      title,
      body,
      userId: 1,
    };

    const response = await postData(data);

    addLocalPost({
      ...response,
      id: Date.now(),
    });

    Alert.alert("Success", "Post created!");
    router.back();
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        style={{
          borderWidth: 1,
          marginBottom: 10,
          padding: 10,
        }}
      />

      <TextInput
        placeholder="Body"
        value={body}
        onChangeText={setBody}
        style={{
          borderWidth: 1,
          marginBottom: 10,
          padding: 10,
        }}
      />

      <Button title="Submit" onPress={handleSubmit} />
      <Button
        title="Cancel"
        onPress={() => router.back()}
      />
    </View>
  );
}