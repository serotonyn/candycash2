/**
* This file was @generated using pocketbase-typegen
*/

import type PocketBase from 'pocketbase'
import type { RecordService } from 'pocketbase'

export enum Collections {
	Categories = "categories",
	Clotures = "clotures",
	Company = "company",
	ComposeImages = "compose_images",
	Logs = "logs",
	OrderItems = "orderItems",
	Pdfs = "pdfs",
	Products = "products",
	Sequences = "sequences",
	Settings = "settings",
	Transactions = "transactions",
	Users = "users",
}

// Alias types for improved usability
export type IsoDateString = string
export type RecordIdString = string
export type HTMLString = string

// System fields
export type BaseSystemFields<T = never> = {
	id: RecordIdString
	created: IsoDateString
	updated: IsoDateString
	collectionId: string
	collectionName: Collections
	expand?: T
}

export type AuthSystemFields<T = never> = {
	email: string
	emailVisibility: boolean
	username: string
	verified: boolean
} & BaseSystemFields<T>

// Record types for each collection

export type CategoriesRecord = {
	image?: string
	name?: string
}

export type CloturesRecord = {
	active?: boolean
	fondDeCaisse?: number
}

export type CompanyRecord = {
	address?: string
	logo?: string
	name?: string
	phone?: string
}

export type ComposeImagesRecord = {
	bodypart?: string
	img?: string
}

export type LogsRecord = {
	file?: string
	message?: string
}

export type OrderItemsRecord = {
	category?: RecordIdString
	discount?: number
	itemIndex?: number
	itemsPerUnit?: number
	printUnitname?: string
	product?: RecordIdString
	productName?: string
	purchasePrice?: number
	purchaseSubtotal?: number
	quantity?: number
	returned?: number
	salePrice?: number
	subItems?: number
	subUnitname?: string
	subtax?: number
	subtotal?: number
	taxRate?: number
	transaction?: RecordIdString
	unitname?: string
}

export type PdfsRecord = {
	receipt?: string
}

export type ProductsRecord = {
	category: RecordIdString
	code: number
	image?: string
	name?: string
	purchasePrice?: number
	salePrice?: number
}

export type SequencesRecord = {
	transaction: number
}

export type SettingsRecord = {
	printer_method?: string
	printer_orientation?: string
	printer_paper?: string
	printer_scale?: string
}

export enum TransactionsStatusOptions {
	"NOT_PAID" = "NOT_PAID",
	"PARTIALLY_PAID" = "PARTIALLY_PAID",
	"PAID" = "PAID",
	"OVER_PAID" = "OVER_PAID",
}
export type TransactionsRecord = {
	amountDue?: number
	cloture?: RecordIdString
	grandTotal?: number
	paid?: number
	sequence?: number
	status?: TransactionsStatusOptions
	totalDiscount?: number
	user?: RecordIdString
}

export enum UsersColorSchemeOptions {
	"System" = "System",
	"Light" = "Light",
	"Dark" = "Dark",
}
export type UsersRecord = {
	avatar?: string
	colorScheme?: UsersColorSchemeOptions
	images?: RecordIdString[]
	isAdmin?: boolean
	name?: string
}

// Response types include system fields and match responses from the PocketBase API
export type CategoriesResponse<Texpand = unknown> = Required<CategoriesRecord> & BaseSystemFields<Texpand>
export type CloturesResponse<Texpand = unknown> = Required<CloturesRecord> & BaseSystemFields<Texpand>
export type CompanyResponse<Texpand = unknown> = Required<CompanyRecord> & BaseSystemFields<Texpand>
export type ComposeImagesResponse<Texpand = unknown> = Required<ComposeImagesRecord> & BaseSystemFields<Texpand>
export type LogsResponse<Texpand = unknown> = Required<LogsRecord> & BaseSystemFields<Texpand>
export type OrderItemsResponse<Texpand = unknown> = Required<OrderItemsRecord> & BaseSystemFields<Texpand>
export type PdfsResponse<Texpand = unknown> = Required<PdfsRecord> & BaseSystemFields<Texpand>
export type ProductsResponse<Texpand = unknown> = Required<ProductsRecord> & BaseSystemFields<Texpand>
export type SequencesResponse<Texpand = unknown> = Required<SequencesRecord> & BaseSystemFields<Texpand>
export type SettingsResponse<Texpand = unknown> = Required<SettingsRecord> & BaseSystemFields<Texpand>
export type TransactionsResponse<Texpand = unknown> = Required<TransactionsRecord> & BaseSystemFields<Texpand>
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> & AuthSystemFields<Texpand>

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	categories: CategoriesRecord
	clotures: CloturesRecord
	company: CompanyRecord
	compose_images: ComposeImagesRecord
	logs: LogsRecord
	orderItems: OrderItemsRecord
	pdfs: PdfsRecord
	products: ProductsRecord
	sequences: SequencesRecord
	settings: SettingsRecord
	transactions: TransactionsRecord
	users: UsersRecord
}

export type CollectionResponses = {
	categories: CategoriesResponse
	clotures: CloturesResponse
	company: CompanyResponse
	compose_images: ComposeImagesResponse
	logs: LogsResponse
	orderItems: OrderItemsResponse
	pdfs: PdfsResponse
	products: ProductsResponse
	sequences: SequencesResponse
	settings: SettingsResponse
	transactions: TransactionsResponse
	users: UsersResponse
}

// Type for usage with type asserted PocketBase instance
// https://github.com/pocketbase/js-sdk#specify-typescript-definitions

export type TypedPocketBase = PocketBase & {
	collection(idOrName: 'categories'): RecordService<CategoriesResponse>
	collection(idOrName: 'clotures'): RecordService<CloturesResponse>
	collection(idOrName: 'company'): RecordService<CompanyResponse>
	collection(idOrName: 'compose_images'): RecordService<ComposeImagesResponse>
	collection(idOrName: 'logs'): RecordService<LogsResponse>
	collection(idOrName: 'orderItems'): RecordService<OrderItemsResponse>
	collection(idOrName: 'pdfs'): RecordService<PdfsResponse>
	collection(idOrName: 'products'): RecordService<ProductsResponse>
	collection(idOrName: 'sequences'): RecordService<SequencesResponse>
	collection(idOrName: 'settings'): RecordService<SettingsResponse>
	collection(idOrName: 'transactions'): RecordService<TransactionsResponse>
	collection(idOrName: 'users'): RecordService<UsersResponse>
}
