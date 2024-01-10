import { SharedValue } from "react-native-reanimated"

export default interface CarouselPaginationProps {
    progressValue: SharedValue<number>
    index: number,
    isActive: boolean
}