import { FlatList, Modal, ScrollView, TouchableHighlight, View } from "react-native";
import PostEditProps, { PostBookEditProps, PostBooksEditProps, PostSchedulesEditProps } from "./props/PostEditProps";
import styles from "./style/PostEditStyle";
import { useContext, useEffect, useState } from "react";
import { Tag as TagType } from "../../models/Tag";
import MainText from "../../modules/text/MainText";
import PhotoUploader from "../photoUploader/PhotoUploader";
import MainInput from "../mainInput/MainInput";
import { ColorConstants } from "../../constants/ThemeConstants";
import BookSVG from "../../../images/book.svg";
import CourseSVG from "../../../images/course.svg";
import Tags from "../tags/Tags";
import EPostType from "../../models/enums/EPostType";
import { useNavigation, useRoute } from "@react-navigation/native";
import SelectList from "../../modules/SelectList/SelectList";
import EPostStatus, { FromStringPostStatusToEnum, PostStatusToString } from "../../models/enums/EPostStatus";
import { getEnumValue } from "../../utils/utils";
import File from "../../models/File";
import MainButton from "../../modules/mainButton/MainButton";
import Book from "../../models/Book";
import ButtonWithIcon from "../../modules/buttonWithIcon/ButtonWithIcon";
import CloseSVG from "../../../images/close.svg";
import Schedule from "../../models/Schedule";
import dayjs from "dayjs";
import MainDatePicker from "../../modules/mainDatePicker/MainDatePicker";
import PostTypeSelector from "../postTypeSelector/PostTypeSelector";
import Context from "../../contexts/AuthContext/AuthContext";
import Warning from "../../modules/warning/Warning";
import useUserService from "../../hooks/useUserService";
import User from "../../models/User";

