export declare type ModalID = string;
export interface ModalState {
    x: number;
    y: number;
    width: number;
    height: number;
    zIndex: number;
    open: boolean;
}
export interface ModalsState {
    maxZIndex: number;
    windowSize: {
        width: number;
        height: number;
    };
    modals: {
        [key: string]: ModalState;
    };
}
export declare const initialModalsState: ModalsState;
export declare const initialModalState: ModalState;
export declare type Action = {
    type: 'show';
    id: ModalID;
} | {
    type: 'hide';
    id: ModalID;
} | {
    type: 'focus';
    id: ModalID;
} | {
    type: 'unmount';
    id: ModalID;
} | {
    type: 'mount';
    id: ModalID;
    intialState: {
        initialWidth?: number;
        initialHeight?: number;
    };
} | {
    type: 'windowResize';
    size: {
        width: number;
        height: number;
    };
} | {
    type: 'drag';
    id: ModalID;
    x: number;
    y: number;
} | {
    type: 'resize';
    id: ModalID;
    x: number;
    y: number;
    width: number;
    height: number;
};
export declare const getModalState: ({ state, id, initialWidth, initialHeight, }: {
    state: ModalsState;
    id: ModalID;
    initialWidth?: number | undefined;
    initialHeight?: number | undefined;
}) => ModalState;
export declare const draggableModalReducer: (state: ModalsState, action: Action) => ModalsState;
