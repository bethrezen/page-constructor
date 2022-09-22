import {ReactNode} from 'react';

import {SpeakerPublic} from '@yandex-data-ui/cloud-schemas/build/models/ui-api';
import {HeaderBlockProps as PageConstructorHeaderBlockProps} from '@yandex-data-ui/page-constructor';

import {Locale} from '../models/locale';

export interface BlogPostLikes {
    count: number;
    hasUserLike: boolean;
}

export interface BlogPagePostsData {
    posts: BlogPostData[];
    count: number;
    totalCount: number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    pinnedPost?: any;
}

// export interface BlogPageData {
//     posts: BlogPagePostsData;
//     tags: BlogPostTagExtended[];
// }

export interface GetBlogPostsRequest {
    perPage: number;
    page: number;
    tags?: string;
    sortBy?: string;
    savedOnly?: boolean;
    search?: string;
}

type BlogPostTag = {
    id: number;
    slug: string;
    createdAt: string;
    updatedAt: string;
    icon: string;
    isDeleted: boolean;
    name: string;
    locale: string;
    blogTagId: number;
    count: number;
};

export type BlogPostTagExtended = BlogPostTag & {
    name: string;
    slug: string;
};

export interface BlogPostData {
    author?: string;
    authors?: SpeakerPublic[];
    blogPostId?: number;
    content?: string;
    date: string;
    description?: string;
    hasUserLike: boolean;
    htmlTitle: string;
    id: number;
    image: string;
    isPublished?: boolean;
    sharedImage?: string;
    likes: number;
    locale: Locale;
    metaDescription?: string | null;
    metaTitle?: string | null;
    readingTime?: number;
    shareDescription?: string;
    shareImage?: string;
    shareTitle?: string;
    slug: string;
    keywords?: string[];
    tags: BlogPostTagExtended[];
    textTitle: string;
    title: string;
    url: string;
    noIndex?: boolean;
}

export enum BlockType {
    BlogHeaderBlock = 'blog-header-block',
    BlogYFMBlock = 'blog-yfm-block',
    BlogLayoutBlock = 'blog-layout-block',
    BlogMediaBlock = 'blog-media-block',
    BlogBannerBlock = 'blog-banner-block',
    BlogCTABlock = 'blog-cta-block',
    BlogColoredTextBlock = 'blog-colored-text-block',
    BlogAuthorBlock = 'blog-author-block',
    BlogSuggestBlock = 'blog-suggest-block',
    BlogMetaBlock = 'blog-meta-block',
    BlogFeedBlock = 'blog-feed-block',
}

export type MetaOrganizationType = {
    url: string;
    appTitle: string;
    legalName: string;
    supportEmail: string;
};

export interface BlogPostMetaProps {
    title: string;
    date: string;
    image: string;
    canonicalUrl: string;
    content?: string;
    description?: string;
    sharing: {
        shareTitle: string;
        shareDescription: string;
        shareImage: string;
        shareGenImage: string;
        shareGenTitle: string;
    };
    keywords?: string[];
    noIndex?: boolean;
    authors?: SpeakerPublic[];
    tags?: BlogPostTagExtended[];
    organization: MetaOrganizationType;
}

export interface BlogPageMetaProps {
    title: string;
    description: string;
    noIndex: boolean;
    organization: MetaOrganizationType;
    sharing: {
        title: string;
        description: string;
    };
    blogPostsData: BlogPostData[];
    canonicalUrl: string;
}

export type ToggleLikeCallbackType = ({
    postId,
    hasLike,
}: {
    postId?: number;
    hasLike?: boolean;
}) => void;

export interface HeaderBlockProps extends PageConstructorHeaderBlockProps {
    backLink?: {
        url: string;
        title: ReactNode;
    };
}
