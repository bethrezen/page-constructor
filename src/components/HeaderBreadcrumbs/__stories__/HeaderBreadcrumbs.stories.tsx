import {Meta, Story} from '@storybook/react/types-6-0';
import React from 'react';

import HeaderBreadcrumbs from '../HeaderBreadcrumbs';
import {BUTTONS_LINKS, COMPONENTS} from '../../../demo/constants';
import {HeaderBreadCrumbsProps} from '../../../models';

export default {
    component: HeaderBreadcrumbs,
    title: `${COMPONENTS}/${BUTTONS_LINKS}/HeaderBreadcrumbs`,
} as Meta;

const DefaultTemplate: Story<HeaderBreadCrumbsProps> = (args) => <HeaderBreadcrumbs {...args} />;

export const Default = DefaultTemplate.bind({});

Default.args = {
    theme: 'light',
    items: [
        {
            url: '#',
            text: 'Пошаговые инструкции',
        },
        {
            url: '#',
            text: 'Установка приложений',
        },
        {
            url: '#',
            text: 'Установка Jaeger',
        },
    ],
};
