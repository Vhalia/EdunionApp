import PostEdit from "../../components/postEdit/PostEdit"
import usePostService from "../../hooks/usePostService"
import { useNavigation, useRoute } from "@react-navigation/native";
import Post from "../../models/Post";
import AddEditPostDto from "../../models/DTO/AddEditPostDto";
import File from "../../models/File";
import { useState } from "react";

const EditPostPage = (props: EditPostPageProps) => {
    const route = useRoute();
    const routeParams = route.params as EditPostPageProps;
    const post = props.post ?? routeParams?.post;
    
    const postService = usePostService();
    const [isLoading, setIsLoading] = useState(false);
    const [resetState, setResetState] = useState(false);

    const navigation = useNavigation<any>();

    const onSubmit = async (modifiedPost: AddEditPostDto, photos: File[]) => {
        setIsLoading(true)
        setResetState(false)
        try {
            await postService.put(modifiedPost);
            if (photos && photos.length > 0) {
                await postService.updatePhotos(modifiedPost.id, photos)
            }
            setIsLoading(false)
            setResetState(true)

            navigation.goBack()
        }catch(err) {
            console.log(err);
            setIsLoading(false)
        }
    }
    
    return (
        <PostEdit
            onModifyButtonPress={onSubmit}
            post={post}
            resetState={resetState}
            isLoading={isLoading}/>
    )
}

interface EditPostPageProps {
    post?: Post
}

export type {EditPostPageProps}

export default EditPostPage