export interface Item {
	id: number,
	group: string,
	title: string,
	text: string,
	price: number,
	discount: number
}

export interface Cart {
	id: number,
	count: number
}