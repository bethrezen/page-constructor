import React from 'react';

import {block} from '../../utils';
import {GridBlock} from '../../components';
import {SectionProps as SectionParams} from '../../models';
import Anchor from '../Anchor/Anchor';
import FullWidthBackground from '../FullWidthBackground/FullWidthBackground';
import BackgroundImage from '../BackgroundImage/BackgroundImage';

import './Section.scss';

export interface SectionProps extends Omit<SectionParams, 'children'> {}

const b = block('section-block');

const Section: React.FunctionComponent<SectionProps> = ({
    children,
    anchor,
    background,
    justify,
    theme = 'light',
}) => (
    <section className={b({theme, background: Boolean(background)})}>
        {anchor && <Anchor id={anchor} className={b('anchor')} />}
        {background && (
            <FullWidthBackground
                className={b('background')}
                style={{backgroundColor: background.color}}
            >
                {background.image && (
                    <BackgroundImage className={b('image')} src={background.image} />
                )}
            </FullWidthBackground>
        )}
        <GridBlock justify={justify}>{children}</GridBlock>
    </section>
);

export default Section;
