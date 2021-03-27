import { Category } from "./Category";
import { User } from "./User";
export declare class Post {
    id: number;
    userId: number;
    categoryId: number | null;
    url: string | null;
    createdAt: Date | null;
    message: string;
    category: Category;
    user: User;
}
