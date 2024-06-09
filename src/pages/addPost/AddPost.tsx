import React from 'react';
import PostEdit from '../../components/postEdit/PostEdit';
import { View } from 'react-native';
import MainText from '../../modules/text/MainText';
import styles from './style/addPostStyle';

const AddPost = () => {
    return (
        <View style={styles.mainContainer}>
            <View
                style={styles.header}>
                <MainText
                    weight={'700'}
                    fontSize={20}
                    text="Ajoute un article ou un cours"/>
            </View>
            <PostEdit />
        </View>
    )
}
export default AddPost;