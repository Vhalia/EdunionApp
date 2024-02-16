import React, { Component, useEffect, useRef, useState } from 'react';
import { View, StyleSheet, ScrollView, PanResponder, Text, NativeSyntheticEvent, NativeScrollEvent, TextInput, TouchableHighlight } from 'react-native';
import { PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import { SharedValue, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import FoldHeader from "../../components/foldHeader/FoldHeader";
import MainText from "../../modules/text/MainText";
import styles from './style/addPostStyle';
import PhotoUploader from "../../components/photoUploader/PhotoUploader"; 
import { ColorConstants } from '../../constants/ThemeConstants';
import HorizontalLine from "../../modules/horizontalLine/HorizontalLine";
import Book from "../../../images/book.svg";
import Course from "../../../images/course.svg";
import Tag from "../../components/tag/Tag";
import { Tag as TagType } from "../../models/Tag";
import { TagsProps } from './props/addPostProps';

enum Category {
    BOOK,
    COURSE
}


const AddPost = () => {
    const swipeProgress = useSharedValue<number>(0);
    const [categoryButtonSelected, setCategoryButtonSelected] = useState<Category>(Category.BOOK);

    const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        swipeProgress.value = event.nativeEvent.contentOffset.y
    }

    const onTitleInputTextChange = () => {

    }

    const onDescriptionInputTextChange = () => {

    }

    const onCategoryButtonPress = (category: Category) => {
        setCategoryButtonSelected(category);
    }

    const onAddButtonPress = () => {
    }

    const applyCategoryButtonStyle = (category: Category) => {
        if (categoryButtonSelected === category) {
            return styles.activeCategoryButton;
        }
        return styles.inactiveCategoryButton;
    }

    const getTags = () : TagType[] => {
        return [
            {
                name: "Mathématiques",
                category: {
                    name: "Cours"
                }
            },
            {
                name: "Physique",
                category: {
                    name: "Cours"
                }
            },
            {
                name: "Chimie",
                category: {
                    name: "Cours"
                }
            },
            {
                name: "Informatique",
                category: {
                    name: "Cours"
                }
            },
            {
                name: "Histoire",
                category: {
                    name: "Cours"
                }
            },
            {
                name: "Géographie",
                category: {
                    name: "Cours"
                }
            },
            {
                name: "Anglais",
                category: {
                    name: "Cours"
                }
            },
            {
                name: "Néerlandais",
                category: {
                    name: "Cours"
                }
            },
            {
                name: "Mauvais",
                category: {
                    name: "État"
                }
            },
            {
                name: "Neuf",
                category: {
                    name: "État"
                }
            },
            {
                name: "ok tier",
                category: {
                    name: "État"
                }
            },
            {
                name: "Français",
                category: {
                    name: "Langue"
                }
            },
            {
                name: "Néerlandais",
                category: {
                    name: "Langue"
                }
            },
            {
                name: "Anglais",
                category: {
                    name: "Langue"
                }
            },
        ]
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
                <View style={[styles.informationsContainer, styles.gap]}>

                    <MainText
                        weight={'700'}
                        fontSize={18}
                        text="Photos"/>

                    <PhotoUploader style={styles.minorGap} />

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
                                style={[styles.inputs, styles.minorGap, styles.descriptionInput]}/>
                        </View>

                        <View style={[styles.gap]}>
                            
                            <MainText
                                weight={'700'}
                                fontSize={15}
                                text="Catégorie"/> 

                            <View style={[styles.categoryButtonsContainer, styles.minorGap]}>
                                
                                <TouchableHighlight
                                    onPress={() => onCategoryButtonPress(Category.BOOK)}>
                                    <View
                                        style={[styles.categoryButton, applyCategoryButtonStyle(Category.BOOK)]}>
                                        <Book color={applyCategoryButtonStyle(Category.BOOK).color} />
                                        <MainText
                                            weight={'700'}
                                            fontSize={12}
                                            text="Livre"
                                            style={[styles.categoyButtonText, applyCategoryButtonStyle(Category.BOOK)]}/> 
                                    </View>
                                </TouchableHighlight>
                                <TouchableHighlight
                                    onPress={() => onCategoryButtonPress(Category.COURSE)}>
                                    <View
                                        style={[styles.categoryButton, applyCategoryButtonStyle(Category.COURSE)]}>
                                        <Course color={applyCategoryButtonStyle(Category.COURSE).color} />
                                        <MainText
                                            weight={'700'}
                                            fontSize={12}
                                            text="Cours"
                                            style={[styles.categoyButtonText, applyCategoryButtonStyle(Category.COURSE)]}/> 
                                    </View>
                                </TouchableHighlight>

                            </View>
                        </View>

                        <View style={[styles.gap]}>
                            <MainText
                                weight={'700'}
                                fontSize={15}
                                text="Tags"/> 
                            <Tags tags={getTags()}/>
                        </View>
                    </View>
                </View>

                <TouchableHighlight
                    style={styles.gap}
                    onPress={onAddButtonPress}>

                    <View
                        style={[styles.addButton]}>
                        <MainText
                            weight={'700'}
                            fontSize={15}
                            text="Ajouter"/>
                    </View>

                </TouchableHighlight>
            </View>

            

        </ScrollView>
    );
}

const Tags = (props : TagsProps) => {
    const [activeTags, setActiveTags] = useState<TagType[]>([]);
    const [tags, setTags] = useState<TagType[]>(props.tags);
    const [tagsByCategory, setTagsByCategory] = useState<Map<string, TagType[]>>(
        new Map<string, TagType[]>());

    useEffect(() => {
        setTagsByCategory(orderTagsByCategory())
    }, [tags])

    const orderTagsByCategory = () : Map<string, TagType[]> => {
        const tagsByCategory = new Map<string, TagType[]>();

        props.tags.forEach(tag => {
            if (tagsByCategory.has(tag.category.name)) {
                tagsByCategory.get(tag.category.name)?.push(tag);
            } else {
                tagsByCategory.set(tag.category.name, [tag]);
            }
        });

        return tagsByCategory;
    }

    const onPressTag = (tag : TagType) => {
        if (activeTags.includes(tag)) {
            setActiveTags(activeTags.filter(activeTag => activeTag !== tag));
        }else {
            setActiveTags([...activeTags, tag]);
        }
        
    }

    const displayTags = (categoy: string, tags: TagType[], index: number) : React.JSX.Element => {
        return (
            <View
                key={index}
                style={[styles.tagCategoryContainer, styles.minorGap]}>
                <MainText
                    weight={'500'}
                    fontSize={15}
                    text={categoy}/>

                <View style={[styles.tagsContainer, styles.minorGap]}>
                    {tags.map((tag, index) => {
                        return (
                            <Tag
                                key={index}
                                tag={tag.name}
                                active={activeTags.includes(tag)}
                                onPress={() => onPressTag(tag)}/>
                        )
                    
                    })
                    }
                </View>
            </View>
        )
    }

    return(
        <View style={[styles.tagsContainer, styles.minorGap]}>
            {
                Array.from(tagsByCategory!.keys()).map((category, index) => {
                    return displayTags(category, tagsByCategory!.get(category) as TagType[], index);
                })
            }
        </View>
    );
}

export default AddPost;