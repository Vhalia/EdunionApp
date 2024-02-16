import React, { useState } from "react";
import { View, Image, Button, GestureResponderEvent, Alert, StyleSheet, ImageBackground, TouchableHighlight } from "react-native";
import {launchImageLibrary, launchCamera,ImageLibraryOptions, CameraOptions, ImagePickerResponse} from "react-native-image-picker";
import { ColorConstants } from "../../constants/ThemeConstants";
import styles from "./style/photoUploaderStyle";
import PhotoUploaderProps from "./props/photoUploaderProps";
import Plus from "../../../images/plus.svg"
import Etc from "../../../images/etc.svg"

const PhotoUploader = (props : PhotoUploaderProps) => {
    const [selectedPhotos, setSelectedPhotos] = useState<string[]>([]);
    const [photoViewerCount, setPhotoViewerCount] = useState<number>(8);

    const options : ImageLibraryOptions = {
        mediaType: "photo",
        quality: 1,
        includeBase64: true,
        selectionLimit: 0
    };

    const onAddPhotoPress = (index: number) => {
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
                    onPress: () => choosePhoto(index)
                },
                {
                    text: 'Prendre une photo',
                    onPress: () => takePhoto(index)
                }
            ]
        );
        
    };

    const onDeletePhotoPress = (index: number) => {
        selectedPhotos.splice(index, 1);
        setSelectedPhotos([...selectedPhotos]);
    }

    const onLongPhotoPress = (index: number) => {
        Alert.alert(
            "Voulez-vous supprimer cette photo ?",
            undefined,
            [
                {
                    text: 'Non',
                    style: 'cancel'
                },
                {
                    text: 'Oui',
                    onPress: () => onDeletePhotoPress(index)
                },
            ]
        );
    }

    const onMorePhotoToAddPress = () => {
        setPhotoViewerCount(photoViewerCount + 4);
    }


    const takePhoto = (index: number) => {
        launchCamera(options, (response) => {
            if (!response.assets)
                return;

            addSelectedPhotos(response, index);
        });
    }
    
    const choosePhoto = (index: number) => {
        launchImageLibrary(options, (response) => {
            if (!response.assets)
                return;
            
            addSelectedPhotos(response, index);
        });
    }

    const addSelectedPhotos = (response: ImagePickerResponse, index : number) => {
        if (!response.assets)
            return;

        const base64OfImages = response.assets.map((asset) => asset.base64) as string[]; 
        const tempUri = response.assets.map((asset) => asset.uri) as string[]; 

        if (index < selectedPhotos.length ){
            selectedPhotos[index] = tempUri[0];
      
            setSelectedPhotos([...selectedPhotos]);
        }else{
            setSelectedPhotos([...selectedPhotos, ...tempUri]);
        }
    }

    return (
        <View>
            <View
                style={[styles.container, props.style]}>
                {new Array(photoViewerCount).fill(0).map((_, index) => {
                    let isNext = index == selectedPhotos.length
                    let selectedPhoto = selectedPhotos[index]

                    if (index == photoViewerCount - 1)
                    {
                        return (
                            <TouchableHighlight
                                style={styles.etcContainer}
                                onPress={onMorePhotoToAddPress}
                                key={index}>
                                <Etc color={ColorConstants.whiteMainColor} opacity={0.5}/>
                            </TouchableHighlight>
                        );
                    }
                    return (
                        <TouchableHighlight
                            onPress={() => onAddPhotoPress(index)}
                            onLongPress={() => onLongPhotoPress(index)}
                            key={index}
                            style={{}}>
                            <>
                                {selectedPhoto ?
                                    <Image
                                        source={{ uri: selectedPhoto }}
                                        resizeMode="cover"
                                        style={styles.photo}/>
                                :
                                <View style={styles.photo}>
                                    {isNext ?
                                        <Plus color={ColorConstants.whiteMainColor}/>
                                        : ""}
                                </View>}
                                
                            </>
                            
                        </TouchableHighlight>
                    );
                })}
            </View>
        </View>
    );
};

export default PhotoUploader;