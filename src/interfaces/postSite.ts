export interface Category {
	name: string;
	slug: string;
}

export interface IntroductionSection {
	header: string;
	content: string;
}

export interface TableOfContentsItem {
	header: string;
	anchor: string;
}

export interface ImageContent {
	src: string;
	alt: string;
}

export interface TextContent {
	header: string;
	paragraph: string;
	anchor: string;
}

export interface ImageTextContent {
	image: ImageContent;
	text: TextContent[];
	layout: "left" | "right";
}

export interface ContentItem {
	type: "text" | "image" | "image-text";
	header?: string;
	paragraph?: string;
	anchor?: string;
	src?: string;
	alt?: string;
	image?: ImageContent;
	text?: TextContent[];
	layout?: "left" | "right";
}

export interface DetailedPost {
	title: string;
	slug: string;
	author: string;
	authorAvatar: string;
	categories: Category[];
	thumbnailName: string;
	introduction: IntroductionSection;
	tableOfContents: TableOfContentsItem[][];
	content: ContentItem[][];
	creationDate: string;
}
