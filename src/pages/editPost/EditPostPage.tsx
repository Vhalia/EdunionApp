import PostEdit from "../../components/postEdit/PostEdit"
import usePostService from "../../hooks/usePostService"
import { useNavigation, useRoute } from "@react-navigation/native";
import Post from "../../models/Post";
import AddEditPostDto from "../../models/DTO/AddEditPostDto";
import File, { addMissingFileInformations } from "../../models/File";
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

            await updatePhotos(modifiedPost.id, photos)
            
            setIsLoading(false)
            setResetState(true)

            navigation.goBack()
        }catch(err) {
            console.log(err);
            setIsLoading(false)
        }
    }

    const updatePhotos = async (modifiedPostId: number, photos: File[]) => {
        let photosToDelete = post?.blobPaths?.filter(bp => !photos.map(x => x.uri).includes(bp))
        let photosToUpload = photos.filter(p => p.name && p.type && p.uri && !post?.blobPaths?.includes(p.uri))

        if (photosToUpload && photosToUpload.length > 0)
            await postService.addPhotos(modifiedPostId, photosToUpload);
        if (photosToDelete && photosToDelete.length > 0)
            await postService.deletePhotos(modifiedPostId, photosToDelete);
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