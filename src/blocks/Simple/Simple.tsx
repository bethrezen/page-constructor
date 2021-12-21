import React from 'react';

import {block} from '../../utils';
import {SimpleBlockProps} from '../../models';
import AnimateBlock from '../../components/AnimateBlock/AnimateBlock';
import BlockHeader from '../../components/BlockHeader/BlockHeader';
import YFMWrapper from '../../components/YFMWrapper/YFMWrapper';

import './Simple.scss';

const b = block('simple-block');

const SimpleBlock: React.FC<SimpleBlockProps> = (props) => {
    const {title, description, animated = true, children} = props;

    const blockHeader = title && <BlockHeader title={title} />;

    return (
        <AnimateBlock className={b()} animate={animated}>
            <div>
                {blockHeader}
                <div className={b('description')}>
                    <YFMWrapper content={description} />
                </div>
                <div className={b('animate-block')}>{children}</div>
            </div>
        </AnimateBlock>
    );
};

export default SimpleBlock;
