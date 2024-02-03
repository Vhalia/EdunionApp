import React, { useState } from "react";
import { View, Image, Button, GestureResponderEvent, Alert } from "react-native";
import {launchImageLibrary, launchCamera,ImageLibraryOptions, CameraOptions} from "react-native-image-picker";

const PhotoUploader = () => {
    const [selectedPhotos, setSelectedPhotos] = useState<string[]>([]);

    const options : ImageLibraryOptions = {
        mediaType: "photo",
        quality: 1,
        includeBase64: true,
        selectionLimit: 0
    };

    const cameraOptions : CameraOptions = {
        mediaType: "photo",
        quality: 1,
        includeBase64: true,
    };

    const handlePhotoUpload = (event: GestureResponderEvent) => {
        Alert.alert(
            "Selectionnez une option pour ajouter une photo",
            undefined,
            [
                {
                    text: 'Annuler',
                    style: 'cancel'
                },
                {
                    text: 'Sélectionner une photo',
                    onPress: () => choosePhoto()
                },
                {
                    text: 'Prendre une photo',
                    onPress: () => takePhoto()
                }
            ]
        );
        
    };

    const takePhoto = () => {
        launchCamera(options, (response) => {
            if (!response.assets)
                return;

            const base64OfImages = response.assets.map((asset) => asset.base64) as string[]; 
            const tempUri = response.assets.map((asset) => asset.uri) as string[]; 
            setSelectedPhotos([...selectedPhotos, ...tempUri]);
        });
    }
    
    const choosePhoto = () => {
        launchImageLibrary(options, (response) => {
            if (!response.assets)
                return;

            const base64OfImages = response.assets.map((asset) => asset.base64) as string[]; 
            const tempUri = response.assets.map((asset) => asset.uri) as string[]; 
            setSelectedPhotos([...selectedPhotos, ...tempUri]);
        });
    }

    return (
        <View>
            {selectedPhotos.map((photo, index) => (
                <Image
                    key={index}
                    source={{ uri: photo }}
                    style={{ width: 100, height: 100 }} />
            ))}
            <Button title="Upload Photo" onPress={handlePhotoUpload} />
        </View>
    );
};

export default PhotoUploader;