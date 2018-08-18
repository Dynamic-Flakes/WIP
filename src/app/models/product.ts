export class Product {
    vendorId: string;
    productName: string;
    productImage: string;
    productBackImage: string;
    productLeftImage: string;
    productRightImage: string;
    productBriefDesc: string;
    productDetailDesc: string;
    productSpec: string;
    brand: string;
    location: string;
    quantity: string;
    price: number

    public useProduct(src: Product) {
        this.vendorId = src.vendorId;
        this.productName = src.productName;
        this.productImage = src.productImage;
        this.productBackImage = src.productBackImage
        this.productLeftImage = src.productLeftImage;
        this.productRightImage = src.productRightImage;
        this.productBriefDesc = src.productBriefDesc;
        this.productDetailDesc = src.productDetailDesc;
        this.productSpec = src.productSpec;
        this.brand = src.brand;
        this.location = src.location;
        this.quantity = src.quantity;
        this.price = src.price
    }
}