const PostEdit = (props: PostEditProps) => {
    const route = useRoute();
    const routeParams = route.params as PostEditProps;
    const post = props.post ?? routeParams?.post;

    const authContext = useContext(Context);
    const navigation = useNavigation<any>()
    
    const [postType, setPostType] = useState<EPostType>(post?.type ?? EPostType.COURSE);
    const [title, setTitle] = useState(post?.title ?? "");
    const [description, setDescription] = useState(post?.description ?? "");
    const photoFiles = post?.blobPaths?.map(p => { return {uri: p} as File}) ?? [];
    const [photos, setPhotos] = useState<File[]>(photoFiles);
    const [postStatus, setPostStatus] = useState<EPostStatus>(post?.status ?? EPostStatus.AVAILABLE);
    const [activeTags, setActiveTags] = useState<TagType[]>(post?.tags ?? []);
    const [books, setBooks] = useState<Book[]>(post?.books ?? []);
    const [schedules, setSchedules] = useState<Schedule[]>(post?.schedules ?? [{
        id: 0,
        startDate: dayjs().toDate(),
        endDate: dayjs().add(1, 'hour').toDate()
    }]);
    
    const [titleErrorMessage, setTitleErrorMessage] = useState<string|undefined>();
    const [descriptionErrorMessage, setDescriptionErrorMessage] = useState<string|undefined>();

    const status : string[] = Object.values(EPostStatus)
        .filter(value => value != EPostStatus.CREATED)
        .map(value => PostStatusToString(value))

    useEffect(() => {
       if(props.resetState) {
           resetStates()
       }
    }, [props.resetState])

    const onTitleInputTextChange = (value: string) => {
        setTitle(value);
    }

    const onDescriptionInputTextChange = (value: string) => {
        setDescription(value);
    }

    const onAddPhoto = (photo: File) => {
       setPhotos([...photos, photo]); 
    }

    const onCategoryButtonPress = (category?: EPostType) => {
        setPostType(category ?? EPostType.COURSE);
    }
    
    const onSelectStatus = (value: string) => {
        if (!post)
            return;
        
        setPostStatus(FromStringPostStatusToEnum(value))
    }

    const onAddButtonPress = () => {
        if (!validatePost())
            return;

        props.onAddButtonPress && props.onAddButtonPress({
            id: 0,
            title: title,
            description: description,
            price: 0,
            type: postType,
            tags: activeTags.map(t => t.id),
            books: postType === EPostType.BOOK ? books : undefined,
            schedules: postType === EPostType.COURSE ? schedules : undefined,
            shortDescription: ""
        },
        photos);
    }

    const onModifyButtonPress = () => {
        if (!validatePost())
            return;

        props.onModifyButtonPress && props.onModifyButtonPress({
            id: post!.id,
            title: title,
            description: description,
            price: 0,
            type: postType,
            tags: activeTags.map(t => t.id),
            books: postType === EPostType.BOOK ? books : undefined,
            schedules: postType === EPostType.COURSE ? schedules : undefined,
            shortDescription: "",
            status: postStatus
        },
        photos);
    }

    const validatePost = () => {
        setTitleErrorMessage(undefined)
        setDescriptionErrorMessage(undefined)

        let isValid = true;

        if (!title) {
            setTitleErrorMessage("Ce champ est requis");
            isValid = false
        }

        if (!description) {
            setDescriptionErrorMessage("Ce champ est requis");
            isValid = false
        }

        return isValid
    }

    const resetStates = () => {
        setPostType(EPostType.COURSE);
        setTitle("");
        setDescription("");
        setPostStatus(EPostStatus.AVAILABLE);
        setActiveTags([]);
        setBooks([]);
        setSchedules([{
            id: 0,
            startDate: dayjs().toDate(),
            endDate: dayjs().add(1, 'hour').toDate()
        }]);
        setPhotos([]);
    }

    const onAddBook = (book: Book) => {
        setBooks([...books, book])
    }

    const onModifyBook = (book: Book, index: number) => {
        setBooks([...books.slice(0, index), book, ...books.slice(index + 1)])
    }

    const onScheduleChange = (schedules: Schedule[]) => {
        setSchedules([...schedules])
    }

    const onAddIBANPress = () => {
        navigation.navigate("Profile")
    }

    return (
        
        <ScrollView
            style={styles.mainContainer}>

            <View style={styles.contentContainer}>
                {!props.disableEditStatus && <View style={[styles.informationsContainer, styles.gap]}>

                    <MainText style={styles.titles} weight="700" fontSize={18} text="Status"/>

                    <SelectList
                        data={status}
                        initialSelected={PostStatusToString(post?.status ?? postStatus)}
                        onSelect={onSelectStatus}
                        orientation="horizontal"
                        elementStyle={{backgroundColor: "rgba(0,0,0,0)"}}
                        ellipseColor={ColorConstants.white70PercentColor}
                        ellipseSelectedColor={ColorConstants.purpleMainColor}
                        style={[styles.informations, styles.minorGap]}/>

                </View>}
                <View style={[styles.informationsContainer, styles.gap]}>

                    <MainText
                        style={styles.titles}
                        weight={'700'}
                        fontSize={18}
                        text="Photos"/>

                    <PhotoUploader
                        style={[styles.minorGap, {width: "100%"}]}
                        photos={photos}
                        OnAddPhoto={onAddPhoto} />

                </View>

                <View
                    style={[styles.informationsContainer, styles.gap]}>

                    <MainText
                        style={styles.titles}
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
                            <MainInput
                                placeholder="Par exemple: livre de mathématiques"
                                placeholderColor={ColorConstants.white70PercentColor}
                                inputMode="text"
                                onChange={onTitleInputTextChange}
                                style={[styles.inputs, styles.minorGap]}
                                value={title}
                                isOnError={!!titleErrorMessage}
                                errorMessage={titleErrorMessage}/>
                        </View>

                        <View style={[styles.gap]}>
                            <MainText
                                weight={'700'}
                                fontSize={15}
                                text="Description"/>  
                            <MainInput
                                placeholder="Par exemple: Utilisé une année entière, comme neuf"
                                placeholderColor={ColorConstants.white70PercentColor}
                                inputMode="text"
                                multiline
                                numberOfLines={4}
                                onChange={onDescriptionInputTextChange}
                                style={[styles.inputs, styles.minorGap, styles.descriptionInput]}
                                value={description}
                                isOnError={!!descriptionErrorMessage}
                                errorMessage={descriptionErrorMessage}/>
                        </View>

                        <View style={[styles.gap]}>
                            
                            <MainText
                                weight={'700'}
                                fontSize={15}
                                text="Catégorie"/> 

                            <PostTypeSelector
                                postType={postType}
                                onChange={onCategoryButtonPress}/>
                        </View>

                    </View>
                </View>
                
                <View style={[styles.gap, styles.informationsContainer]}>
                    <MainText
                        style={styles.titles}
                        text="Tags"
                        fontSize={18}
                        weight="700"/>
                    <View style={[styles.informations, styles.minorGap]}>
                        <Tags
                            selectedTags={activeTags}
                            multipleSelect={true}
                            onChange={(tags) => setActiveTags(tags)}/>
                    </View>
                </View>

                {postType == EPostType.BOOK &&
                    <View style={[styles.gap, styles.informationsContainer]}>
                        <MainText
                            style={styles.titles}
                            text="Information du/des livre(s)"
                            fontSize={18}
                            weight="700"/>
                        <View style={[styles.informations, styles.minorGap]}>
                            <PostBooksEdit
                                books={books}
                                onAddBook={onAddBook}
                                onModifyBook={onModifyBook}/>
                        </View>
                    </View>
                }

                {postType == EPostType.COURSE &&
                    <View style={[styles.gap, styles.informationsContainer]}>
                        <MainText
                            style={styles.titles}
                            text="Horaires"
                            fontSize={18}
                            weight="700"/>
                        <View style={[styles.informations, styles.minorGap]}>
                            <PostSchedulesEdit
                                schedules={schedules}
                                onChange={onScheduleChange}/>
                        </View>
                    </View>
                }

                {postType == EPostType.BOOK &&
                    <View style={[styles.gap, styles.informationsContainer]}>
                        <MainText
                            text="Mon IBAN"
                            fontSize={16}
                            weight="bold"
                            style={styles.titles}/>
                        {authContext?.currentUser?.paymentInformation?.iban ? 
                            <>
                            <Warning
                                text="Les posts sont à donation libre."
                                type="normal"
                                style={{backgroundColor: ColorConstants.greyMainColor}}/>
                            <View style={[styles.informations, styles.minorGap]}>
                                <MainText
                                    text={authContext?.currentUser?.paymentInformation?.iban ?? ""}
                                    fontSize={14}/>
                            </View>
                            </>
                            :
                            <>
                            <TouchableHighlight
                                onPress={() => onAddIBANPress()}
                                underlayColor={ColorConstants.transparent}>
                                <Warning
                                    text="Les posts sont à donation libre. Appuyez ici pour ajouter votre IBAN."
                                    type="normal"
                                    style={{backgroundColor: ColorConstants.greyMainColor}}/>
                            </TouchableHighlight>

                            <View style={[styles.informations, styles.minorGap]}>
                                <MainText
                                    text={"Aucun IBAN n'est enregistré"}
                                    fontSize={14}/>
                            </View>
                            </>
                        }
                    </View>
                }

                <MainButton
                    style={[styles.gap, styles.addButton]}
                    text={post ? "Modifier" : "Ajouter"}
                    fontSize={15}
                    fontWeight="700"
                    onPress={post ? onModifyButtonPress : onAddButtonPress}
                    isLoading={props.isLoading}/>
            </View>

        </ScrollView>
    );
}

