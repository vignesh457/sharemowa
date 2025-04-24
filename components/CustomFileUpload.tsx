import { View, Text, Button, StyleSheet, Alert, Platform, TouchableOpacity, Image } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { decode } from "base64-arraybuffer";
import * as FileSystem from "expo-file-system";
import React, { useState } from "react";
import { supabase } from "@/lib/supabase";
import { icons } from "@/constants";
import { useAppDispatch } from "@/redux/hook";
import { showAlert } from "@/redux/slice/alertSlice";

export default function CustomFileUpload({onUploadComplete}: {onUploadComplete: (url: string) => void}) {
  const [fileURL, setFileURL] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  const pickDocument = async () => {
    console.log("📂 Starting document picker...");

    try {
      const result = await DocumentPicker.getDocumentAsync({
        copyToCacheDirectory: true,
        type: "*/*",
      });

      console.log("📄 Document Picker Result:", result);

      if (result.canceled || !result.assets || !result.assets[0]) {
        console.log("🚫 Picker canceled or no file selected");
        return;
      }

      const file = result.assets[0];
      console.log("✅ Document selected:", file.name);

      const fileData = await FileSystem.readAsStringAsync(file.uri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const fileExt = file.name.split(".").pop();
      const filePath = `uploads/${Date.now()}.${fileExt}`;

      const { data, error } = await supabase.storage
        .from("documents") // 👈 your bucket name
        .upload(filePath, decode(fileData), {
          contentType: file.mimeType || "application/octet-stream",
          upsert: true,
        });

      if (error) {
        console.error("❌ Upload error:", error);
        dispatch(showAlert({ type: "error", message: error.message }));
      } else {
        const { data: publicURL } = supabase.storage
          .from("documents")
          .getPublicUrl(filePath);

        console.log("✅ File uploaded successfully:", publicURL.publicUrl);
        dispatch(showAlert({ type: "success", message: "File uploaded successfully" }));
        setFileURL(publicURL.publicUrl);
        onUploadComplete(publicURL.publicUrl);
      }
    } catch (err) {
      console.error("❌ Unexpected error:", err);
      dispatch(showAlert({ type: "error", message: "Something went wrong." }));
    }
  };

  return (
    <View className="flex flex-col justify-center items-center">
      <Text className='text-secondary-100 text-lg pl-1 font-medium w-4/5'>Upload Document</Text>
      <TouchableOpacity onPress={pickDocument} className="flex flex-row justify-evenly items-center p-1 mt-1 bg-secondary-300 w-4/5 h-[70px] rounded-[10px] mb-2 border-secondary-200 border-[1px]">
        <Image source={icons.upload} className="w-8 h-8" />
        <Text className="text-secondary-200 text-[16px] px-4 font-JakartaMedium">Select File to Upload</Text>
      </TouchableOpacity>
      {fileURL && (
        <View className="flex flex-row justify-between items-center px-4 mt-1 w-4/5 h-[40px] rounded-[10px] mb-7">
        <Image source={icons.document} className="w-6 h-6" />
        <Text className="text-secondary-200 text-[14px] px-2 font-JakartaLight">
            File Uploaded: {fileURL.split('/').pop()}
        </Text>
        </View>
        )}
    </View>
  );
}

