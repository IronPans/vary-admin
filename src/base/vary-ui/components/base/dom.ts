
export function addClass(el, classes) {
    const cs = classes.split(/\s+/g);
    if (el.classList) {
        for (const c of cs) {
            el.classList.add(c);
        }
    } else {
        for (const c of cs) {
            el.className += ' ' + c;
        }
    }
}

export function removeClass(el, classes) {
    const cs = classes.split(/\s+/g);
    if (el.classList) {
        for (const c of cs) {
            el.classList.remove(c);
        }
    } else {
        for (const c of cs) {
            el.className = cs.className.replace(new RegExp('\s+' + c), '');
        }
    }
}

export function hasClass(elem, className) {
    if (elem.classList) {
        return elem.classList.contains(className);
    } else {
        return new RegExp('(^| )' + className + '( |$)', 'gi').test(elem.className);
    }
}

export function insertBefore(parent, newDom, oldDom) {
    parent.insertBefore(newDom, oldDom);
}

export function insertAfter(parent, newDom, oldChild) {
    const nextDom = oldChild.nextElementSibling;
    if (nextDom) {
        parent.insertBefore(newDom, nextDom);
    } else {
        parent.appendChild(newDom);
    }
}

export function setTransform(element, animation) {
    element.style.webkitTransform = animation;
    element.style.mozTransform = animation;
    element.style.oTransform = animation;
    element.style.msTransform = animation;
    element.style.transform = animation;
}

export function setTransitionDuration(element, times) {
    element.style.webkitTransitionDuration = times + 'ms';
    element.style.mozTransitionDuration = times + 'ms';
    element.style.oTransitionDuration = times + 'ms';
    element.style.transitionDuration = times + 'ms';
}

export function isInsideHiddenElement(el) {
    let parentNode = el.parentNode;
    while(parentNode && parentNode !== document.body) {
        if (parentNode.style && parentNode.style.display === 'none') {
            return parentNode;
        }
        parentNode = parentNode.parentNode;
    }
    return false;
}

export function getHiddenElementClient(parent, elem, property) {
    if (parent.style.display !== 'none') {
        return parseFloat(elem[property]);
    }
    parent.style.display = 'block';
    parent.style.visibility = 'hidden';
    const p = elem[property];
    parent.style.display = 'none';
    parent.style.visibility = 'visible';
    return parseFloat(p);
}

export function getHiddenElementOuterHeight(elem) {
    if (elem.style.display !== 'none') {
        return {
            width: elem.offsetWidth,
            height: elem.offsetHeight
        }
    }
    elem.style.visibility = 'hidden';
    elem.style.display = 'block';
    const height = elem.offsetHeight;
    const width = elem.offsetWidth;
    elem.style.display = 'none';
    elem.style.visibility = 'visible';
    return {
        width: width,
        height: height
    };
}

export function getStyle(elem, attr) {
    return elem.currentStyle ? elem.currentStyle[attr] : getComputedStyle(elem, 'false')[attr];
}

export function getRect(elem) {
    return elem.getBoundingClientRect();
}

export function forEach(arr, callback) {
    if (arr) {
        if (Array.isArray(arr)) {
            arr.forEach((value, index, arrs) => {
                callback(value, index, arrs);
            })
        } else {
            for (let i = 0; i < arr.length; i++) {
                callback(arr[i], i, arr);
            }
        }
    }
}

export function css(elem, style) {
    for (const s in style) {
        if (style.hasOwnProperty(s)) {
            elem.style[s] = style[s];
        }
    }
}

export function getScrollbarWidth() {
    const div = document.createElement('div');
    addClass(div, 'va-iscroll');
    css(div, {
        width: '100%',
        height: '100%',
        opacity: 0,
        overflow: 'scroll'
    });
    document.body.appendChild(div);
    const scrollbarWidth = div.offsetWidth - div.clientWidth;
    document.body.removeChild(div);
    return scrollbarWidth;
}

export function clickOutside(elem, source, inside, outside) {
    let isIn = false;
    while (elem) {
        if (typeof source === 'string') {
            if (hasClass(elem, source)) {
                isIn = true;
                if (inside) {
                    inside(elem);
                }
            }
        } else if (elem === source) {
            isIn = true;
            if (inside) {
                inside(elem);
            }
        }
        elem = elem.parentNode;
    }
    if (!isIn && outside) {
        outside();
    }
    return isIn;
}

export function parents(elem) {
    const matched = [];

    while ( ( elem = elem[ 'parentNode' ] ) && elem.nodeType !== 9 ) {
        if ( elem.nodeType === 1 ) {
            matched.push( elem );
        }
    }
    return matched;
}

export function getScrollParent(node) {
    if (!node) {
        return document.documentElement;
    }

    const excludeStaticParent = node.style.position === 'absolute';
    const overflowRegex = /(scroll|auto)/;
    let parent = node;
    let isExited = false;

    while (parent) {
        if (!parent.parentNode) {
            return node.ownerDocument || document.documentElement;
        }

        const style = window.getComputedStyle(parent);
        const position = style.position;
        const overflow = style.overflow;
        const overflowX = style['overflow-x'];
        const overflowY = style['overflow-y'];

        if (position === 'static' && excludeStaticParent) {
            parent = parent.parentNode;
            continue;
        }

        if (overflowRegex.test(overflow) || overflowRegex.test(overflowX) || overflowRegex.test(overflowY)) {
            isExited = true;
            break;
        }

        parent = parent.parentNode;
    }

    if (isExited) {
        return parent;
    }

    return node.ownerDocument || node.documentElement || document.documentElement;
}

export default {addClass, removeClass, hasClass, clickOutside, parents, setTransform,
    setTransitionDuration, insertAfter, insertBefore, css, getScrollbarWidth, getScrollParent,
    getHiddenElementClient, getHiddenElementOuterHeight, getRect, getStyle, forEach};