const PostBooksEdit = (props: PostBooksEditProps) => {
    const [showAddBookModal, setShowAddBookModal] = useState(false);
    const [pressedBookIndex, setPressedBookIndex] = useState<number>(-1);

    const onPressBook = (index: number) => {
        setPressedBookIndex(index)
        setShowAddBookModal(true)
    }

    const onPressAddNewBook = (book: Book) => {
        setPressedBookIndex(-1)
        setShowAddBookModal(false)
        props.onAddBook && props.onAddBook(book)
    }

    const onPressModifyBook = (book: Book) => {
        setPressedBookIndex(-1)
        setShowAddBookModal(false)
        props.onModifyBook && props.onModifyBook(book, pressedBookIndex)
    }

    return (
        <>
        <ScrollView
            horizontal
            contentContainerStyle={styles.booksMainContainer}
            showsHorizontalScrollIndicator={false}>
            
            <MainButton
                text="+"
                onPress={() => setShowAddBookModal(true)}
                style={styles.addBookButton} />

            {props.books?.map((b, i) => {
                return (
                    <MainButton
                        key={i}
                        text={b.title}
                        onPress={() => onPressBook(i)}
                        style={styles.bookButton}/>
                )
            })}

        </ScrollView>
        
        <Modal
            visible={showAddBookModal}
            animationType="slide"
            onRequestClose={() => setShowAddBookModal(false)}
            style={{display: 'flex', flex: 1}}>

            <ButtonWithIcon
                onPress={() => setShowAddBookModal(false)}
                containerStyle={styles.addBookModelCloseButton}
                style={{display: 'flex', flex: 1, margin: 10}}
                underlayColor={ColorConstants.blackMainColor}>
                    <CloseSVG color={ColorConstants.whiteMainColor} width={40} height={40} />
            </ButtonWithIcon>

            <PostBookEdit
                book={props.books && pressedBookIndex != -1 ? props.books[pressedBookIndex] : undefined}
                onAddBook={onPressAddNewBook}
                onModifyBook={onPressModifyBook}/>

        </Modal>
        </>
    )
}

