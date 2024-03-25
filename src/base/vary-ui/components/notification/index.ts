import Message from '../message';

let notificationInstance;

const getNotificationInstance = (props) => {
    if (notificationInstance) {
        return notificationInstance;
    }
    return Message.create({...props});
};

const prefixCls = 'va-notification';

export class Notification {
    constructor(props) {
        const position = props['position'] || 'top-right';
        props['className'] = `va-notification va-notification-${position}`;
        props['transitionName'] = props['transitionName'] || 'moveInRight';
        this.props = props;
        notificationInstance = getNotificationInstance({
            className: 'va-notification-group',
            onClose: props['onClose'] || (() => {
            })
        });
        this.create();
    }

    create() {
        const props = Object.assign({}, this.props);
        const {type, avatar, message, onClose, progress, title} = props;
        const avatarCom = avatar ? `<div class="${prefixCls}-avatar">${avatar}</div>` : '';
        const progressCom = progress ? `<div class="${prefixCls}-progress">
        <div class="${prefixCls}-progress-bar"/>
        </div>` : '';
        props['message'] = `
        <div class="${prefixCls}-item">
            ${avatarCom}
            <div class="${prefixCls}-item-content">
                <div class="${prefixCls}-title">${title}</div>
                <div class="${prefixCls}-message">${message}</div>
            </div>
            ${progressCom}
        </div>`;
        props['closable'] = true;
        props['onClose'] = () => {
            if (onClose) {
                onClose();
            }
        };
        return notificationInstance.create({...props});
    }
}

export default {
    show(props) {
        props['type'] = 'default';
        return new Notification({...props});
    },
    info(props) {
        props['type'] = 'info';
        props['avatar'] = '<i class="va-icon c-primary">error_outline</i>';
        return new Notification({...props});
    },
    success(props) {
        props['type'] = 'success';
        props['avatar'] = '<i class="va-icon c-success">check_circle_outline</i>';
        return new Notification({...props});
    },
    warning(props) {
        props['type'] = 'warning';
        props['avatar'] = '<i class="va-icon c-warning">error_outline</i>';
        return new Notification({...props});
    },
    error(props) {
        props['type'] = 'error';
        props['avatar'] = '<i class="va-icon c-danger">highlight_off</i>';
        return new Notification({...props});
    },
    close() {
        if (notificationInstance) {
            notificationInstance.clearAll();
            notificationInstance = null;
        }
    },
}
