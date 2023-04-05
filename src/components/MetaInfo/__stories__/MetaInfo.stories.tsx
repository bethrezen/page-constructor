import React from 'react';

import {Meta, Story} from '@storybook/react/types-6-0';

import {COMPONENTS} from '../../../demo/constants';
import MetaInfo, {MetaInfpoProps} from '../MetaInfo';

import data from './data.json';

export default {
    component: MetaInfo,
    title: `${COMPONENTS}/MetaInfo`,
} as Meta;

const DefaultTemplate: Story<MetaInfpoProps> = (args) => <MetaInfo {...args} />;

export const Default = DefaultTemplate.bind({});

Default.args = data.default.content as MetaInfpoProps;
