/* @flow */

import { registerBridge } from './bridge';
import { registerEvent } from './event/event';

if ('addEventListener' in document) {
	document.addEventListener('DOMContentLoaded', function() {
        // tell native that page ready
        window.webkit && window.webkit.messageHandlers.finish_construct.postMessage(0);
        registerBridge();
        registerEvent();
	}, false);
}

