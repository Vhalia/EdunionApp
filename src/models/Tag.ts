
interface Category {
    name: string
}

interface Tag {
    id: number,
    name: string
    category: Category
}

export type {Tag, Category}