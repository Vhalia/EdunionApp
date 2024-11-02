import React, { useContext, useEffect, useState } from 'react';
import PostEdit from '../../components/postEdit/PostEdit';
import { View } from 'react-native';
import MainText from '../../modules/text/MainText';
import styles from './style/addPostStyle';
import usePostService from '../../hooks/usePostService';
import AddEditPostDto from '../../models/DTO/AddEditPostDto';
import File from '../../models/File';
import { useNavigation } from '@react-navigation/native';
import Context from '../../contexts/AuthContext/AuthContext';
import EUserState from '../../models/enums/EUserState';
import Toast from 'react-native-toast-message';
import { SafeAreaView } from 'react-native-safe-area-context';

const AddPost = () => {
    const postService = usePostService();
    const [isLoading, setIsLoading] = useState(false);
    const [resetState, setResetState] = useState(false);

    const navigation = useNavigation<any>();
    const authContext = useContext(Context)

    useEffect(() => {
        if (authContext?.currentUser?.state !== EUserState.ACTIVE){
            Toast.show({
                type: 'info',
                text1: 'Votre école n\'a pas été verifiée',
                text2: 'Votre école doit d\'abord être vérifiée avant de pouvoir créer un post'
            })
            return;
        }
    }, [])

    const onSubmit = async (newPost: AddEditPostDto, photos: File[]) => {
        if (authContext?.currentUser?.state !== EUserState.ACTIVE){
            Toast.show({
                type: 'error',
                text1: 'Votre école n\'a pas été verifiée',
                text2: 'Votre école doit d\'abord être vérifiée avant de pouvoir créer un post'
            })
            return;
        }

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
        <SafeAreaView style={{flex: 1}}>
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
        </SafeAreaView>
    )
}
export default AddPost;