export interface DialogStateModel {
    isOpen: boolean,
    confirmCallback: () => any,
    cancelCallback: () => any
}