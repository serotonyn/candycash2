/**
* This file was @generated using pocketbase-typegen
*/

import type PocketBase from 'pocketbase'
import type { RecordService } from 'pocketbase'

export enum Collections {
	Authorigins = "_authOrigins",
	Externalauths = "_externalAuths",
	Mfas = "_mfas",
	Otps = "_otps",
	Superusers = "_superusers",
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
}

// Alias types for improved usability
export type IsoDateString = string
export type RecordIdString = string
export type HTMLString = string

// System fields
export type BaseSystemFields<T = never> = {
	id: RecordIdString
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

export type AuthoriginsRecord = {
	collectionRef: string
	created?: IsoDateString
	fingerprint: string
	id: string
	recordRef: string
	updated?: IsoDateString
}

export type ExternalauthsRecord = {
	collectionRef: string
	created?: IsoDateString
	id: string
	provider: string
	providerId: string
	recordRef: string
	updated?: IsoDateString
}

export type MfasRecord = {
	collectionRef: string
	created?: IsoDateString
	id: string
	method: string
	recordRef: string
	updated?: IsoDateString
}

export type OtpsRecord = {
	collectionRef: string
	created?: IsoDateString
	id: string
	password: string
	recordRef: string
	sentTo?: string
	updated?: IsoDateString
}

export type SuperusersRecord = {
	created?: IsoDateString
	email: string
	emailVisibility?: boolean
	id: string
	password: string
	tokenKey: string
	updated?: IsoDateString
	verified?: boolean
}

export type CategoriesRecord = {
	created?: IsoDateString
	id: string
	image?: string
	name?: string
	updated?: IsoDateString
}

export type CloturesRecord = {
	active?: boolean
	created?: IsoDateString
	fondDeCaisse?: number
	id: string
	updated?: IsoDateString
}

export type CompanyRecord = {
	address?: string
	created?: IsoDateString
	id: string
	logo?: string
	name?: string
	phone?: string
	updated?: IsoDateString
}

export type ComposeImagesRecord = {
	bodypart?: string
	created?: IsoDateString
	id: string
	img?: string
	updated?: IsoDateString
}

export type LogsRecord = {
	created?: IsoDateString
	file?: string
	id: string
	message?: string
	updated?: IsoDateString
}

export type OrderItemsRecord = {
	category?: RecordIdString
	created?: IsoDateString
	discount?: number
	id: string
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
	updated?: IsoDateString
}

export type PdfsRecord = {
	created?: IsoDateString
	id: string
	receipt?: string
	updated?: IsoDateString
}

export type ProductsRecord = {
	category: RecordIdString
	code: number
	created?: IsoDateString
	id: string
	image?: string
	name?: string
	purchasePrice?: number
	salePrice?: number
	updated?: IsoDateString
}

export type SequencesRecord = {
	created?: IsoDateString
	id: string
	transaction?: number
	updated?: IsoDateString
}

export type SettingsRecord = {
	created?: IsoDateString
	id: string
	printer_method?: string
	printer_orientation?: string
	printer_paper?: string
	printer_scale?: string
	updated?: IsoDateString
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
	created?: IsoDateString
	grandTotal?: number
	id: string
	paid?: number
	sequence?: number
	status?: TransactionsStatusOptions
	totalDiscount?: number
	updated?: IsoDateString
	username?: string
}

// Response types include system fields and match responses from the PocketBase API
export type AuthoriginsResponse<Texpand = unknown> = Required<AuthoriginsRecord> & BaseSystemFields<Texpand>
export type ExternalauthsResponse<Texpand = unknown> = Required<ExternalauthsRecord> & BaseSystemFields<Texpand>
export type MfasResponse<Texpand = unknown> = Required<MfasRecord> & BaseSystemFields<Texpand>
export type OtpsResponse<Texpand = unknown> = Required<OtpsRecord> & BaseSystemFields<Texpand>
export type SuperusersResponse<Texpand = unknown> = Required<SuperusersRecord> & AuthSystemFields<Texpand>
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

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	_authOrigins: AuthoriginsRecord
	_externalAuths: ExternalauthsRecord
	_mfas: MfasRecord
	_otps: OtpsRecord
	_superusers: SuperusersRecord
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
}

export type CollectionResponses = {
	_authOrigins: AuthoriginsResponse
	_externalAuths: ExternalauthsResponse
	_mfas: MfasResponse
	_otps: OtpsResponse
	_superusers: SuperusersResponse
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
}

// Type for usage with type asserted PocketBase instance
// https://github.com/pocketbase/js-sdk#specify-typescript-definitions

export type TypedPocketBase = PocketBase & {
	collection(idOrName: '_authOrigins'): RecordService<AuthoriginsResponse>
	collection(idOrName: '_externalAuths'): RecordService<ExternalauthsResponse>
	collection(idOrName: '_mfas'): RecordService<MfasResponse>
	collection(idOrName: '_otps'): RecordService<OtpsResponse>
	collection(idOrName: '_superusers'): RecordService<SuperusersResponse>
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
}
