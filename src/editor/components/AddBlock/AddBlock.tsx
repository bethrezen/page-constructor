/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
// TODO fix in https://github.com/gravity-ui/page-constructor/issues/965

import React, {PropsWithChildren, useEffect, useMemo, useRef, useState} from 'react';

import {Plus} from '@gravity-ui/icons';
import {Popup, TextInput} from '@gravity-ui/uikit';

import {blockMap} from '../../../constructor-items';
import {Block, BlockType, ClassNameProps} from '../../../models';
import {block} from '../../../utils';
import {EditorBlocksData, getEditorBlocksData} from '../../data';

import './AddBlock.scss';

const b = block('add-block');

export interface AddBlockProps extends ClassNameProps {
    onAdd: (data: Block) => void;
}

const sortedBlockNames = Object.keys(blockMap).sort();

const AddBlock = ({onAdd, className}: PropsWithChildren<AddBlockProps>) => {
    const [isOpened, setIsOpened] = useState(false);
    const [search, setSearch] = useState('');
    const [editorBlocksData, setEditorBlocksData] = useState<EditorBlocksData | null>(null);

    const ref = useRef(null);
    const blocks = useMemo(() => {
        if (!editorBlocksData) {
            return [];
        }

        return sortedBlockNames.filter((blockName) =>
            editorBlocksData[blockName as BlockType]?.meta.title
                .toLocaleLowerCase()
                .startsWith(search.toLocaleLowerCase()),
        );
    }, [editorBlocksData, search]);

    useEffect(() => {
        const loadEditorBlocksData = async () => {
            const data = await getEditorBlocksData();
            setEditorBlocksData(data);
        };

        loadEditorBlocksData();
    }, []);

    return (
        <div className={b(null, className)} ref={ref}>
            <button
                className={b('button')}
                type="button"
                onClick={() => {
                    setIsOpened(!isOpened);
                    setSearch('');
                }}
            >
                <Plus className={b('icon')} />
            </button>
            {isOpened && (
                <Popup
                    anchorRef={ref}
                    open={isOpened}
                    contentClassName={b('popup')}
                    placement="top"
                    offset={[0, 24]}
                    onOutsideClick={() => setIsOpened(false)}
                >
                    <div className={b('search')}>
                        <TextInput
                            placeholder="search"
                            type="text"
                            value={search}
                            size="l"
                            onUpdate={(value) => setSearch(value)}
                        />
                    </div>
                    <div className={b('blocks')}>
                        {blocks.map((blockName) => {
                            const blockData = editorBlocksData?.[blockName as BlockType];

                            if (!blockData) {
                                return null;
                            }

                            const Preview: React.FC<React.SVGProps<SVGSVGElement>> =
                                blockData.preview;

                            return (
                                <div
                                    key={blockName}
                                    className={b('block')}
                                    onClick={() => {
                                        onAdd(blockData?.template as Block);
                                        setIsOpened(false);
                                    }}
                                >
                                    <div className={b('preview')}>
                                        <Preview />
                                    </div>
                                    <div className={b('info')}>
                                        <h4 className={b('title')}>{blockData.meta.title}</h4>
                                        {blockData?.meta?.description && (
                                            <p className={b('description')}>
                                                {blockData.meta.description}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </Popup>
            )}
        </div>
    );
};

export default AddBlock;
