import { useEffect, useRef } from 'react';
import './popup.scss';

const Popup = props => {
    const popupRef = useRef();

    useEffect(() => {
        const clickOutsideContent = (e) => {
            if (e.target === popupRef.current) {
                props.setShow(false);
            }
        };
        window.addEventListener('click', clickOutsideContent);
        return () => {
            window.removeEventListener('click', clickOutsideContent);
        };
    }, [props]);

    return <div ref={popupRef} className={`Popup ${props.show ? 'active' : ''}`}>
        <div className="Popup__content">
            {
                !props.hideCloseButton && <span onClick={() => props.setShow(false)} className="popup__close">
                    &times;
                </span>
            }
            {props.children}
        </div>
    </div>;
};

export default Popup;

export const PopupHeader = props => {
    return <div className="Popup__header">
        {props.children}
    </div>
}

export const PopupBody = props => {
    return <div className="popup__body">
        {props.children}
    </div>
}

export const PopupFooter = props => {
    return <div className="popup__footer">
        {props.children}
    </div>
}
