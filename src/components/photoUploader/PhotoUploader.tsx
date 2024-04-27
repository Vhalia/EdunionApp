import React, { useState } from "react";
import { View, Image, Alert, TouchableHighlight } from "react-native";
import {launchImageLibrary, launchCamera,ImageLibraryOptions, ImagePickerResponse} from "react-native-image-picker";
import { ColorConstants } from "../../constants/ThemeConstants";
import styles from "./style/photoUploaderStyle";
import PhotoUploaderProps from "./props/photoUploaderProps";
import PlusSVG from "../../../images/plus.svg"


const PhotoUploader = (props : PhotoUploaderProps) => {
    const [selectedPhotos, setSelectedPhotos] = useState<string[]>([]);
    const [photoViewerCount, setPhotoViewerCount] = useState<number>(1);

    const options : ImageLibraryOptions = {
        mediaType: "photo",
        quality: 1,
        includeBase64: true,
        selectionLimit: 0
    };

    const onAddPhotoPress = (index: number) => {
        addPhoto(index, () => setPhotoViewerCount(photoViewerCount + 1));
    };

    const addPhoto = (index: number, callback? : () => void) => {
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
                    onPress: () => choosePhoto(index, callback)
                },
                {
                    text: 'Prendre une photo',
                    onPress: () => takePhoto(index, callback)
                }
            ]
        );
    };

    const onSelectedPhotoPress = (index: number) => {
        Alert.alert(
            "Voulez-vous supprimer ou modifier cette photo ?",
            undefined,
            [
                {
                    text: 'Annuler',
                    style: 'cancel'
                },
                {
                    text: 'Modifier',
                    onPress: () => addPhoto(index)
                },
                {
                    text: 'Supprimer',
                    onPress: () => deletePhoto(index)
                }
            ]
        );
    }

    const deletePhoto = (index: number) => {
        selectedPhotos.splice(index, 1);
        setSelectedPhotos([...selectedPhotos]);
        setPhotoViewerCount(photoViewerCount - 1);
    }

    const takePhoto = (index: number, callback? : () => void) => {
        launchCamera(options, (response) => {
            if (!response.assets)
                return;

            addSelectedPhotos(response, index);
            if(callback)
                callback();
        });
    }
    
    const choosePhoto = (index: number, callback? : () => void) => {
        launchImageLibrary(options, (response) => {
            if (!response.assets)
                return;
            
            addSelectedPhotos(response, index);
            if(callback)
                callback();
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
        <View
            style={[styles.container, props.style]}>

            <View
                style={[styles.photoContainer]}>

                {new Array(photoViewerCount).fill(0).map((_, index) => {
                    let isNext = index == selectedPhotos.length
                    let selectedPhoto = selectedPhotos[index]

                    return (
                        <TouchableHighlight
                            onPress={() => !selectedPhoto
                                ? onAddPhotoPress(index)
                                : onSelectedPhotoPress(index)}
                            key={index}>
                            <>
                                {selectedPhoto ?
                                    <Image
                                        source={{ uri: selectedPhoto }}
                                        resizeMode="cover"
                                        style={styles.photo}/>
                                :
                                <View style={styles.photo}>
                                    {isNext ?
                                        <PlusSVG color={ColorConstants.whiteMainColor}/>
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