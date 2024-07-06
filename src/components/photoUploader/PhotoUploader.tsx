import React, { useEffect, useState } from "react";
import { View, Image, Alert, TouchableHighlight, ImageProps, ImageSourcePropType } from "react-native";
import {launchImageLibrary, launchCamera,ImageLibraryOptions, ImagePickerResponse} from "react-native-image-picker";
import { ColorConstants } from "../../constants/ThemeConstants";
import styles from "./style/photoUploaderStyle";
import PhotoUploaderProps from "./props/photoUploaderProps";
import PlusSVG from "../../../images/plus.svg"
import File from "../../models/File";
import Loading from "../../modules/Loading/Loading";


const PhotoUploader = (props : PhotoUploaderProps) => {
    const [selectedPhotos, setSelectedPhotos] = useState<File[]>(props.photos ?? []);
    const [photoViewerCount, setPhotoViewerCount] = useState<number>(!props.photos ? 1 : props.photos.length + 1);

    const maxPhotoCount = props.maxPhoto ?? 15;

    const options : ImageLibraryOptions = {
        mediaType: "photo",
        quality: 1,
        includeBase64: false,
        selectionLimit: 0
    };

    useEffect(() => {
        if (!selectedPhotos || selectedPhotos.length === 0) {
            setSelectedPhotos(props.photos ?? [])
            setPhotoViewerCount(!props.photos ? 1 : props.photos.length + 1)
        }
    }, [props.photos]);

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
        let files = selectedPhotos.splice(index, 1);
        setSelectedPhotos([...selectedPhotos]);
        setPhotoViewerCount(photoViewerCount - 1);
        props.OnDeletePhoto && props.OnDeletePhoto(files[0]);
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

        const files = response.assets.map((asset) => {
            return {
                uri: asset.uri,
                type: asset.type,
                name: asset.fileName
            } as File
        });

        if (index < selectedPhotos.length ){
            selectedPhotos[index] = files[0];
      
            setSelectedPhotos([...selectedPhotos]);
            if (props.OnAddPhoto)
                props.OnAddPhoto(files[0]);
        }else{
            setSelectedPhotos([...selectedPhotos, ...files]);
            if (props.OnAddPhoto)
                props.OnAddPhoto(files[0]);
        }
    }

    return (
        <View
            style={[styles.container, props.style]}>

            <View
                style={[styles.photoContainer, props.photoContainerStyle]}>
                {props.isLoading
                ?
                    <Loading />
                :

                new Array(photoViewerCount).fill(0).map((_, index) => {
                    let isNext = index == selectedPhotos.length
                    let selectedPhoto = selectedPhotos[index]

                    if (index >= maxPhotoCount)
                        return (<View key={index}></View>)

                    const source : ImageSourcePropType =
                        (selectedPhoto && selectedPhoto.uri.includes("://"))
                            ? { uri: selectedPhoto.uri }
                            : selectedPhoto?.uri as unknown as number

                    return (
                        <TouchableHighlight
                            onPress={() => !selectedPhoto
                                ? onAddPhotoPress(index)
                                : onSelectedPhotoPress(index)}
                            key={index}>
                            <>
                                {selectedPhoto ?
                                    <Image
                                        source={source}
                                        resizeMode="cover"
                                        style={[styles.photo, props.photoStyle]}/>
                                :
                                <View style={[styles.photo, props.photoStyle]}>
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