const PostBookEdit = (props: PostBookEditProps) => {

    const [title, setTitle] = useState(props.book?.title ?? "");
    const [isbn, setIsbn] = useState(props.book?.isbn);
    const [publicationYear, setPublicationYear] = useState(props.book?.publicationDate);
    const [author, setAuthor] = useState(props.book?.author);
    const [editor, setEditor] = useState(props.book?.editor);

    const [titleErrorMessage, setTitleErrorMessage] = useState<string | undefined>(undefined);

    useEffect(() => {
        if (props.book){
            setTitle(props.book.title);
            setIsbn(props.book.isbn);
            setPublicationYear(props.book.publicationDate);
            setAuthor(props.book.author);
            setEditor(props.book.editor);
        }
    }, [props.book])

    const onPressAddBook = () => {
        setTitleErrorMessage(undefined)

        if (!title) {
            setTitleErrorMessage("Le titre est obligatoire")
            return;
        }

        if (props.onAddBook){
            props.onAddBook({
                title: title,
                isbn: isbn,
                publicationDate: publicationYear,
                author: author,
                editor: editor
            })
        }
    }

    const onPressModifyBook = () => {
        setTitleErrorMessage(undefined)

        if (!title) {
            setTitleErrorMessage("Le titre est obligatoire")
            return;
        }

        if (props.onModifyBook){
            props.onModifyBook({
                id: props.book?.id,
                title: title,
                isbn: isbn,
                publicationDate: publicationYear,
                author: author,
                editor: editor
            })
        }
    }

    return (
        <View style={styles.addBookModalContent}>
            <View style={{margin: 20}}>
                <View>
                    <MainText
                        weight={'700'}
                        fontSize={18}
                        text="Titre *"/>
                    <MainInput
                        placeholder="Le titre du livre"
                        placeholderColor={ColorConstants.white70PercentColor}
                        inputMode="text"
                        onChange={setTitle}
                        style={[styles.modalInputs, styles.minorGap]}
                        value={title}
                        errorMessage={titleErrorMessage}
                        isOnError={titleErrorMessage!==undefined}/>
                </View>

                <View style={styles.gap}>
                    <MainText
                        weight={'700'}
                        fontSize={18}
                        text="ISBN"/>
                    <MainInput
                        placeholder="Le numéro international normalisé du livre"
                        placeholderColor={ColorConstants.white70PercentColor}
                        inputMode="text"
                        onChange={setIsbn}
                        style={[styles.modalInputs, styles.minorGap]}
                        value={isbn}/>
                </View>
                
                <View style={styles.gap}>
                    <MainText
                        weight={'700'}
                        fontSize={18}
                        text="Année de publication"/>
                    <MainInput
                        placeholder="Ex: 2010"
                        placeholderColor={ColorConstants.white70PercentColor}
                        inputMode="numeric"
                        onChange={(value) => setPublicationYear(Number(value))}
                        style={[styles.modalInputs, styles.minorGap]}
                        value={publicationYear?.toString()}
                        maxLength={4}/>
                </View>
                
                <View style={styles.gap}>
                    <MainText
                        weight={'700'}
                        fontSize={18}
                        text="Auteur"/>
                    <MainInput
                        placeholder="Nom et prénom de l'auteur(e)"
                        placeholderColor={ColorConstants.white70PercentColor}
                        inputMode="text"
                        onChange={setAuthor}
                        style={[styles.modalInputs, styles.minorGap]}
                        value={author}/>
                </View>

                <View style={styles.gap}>
                    <MainText
                        weight={'700'}
                        fontSize={18}
                        text="Maison d'édition"/>
                    <MainInput
                        placeholder="Nom de la maison d'édition"
                        placeholderColor={ColorConstants.white70PercentColor}
                        inputMode="text"
                        onChange={setEditor}
                        style={[styles.modalInputs, styles.minorGap]}
                        value={editor}/>
                </View>

                <View style={{marginTop: 50}}>
                    <MainButton
                        text={props.book ? "Modifier" : "Ajouter"}
                        onPress={props.book ? onPressModifyBook : onPressAddBook}
                        style={styles.addButton}/>
                </View>
            </View>
        </View>
    )
}

