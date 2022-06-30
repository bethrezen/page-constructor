import React, {useContext} from 'react';
import {Icon} from '@yandex-cloud/uikit';
import {ClassNameProps} from '@yandex-data-ui/cloud-components';

import {block, getLinkProps, setUrlTld} from '../../utils';
import {LinkProps, TextSize} from '../../models';
import chevron from '../../../assets/icons/navigation-chevron.svg';
import FileLink from '../FileLink/FileLink';
import BackLink from '../BackLink/BackLink';
import {LocaleContext} from '../../context/localeContext/localeContext';
import {LocationContext} from '../../context/locationContext/locationContext';

import './Link.scss';

const b = block('link-block');

export type LinkFullProps = LinkProps & ClassNameProps;

function getArrowSize(size: TextSize) {
    switch (size) {
        case 'l':
            return 14;
        case 'm':
            return 12;
        case 's':
            return 12;
        default:
            return 12;
    }
}

const LinkBlock: React.FunctionComponent<LinkFullProps> = (props) => {
    const {
        text,
        url,
        arrow,
        theme = 'file-link',
        colorTheme = 'light',
        textSize = 'm',
        className,
        target,
        children,
    } = props;

    const {hostname} = useContext(LocationContext);
    const {tld} = useContext(LocaleContext);
    const href = setUrlTld(props.url, tld);
    const defaultTextSize = theme === 'back' ? 'l' : 'm';

    const getLinkByType = () => {
        switch (theme) {
            case 'back':
                return <BackLink title={children || text} url={href} />;
            case 'file-link':
            case 'underline':
                return (
                    <FileLink
                        text={children || text}
                        href={href}
                        type="horizontal"
                        textSize={textSize}
                    />
                );
            case 'normal': {
                const linkProps = getLinkProps(url, hostname, target);

                return (
                    <a
                        className={b('link', {theme: colorTheme, 'has-arrow': arrow})}
                        href={href}
                        {...linkProps}
                    >
                        {children || text}
                        {arrow && (
                            <Icon
                                className={b('arrow')}
                                data={chevron}
                                size={getArrowSize(textSize)}
                            />
                        )}
                    </a>
                );
            }
            default:
                return null;
        }
    };

    return (
        <div className={b({size: textSize || defaultTextSize}, className)}>{getLinkByType()}</div>
    );
};

export default LinkBlock;
