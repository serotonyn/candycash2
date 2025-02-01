import {
  CategoriesResponse,
  CloturesResponse,
  ComposeImagesResponse,
  OrderItemsResponse,
  ProductsResponse,
  TransactionsResponse,
  UsersResponse,
} from "@/pocketbase-types";

interface UserExpand {
  images: ComposeImagesResponse[];
}

export type UsersExpanded = UsersResponse<UserExpand> & {
  imgUrl?: string;
};

interface ProductExpand {
  category?: CategoriesResponse;
  image: string;
  size: SizesResponse;
  topping: ToppingsResponse;
  flavor: FlavorsResponse;
}

export type ProductsExpanded = ProductsResponse<ProductExpand> & {
  imgUrl?: string;
};

interface OrderItemExpand {
  product: ProductsExpanded;
  size?: SizesResponse;
  topping?: ToppingsResponse;
  flavor?: FlavorsResponse;
  transaction?: TransactionsResponse & {
    expand?: { cloture?: CloturesResponse };
  };
}

export type OrderItemExpanded = OrderItemsResponse<OrderItemExpand>;

interface CategoryExpand {
  "products(category)"?: ProductsResponse[];
}

export type CategoriesExpanded = CategoriesResponse<CategoryExpand> & {
  imgUrl?: string;
};

export type CompanyExpanded = CompanyResponse<CompanyExpand> & {
  imgUrl?: string;
};

interface TransactionExpand {
  expand: {
    user: UsersResponse;
    "orderItems(transaction)"?: OrderItemExpanded[];
    cloture: CloturesResponse;
  };
}

export type TransactionExpanded = TransactionsResponse & TransactionExpand;
