import React, { useRef, useState } from 'react';
import { View, StyleSheet, ScrollView, PanResponder, Text, NativeSyntheticEvent, NativeScrollEvent, TextInput } from 'react-native';
import { PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import { SharedValue, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import FoldHeader from "../../components/foldHeader/FoldHeader";
import MainText from "../../modules/text/MainText";
import styles from './style/addPostStyle';
import PhotoUploader from "../../modules/photoUploader/PhotoUploader"; 
import { ColorConstants } from '../../constants/ThemeConstants';

const AddPost = () => {
    const swipeProgress = useSharedValue<number>(0);

    const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        swipeProgress.value = event.nativeEvent.contentOffset.y
    }

    const onTitleInputTextChange = () => {

    }

    const onDescriptionInputTextChange = () => {

    }

    return (
        
        <ScrollView
            style={styles.mainContainer}
            onScroll={onScroll}>

            <View
                style={styles.header}>
                <MainText
                    weight={'700'}
                    fontSize={20}
                    text="Ajoute un article ou un cours"/>
            </View>

            <View style={styles.contentContainer}>
                <View style={[styles.photoUploaderContainer, styles.gap]}>
                    <PhotoUploader />
                </View>

                <View
                    style={[styles.informationsContainer, styles.gap]}>

                    <MainText
                        weight={'700'}
                        fontSize={18}
                        text="Informations"/>

                    <View
                        style={[styles.informations, styles.minorGap]}>
                        <View>
                            <MainText
                                weight={'700'}
                                fontSize={15}
                                text="Titre"/>
                            <TextInput
                                placeholder="Par exemple: livre de mathématiques"
                                placeholderTextColor={ColorConstants.white70PercentColor}
                                inputMode="text"
                                onChangeText={onTitleInputTextChange}
                                style={[styles.inputs, styles.minorGap]}/>
                        </View>

                        <View style={[styles.gap]}>
                            <MainText
                                weight={'700'}
                                fontSize={15}
                                text="Description"/>  
                            <TextInput
                                placeholder="Par exemple: Utilisé une année entière, comme neuf"
                                placeholderTextColor={ColorConstants.white70PercentColor}
                                inputMode="text"
                                multiline
                                numberOfLines={4}
                                onChangeText={onDescriptionInputTextChange}
                                style={[styles.inputs, styles.minorGap]}/>
                        </View>
                    </View>
                </View>
            </View>

            

        </ScrollView>
    );
}

export default AddPost;