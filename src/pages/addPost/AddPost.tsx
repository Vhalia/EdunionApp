import React, { useState } from 'react';
import PostEdit from '../../components/postEdit/PostEdit';
import { View } from 'react-native';
import MainText from '../../modules/text/MainText';
import styles from './style/addPostStyle';
import usePostService from '../../hooks/usePostService';
import AddEditPostDto from '../../models/DTO/AddEditPostDto';
import File from '../../models/File';
import { useNavigation } from '@react-navigation/native';

const AddPost = () => {
    const postService = usePostService();
    const [isLoading, setIsLoading] = useState(false);
    const [resetState, setResetState] = useState(false);

    const navigation = useNavigation<any>();

    const onSubmit = async (newPost: AddEditPostDto, photos: File[]) => {
        setIsLoading(true)
        setResetState(false)
        try {
            const id = await postService.post(newPost);
            if (photos && photos.length > 0) {
                await postService.addPhotos(id, photos)
            }
            setIsLoading(false)
            setResetState(true)
            navigation.navigate("Post", {postId: id, previousScreenName: "AddPost"})
        }catch(err) {
            console.log(err);
            setIsLoading(false)
        }
    }

    return (
        <View style={styles.mainContainer}>
            <View
                style={styles.header}>
                <MainText
                    weight={'700'}
                    fontSize={20}
                    text="Ajoute un article ou un cours"/>
            </View>
            <PostEdit
                disableEditStatus={true}
                onAddButtonPress={onSubmit}
                isLoading={isLoading}
                resetState={resetState}/>
        </View>
    )
}
export default AddPost;