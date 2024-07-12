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

    const navigation = useNavigation<any>();

    const onSubmit = async (newPost: AddEditPostDto, photos: File[]) => {
        console.log("SUBMIT", newPost);
        setIsLoading(true)
        try {
            const id = await postService.post(newPost);
            await postService.addPhotos(id, photos)
            setIsLoading(false)

            navigation.navigate("Post", {postId: id})
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
                isLoading={isLoading}/>
        </View>
    )
}
export default AddPost;