import React, {useContext} from 'react';
import block from 'bem-cn-lite';

// TODO refactor in https://st.yandex-team.ru/ORION-1444

import {LayoutDirections} from '@yandex-data-ui/common/build/esm/components/ShareTooltip/constants';
import {ShareTooltip, ShareSocialNetwork} from '@yandex-cloud/uikit';

import {TranslationContext} from 'contexts/TranslationContext';
import {RouterContext} from 'contexts/RouterContext';
import {MobileContext} from 'contexts/MobileContext';

import {getAbsolutePath} from 'utils/common';

import {MetrikaCounter} from 'counters/utils';

// @ts-ignore
import metrika from 'counters/metrika.js';

import shareIcon from 'icons/share-arrow-up.svg';

import '../BlogInfo.scss';

const b = block('blog-info');

type BlogSharingProps = {
    theme?: 'light' | 'dark';
    metrikaGoal?: string;
};

/**
 * Component for sharing blog UI-element
 *
 * @param theme - theme name
 * @param metrikaGoal - metrika goal name
 *
 * @returns jsx
 */
export const BlogSharing: React.FC<BlogSharingProps> = ({theme, metrikaGoal}) => {
    const {i18n} = useContext(TranslationContext);
    const router = useContext(RouterContext);
    const isMobile = useContext(MobileContext);

    const handleMetrika = () => {
        metrika.reachGoal(MetrikaCounter.CrossSite, metrikaGoal);
    };

    return (
        <div className={b('item')}>
            <span className={b('icon')}>
                <ShareTooltip
                    url={getAbsolutePath(router)}
                    className={b('share')}
                    iconClass={b('share-icon')}
                    switcherClassName={b('switcher', {theme})}
                    tooltipClassName={b('popup')}
                    useWebShareApi={isMobile}
                    direction={LayoutDirections.column as any}
                    buttonTitle={i18n('blog', 'action-share')}
                    customIcon={shareIcon}
                    placement="bottom"
                    openByHover={false}
                    socialNets={[ShareSocialNetwork.Telegram]}
                    handleMetrika={handleMetrika}
                />
            </span>
        </div>
    );
};
