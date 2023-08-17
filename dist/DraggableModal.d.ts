import { FunctionComponent } from 'react';
import { ModalProps } from 'antd/lib/modal';
export interface DraggableModalProps extends ModalProps {
    initialWidth?: number;
    initialHeight?: number;
}
export declare const DraggableModal: FunctionComponent<DraggableModalProps>;
