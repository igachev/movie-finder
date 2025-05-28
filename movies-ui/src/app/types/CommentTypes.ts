
export type Comment = {
    id: number;
    content: string;
    createdOn: Date;
    createdBy: string;
}

export type CommentRequest = {
    content: string;
}