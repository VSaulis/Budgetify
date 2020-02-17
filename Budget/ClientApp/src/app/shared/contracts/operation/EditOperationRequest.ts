export interface EditOperationRequest {
    id: number;
    version: string;
    amount: number;
    date: string;
    description: string;
    categoryId: number;
}
