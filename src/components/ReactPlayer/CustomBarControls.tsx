import React, {useCallback} from 'react';
import {ClassNameProps} from '@yandex-data-ui/cloud-components';

import {block} from '../../utils';
import CircleProgress from './CircleProgress';

import muteIcon from '../../../assets/images/mute.svg';
import unmuteIcon from '../../../assets/images/unmute.svg';

import './CustomBarControls.scss';

const b = block('CustomBarControls');

interface MuteConfigProps {
    isMuted: boolean;
    changeMute: (event: React.MouseEvent) => void;
}

export interface CustomBarControlsProps extends ClassNameProps {
    mute?: MuteConfigProps;
    elapsedTimePercent?: number;
}

const CustomBarControls: React.FC<CustomBarControlsProps> = (props) => {
    const {mute, elapsedTimePercent = 0, className} = props;

    const renderMute = useCallback((elapsedTime: number, muteConfig?: MuteConfigProps) => {
        if (!muteConfig) {
            return null;
        }

        const {isMuted, changeMute} = muteConfig;
        const icon = isMuted ? muteIcon : unmuteIcon;

        return (
            <div className={b('button')} onClick={changeMute}>
                <div className={b('mute-button')} style={{backgroundImage: icon}} />
                {!isMuted && <CircleProgress elapsedTime={elapsedTime} strokeWidth={5} />}
            </div>
        );
    }, []);

    return <div className={b('wrapper', className)}>{renderMute(elapsedTimePercent, mute)}</div>;
};

export default CustomBarControls;