const PostSchedulesEdit = (props: PostSchedulesEditProps) => {
    const [schedules, setSchedules] = useState<Schedule[]>(props.schedules);
    const [showScheduleModal, setShowScheduleModal] = useState(false);
    const [datePickerMode, setDatePickerMode] = useState<'date' | 'time'>('date');
    const [scheduleIndex, setScheduleIndex] = useState(0);
    const [selectedTime, setSelectedTime] = useState<'start' | 'end'>('start');

    useEffect(() => {
        props.onChange && props.onChange(schedules)
    }, [schedules])

    const onPressAddSchedule = () => {
        setSchedules([...schedules, {
            id: 0,
            startDate: dayjs(schedules[schedules.length - 1].startDate).add(1, 'day').toDate(),
            endDate: dayjs(schedules[schedules.length - 1].endDate).add(1, 'day').toDate()
        }])
    }

    const showDatePicker = (index: number) => {
        setDatePickerMode('date')
        setShowScheduleModal(true)
        setScheduleIndex(index)
    }
    
    const showTimePicker = (index: number, selectedTime: 'start' | 'end') => {
        setDatePickerMode('time')
        setShowScheduleModal(true)
        setScheduleIndex(index)
        setSelectedTime(selectedTime)
    }

    const onDateChange = (date: dayjs.Dayjs) => {
        let schedule = schedules[scheduleIndex]

        let startDateClone = dayjs(schedule.startDate)
        let endDateClone = dayjs(schedule.endDate)

        if (datePickerMode === 'date'){
            startDateClone = startDateClone
                .set('year', date.year())
                .set('month', date.month())
                .set('date', date.date())
            endDateClone = endDateClone
                .set('year', date.year())
                .set('month', date.month())
                .set('date', date.date())
        }else {
            if (selectedTime === 'start'){
                startDateClone = startDateClone
                    .set('hour', date.hour())
                    .set('minute', date.minute())
                    .set('second', date.second())
            }else if (selectedTime === 'end'){
                endDateClone = endDateClone
                    .set('hour', date.hour())
                    .set('minute', date.minute())
                    .set('second', date.second())
            }
        }

        let newSchedule = {
            id: schedule.id,
            startDate: startDateClone.toDate(),
            endDate: endDateClone.toDate()
        }

        changeScheduleIfInvalid(newSchedule)

        setSchedules([...schedules.map((s, i) => i === scheduleIndex ? newSchedule : s)])
    }

    const changeScheduleIfInvalid =  (schedule: Schedule) => {
        if (schedule.startDate > schedule.endDate){
            if (selectedTime === 'start')
                schedule.endDate = dayjs(schedule.startDate).add(1, 'hour').toDate();
            else if (selectedTime === 'end')
                schedule.startDate = dayjs(schedule.endDate).subtract(1, 'hour').toDate();
        }
    }

    const onDeleteSchedule = (index: number) => {
        if (schedules.length === 1){
            return;
        }
        setSchedules([...schedules.filter((s, i) => i !== index)])
        if (index === scheduleIndex){
            setScheduleIndex(0)
        }
    }

    const getCurrentDateAndTime = () => {
        if (datePickerMode === 'date'){
            return dayjs(schedules[scheduleIndex].startDate);
        }

        if (selectedTime === 'start'){
            return dayjs(schedules[scheduleIndex].startDate);
        }else if (selectedTime === 'end'){
            return dayjs(schedules[scheduleIndex].endDate);
        }
    }

    const sortSchedules = (scheduleA: Schedule, scheduleB: Schedule) => {
        return dayjs(scheduleA.startDate).isBefore(dayjs(scheduleB.startDate)) ? -1 : 1
    }
    
    return (
        <View style={styles.scheduleMainContainer}>
            <View style={styles.scheduleContainer}>
                {schedules && schedules.sort(sortSchedules).map((schedule, index) => (
                    <View key={index} style={styles.schedule}>

                        <TouchableHighlight
                            style={styles.scheduleDate}
                            onPress={() => showDatePicker(index)}
                            underlayColor={ColorConstants.transparent}>
                            <MainText
                                text={dayjs(schedule.startDate).format("DD MMMM")}
                                fontSize={16}/>
                        </TouchableHighlight>

                        <View style={styles.scheduleTime}>
                            <TouchableHighlight
                                onPress={() => showTimePicker(index, 'start')}
                                underlayColor={ColorConstants.transparent}>
                                <MainText
                                    text={dayjs(schedule.startDate).format("HH:mm")}
                                    fontSize={14}
                                    fontColor={ColorConstants.white70PercentColor}/>
                            </TouchableHighlight>
                            <MainText
                                    text={'-'}
                                    fontSize={14}
                                    fontColor={ColorConstants.white70PercentColor}/>
                            <TouchableHighlight
                                onPress={() => showTimePicker(index, 'end')}
                                underlayColor={ColorConstants.transparent}>
                                <MainText
                                    text={dayjs(schedule.endDate).format("HH:mm")}
                                    fontSize={14}
                                    fontColor={ColorConstants.white70PercentColor}/>
                            </TouchableHighlight>
                        </View>

                        {schedules.length > 1 &&
                        <TouchableHighlight
                            onPress={() => onDeleteSchedule(index)}
                            underlayColor={ColorConstants.transparent}>
                            <CloseSVG
                                color={ColorConstants.whiteMainColor}
                                width={20}
                                height={20}/>
                        </TouchableHighlight>}

                    </View>
                ))}


            </View>

            <MainButton
                text="+"
                onPress={onPressAddSchedule}
                style={{backgroundColor: ColorConstants.purpleMainColor, width: 50}} />

            <MainDatePicker
                visible={showScheduleModal}
                onChange={onDateChange}
                iosContainerStyle={styles.addBookModalContent}
                iosModalContainerStyle={{margin: 20}}
                onClose={() => setShowScheduleModal(false)}
                mode={datePickerMode}
                date={getCurrentDateAndTime()}
                minimumDate={dayjs()}/>
        </View>
    )
}

export default PostEdit;