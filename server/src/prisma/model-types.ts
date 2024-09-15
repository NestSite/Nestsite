// merchant.interface.ts

export interface Merchant {
    id: number;
    username?: string | null;
    email: string;
    secondaryEmail?: string | null;
    password?: string | null;
    googleId?: string | null;
    profilePhoto?: string | null;
    role: string;
    emailVerified: boolean;
    accountVerified: boolean;
    phoneNumber?: string | null;
    address?: string | null;
    countryRegion?: string | null;
    instagramURL?: string | null;
    facebookURL?: string | null;
    tiktokURL?: string | null;
    twitterURL?: string | null;
    stores: StoreInterface[];
    portfolio: PortfolioInterface[];
    twoFactorEnabled: boolean;
    createdAt: Date;
    updatedAt: Date;
    devices: DeviceInterface[];
    subscriptionPlanId?: number | null;
    subscriptionPlan?: SubscriptionPlanInterface | null;
  }
  
  export interface StoreInterface {
    id: number;
    merchant: Merchant;
    merchantId: number;
    name?: string | null;
    storeImg?: string | null;
    domainName?: string | null;
    published: boolean;
    billingCurrency?: string | null;
    storeCurrency?: string | null;
    timeZone?: string | null;
    storePhone?: string | null;
    storeEmail?: string | null;
    businessName?: string | null;
    countryRegion?: string | null;
    address?: string | null;
    apartment?: string | null;
    city?: string | null;
    state?: string | null;
    postalCode?: string | null;
    productsCount?: number | null;
    createdAt: Date;
    updatedAt: Date;
    users: UserInterface[];
    products: ProductInterface[];
  }
  
  export interface PortfolioInterface {
    id: number;
    merchant: Merchant;
    merchantId: number;
    name?: string | null;
    storeImg?: string | null;
    domainName?: string | null;
    published: boolean;
    billingCurrency?: string | null;
    storeCurrency?: string | null;
    timeZone?: string | null;
    businessName?: string | null;
    countryRegion?: string | null;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface DeviceInterface {
    id: number;
    identifier: string;
    merchantId: number;
    merchant: Merchant;
  }
  
  export interface SubscriptionPlanInterface {
    id: number;
    name: string;
    price: number;
    maxStores: number;
    maxProductsPerStore: number;
    maxStoreThemes: number;
    noInventoryLocations: number;
    transactionFeePercent?: number | null;
    productCommission?: number | null;
    allowsCustomDomain: boolean;
    createdAt: Date;
    updatedAt: Date;
    merchants: Merchant[];
  }
  
  export interface UserInterface {
    id: number;
    email: string;
    username?: string | null;
    profilePhoto?: string | null;
    password?: string | null;
    role: string;
    emailVerified: boolean;
    store?: StoreInterface | null;
    storeId?: number | null;
    createdAt: Date;
    updatedAt: Date;
    reviews: ReviewInterface[];
  }
  
  export interface ProductInterface {
    id: number;
    store: StoreInterface;
    storeId: number;
    title?: string | null;
    description?: string | null;
    tax: boolean;
    price: number;
    originalPrice: number;
    discountedPrice: number;
    compareAtPrice: number;
    costPerItem: number;
    continueSellingWhenOutOfStock: boolean;
    requiresShipping: boolean;
    weight: number;
    countryOfShipment?: string | null;
    hsCode?: string | null;
    sku?: string | null;
    barcode?: string | null;
    status: boolean;
    productType?: string | null;
    vendor?: string | null;
    collections?: string[] | null;
    tags?: string[] | null;
    productImages?: string[] | null;
    createdAt: Date;
    updatedAt: Date;
    reviews: ReviewInterface[];
  }
  
  export interface ReviewInterface {
    id: number;
    product: ProductInterface;
    productId: number;
    user: UserInterface;
    userId: number;
    stars: number;
    comments: string;
    createdAt: Date;
    updatedAt: Date;
  }