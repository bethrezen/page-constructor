import React, {Fragment, ReactNode, useContext} from 'react';
import {block, getHeaderTag, getLinkProps} from '../../utils';
import {HTML} from '@doc-tools/components';

import {TextSize, TitleProps} from '../../models';
import Anchor from '../Anchor/Anchor';
import ToggleArrow from '../ToggleArrow/ToggleArrow';
import {LocationContext} from '../../context/locationContext';

import './Title.scss';

const b = block('title-block');

export function getArrowSize(size: TextSize) {
    switch (size) {
        case 'l':
            return 24;
        case 's':
            return 14;
        case 'm':
        default:
            return 20;
    }
}

export interface TitleFullProps extends TitleProps {
    className?: string;
    onClick?: () => void;
    dataQa?: string;
}

const Title: React.FunctionComponent<TitleFullProps> = (props) => {
    const {textSize = 'm', text, anchor, justify, url, onClick, custom, className, dataQa} = props;
    const {hostname} = useContext(LocationContext);
    const textMarkup = (
        <React.Fragment>
            <HTML className={b('text')}>{text}</HTML>
            {custom && (
                <React.Fragment>
                    &nbsp;
                    <span className={b('custom')}>{custom}</span>
                </React.Fragment>
            )}
        </React.Fragment>
    );
    let content: ReactNode;

    const insideClickableContent = (
        <span className={b('wrapper')}>
            {textMarkup}
            &nbsp;
            <ToggleArrow
                className={b('arrow', {size: textSize})}
                size={getArrowSize(textSize)}
                type={'horizontal'}
                iconType="navigation"
                open={false}
            />
        </span>
    );

    if (!url && !onClick) {
        content = textMarkup;
    } else if (url) {
        content = (
            <a className={b('link')} href={url} {...getLinkProps(url, hostname)} onClick={onClick}>
                {insideClickableContent}
            </a>
        );
    } else if (onClick) {
        content = (
            <span className={b('link')} onClick={onClick}>
                {insideClickableContent}
            </span>
        );
    }

    return (
        <Fragment>
            {anchor && <Anchor id={anchor} className={b('anchor')} />}
            {React.createElement(
                getHeaderTag(textSize),
                {
                    className: b({size: textSize, justify}, className),
                    'data-qa': `${dataQa}-header`,
                },
                content,
            )}
        </Fragment>
    );
};

export default Title;
