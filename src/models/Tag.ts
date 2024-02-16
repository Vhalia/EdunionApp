
interface Category {
    name: string
}

interface Tag {
    name: string
    category: Category
}

export type {Tag, Category}