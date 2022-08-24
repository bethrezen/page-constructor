import React, {useContext} from 'react';

import {SpeakerPublic} from '@yandex-data-ui/cloud-schemas/build/models/ui-api';

import Meta, {MetaComponentProps} from 'components/Meta/Meta';

import {RouterContext} from 'contexts/RouterContext';
import {LocaleContext} from 'contexts/LocaleContext';

import {getBlogPostSchema} from 'utils/meta';

import {BlogPostTagExtended} from 'models/blog';

export type BlogMetaProps = {
    title: string;
    date: string;
    image: string;
    canonicalUrl: string;
    content?: string;
    description?: string;
    legacySharingImage?: string;
    keywords?: string[];
    noIndex?: boolean;
    authors?: SpeakerPublic[];
    tags?: BlogPostTagExtended[];
    organization: {
        url: string;
        appTitle: string;
        legalName: string;
        supportEmail: string;
    };
};

/**
 * Create meta data for blog page
 *
 * @param title - post title
 * @param date - post create date
 * @param description - post description
 * @param image - post image
 * @param keywords - keywords fro meta
 * @param noIndex - flag that we need to don't indexing the page
 * @param authors - post authors
 * @param tags - post tags
 * @param content - post content like string
 * @param legacySharingImage - image for legacy sharing
 * @param organization - info about organization (YCloud, DoubleCloud)
 * @param canonicalUrl - post canonicalUrl
 * @returns
 */
export const BlogPageMeta: React.FC<BlogMetaProps> = React.memo(
    ({
        title,
        date,
        description = '',
        image,
        keywords,
        noIndex = false,
        authors = [],
        tags = [],
        content = '',
        legacySharingImage = '',
        organization,
        canonicalUrl,
    }) => {
        const {pathname} = useContext(RouterContext);
        const {locale} = useContext(LocaleContext);

        const breadcrumbs = [
            {
                slug: '/blog',
                title: 'Blog', // TODO ORION-1450 i18n('blog', 'title-blog'),
            },
        ];

        if (tags?.length) {
            const tag = tags[0];
            breadcrumbs.push({
                slug: tag.slug,
                title: tag.name,
            });
        }

        const metaKeywords = keywords || tags?.map((tag) => tag.name);

        const authorNames = authors?.map((author) => author.fullName).join(', ');

        const schemaData = getBlogPostSchema({
            title,
            date,
            description,
            author: authorNames,
            image,
            url: pathname,
            keywords: metaKeywords,
            content,
            breadcrumbs,
            organization,
            locale,
        });

        const {name: shareTag} = tags?.[0] || {};
        const hasLegacySharing = Boolean(legacySharingImage);
        const generatedSharingProps = hasLegacySharing
            ? []
            : [
                  {property: 'share:title', content: title},
                  {property: 'share:tag', content: shareTag},
                  {property: 'share:content_image', content: image},
                  {property: 'share:sharing_schema', content: 'blog-share'},
              ];

        const meta: MetaComponentProps = {
            url: pathname,
            title,
            appTitle: organization.appTitle,
            description,
            keywords,
            noIndex,
            canonicalUrl,
            image: hasLegacySharing ? legacySharingImage : undefined,
            schemaJsonLd: schemaData,
            sharing: {
                title,
                description,
            },
            extra: [
                {property: 'article:published_time', content: date},
                {property: 'article:author', content: authorNames},
                ...generatedSharingProps,
            ].concat(tags?.map(({name}) => ({property: 'article:tag', content: name})) || []),
        };

        return <Meta {...meta} />;
    },
);
