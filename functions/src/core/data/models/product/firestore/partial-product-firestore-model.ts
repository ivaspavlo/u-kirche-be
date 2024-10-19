import { Product } from '../../../product';
import { ProductFirestoreModel } from './product-firestore-model';

export class PartialProductFirestoreModel {
    static fromPartialEntity(partialProduct: Partial<Record<keyof Product, unknown>>) {
        return {
            ...partialProduct,
            toDocumentData (): Partial<Record<string, unknown>> {
                const res: Partial<Record<string, unknown>> = {};
                if (partialProduct.name) res[ProductFirestoreModel.kName] = partialProduct.name;
                if (partialProduct.price) res[ProductFirestoreModel.kPrice] = partialProduct.price;
                if (partialProduct.stockQuantity) res[ProductFirestoreModel.kStockQuantity] = partialProduct.stockQuantity;
                if (partialProduct.internalCode) res[ProductFirestoreModel.kInternalCode] = partialProduct.internalCode;
                return res;
            }
        }
    }
}
