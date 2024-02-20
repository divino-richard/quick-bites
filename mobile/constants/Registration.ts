import { UserType } from "@/types/user.types"

export default {
    cardData: [
        {
            userType: "customer",
            description: "Lorem ipsum dolor, consectetur adipiscing elit, sed do eiusmod tempor elit",
            imagePath: require('../assets/images/customer-cart.png'),
        },
        {
            userType: "rider",
            description: "Lorem ipsum dolor, consectetur adipiscing elit, sed do eiusmod tempor consectetur",
            imagePath: require('../assets/images/delivery-rider.png'),
        },
        {
            userType: "merchant",
            description: "Lorem ipsum dolor, consectetur adipiscing elit, sed do eiusmod ipsum",
            imagePath: require('../assets/images/merchant.png'),
        },
    ] as CardData[]
}

interface CardData {
    userType: UserType;
    description: string;
    imagePath: any;
}
