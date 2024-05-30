import { StyleProp, ViewStyle } from "react-native";

export default interface CarouselProps {
    data : any[],
    renderItem : (item: any, index: number) => React.ReactElement,
    paginationPosition : "bottom-outside" | "bottom",
    loop? : boolean,
    style? : StyleProp<ViewStyle>
    displayNavigationArrows? : boolean
    navigationArrowVerticalPosition? : "center" | "bottom",
    navigationArrowHorizontalPosition? : "inside" | "outside",
    navigationArrowSize? : number,
    backgroundColor? : string,
    paginationVerticalPosition?: "inside" | "outside",
    // zoom? : number,
    // spacing? : number
}