export interface FoodMenu {
    _id?: string,
    name: string,
    description: string,
    price: number,
    category: string,
    image?: File
}

export interface FoodMenuResponse {
    id: string,
    name: string,
    description: string,
    price: number,
    category: string,
    image: string
}
