import React from 'react';
import {a11yHiddenSvgProps} from '../utils/svg';

export const LikeFilled: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="currentColor"
        {...a11yHiddenSvgProps}
        {...props}
    >
        <path d="M8.39 15.246a.69.69 0 0 1-.78 0C6.006 14.166 0 9.855 0 5.782c0-5.344 6.28-6.2 8-2.6 1.72-3.6 8-2.744 8 2.6 0 4.073-6.006 8.385-7.61 9.464Z" />
    </svg>
);
