import * as React from 'react';
import { ModalProps } from 'antd/lib/modal';
import { DraggableModalContextMethods } from './DraggableModalContext';
import { ModalID, ModalState } from './draggableModalReducer';
interface ContextProps extends DraggableModalContextMethods {
    id: ModalID;
    modalState: ModalState;
    initialWidth?: number;
    initialHeight?: number;
}
export declare type DraggableModalInnerProps = ModalProps & {
    children?: React.ReactNode;
} & ContextProps;
declare function DraggableModalInnerNonMemo({ id, modalState, dispatch, open, children, title, initialWidth, initialHeight, ...otherProps }: DraggableModalInnerProps): React.JSX.Element;
export declare const DraggableModalInner: React.MemoExoticComponent<typeof DraggableModalInnerNonMemo>;
export {};
