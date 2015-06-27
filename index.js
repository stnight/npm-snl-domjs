var DOM = {
	textNodesArr: ["a", "p", "label", "span", "li", "div", "button", "textarea", "option", "h1", "h2", "h3", "h4", "h5", "h6"],
	registeredDOMarray: [],
	register: function (toReg) {
		Object.keys(toReg).forEach(function (key) {
			DOM.registeredDOMarray[key] = toReg[key];
		});
	},
	getElem: function (el) {
		return document.querySelectorAll(el);
	},
	makeElem: function (el) {
		return document.createElement(el);
	},
	delElem: function (el) {
		var element = this.getElem(el);
		[].map.call(element, function (el) {
			el.parentNode.removeChild(el);
		});
	},
	makeText: function (el) {
		return document.createTextNode(el);
	},
	giveAttributes: function (el, toMake, isTypeOfText) {
		// new
		if (typeof toMake.attributeList !== "undefined") {
			for (var attr in toMake.attributeList) {
				el.setAttribute(attr, toMake.attributeList[attr]);
			};
		};
		if (isTypeOfText && typeof toMake.textContent !== "undefined") {
			var textContent = this.makeText(toMake.textContent);
			el.appendChild(textContent);
		};
		// for function\
		if (typeof toMake.eventFunc !== "undefined") {
			for (eventName in toMake.eventFunc) {
				el.addEventListener(eventName, toMake.eventFunc[eventName]);
			}
		};
		return el;
	},
	iterateContent: function (parentEl, hasContents) {
		if (hasContents) {
			var results = [];
			for (var i = 0; i < parentEl.contentEl.length; i++) {
				var originalEntity = parentEl.contentEl[i],
					currentEl = DOM.makeElem(originalEntity.elType),
					isTypeOfText = (DOM.textNodesArr.indexOf(originalEntity.elType) >= 0) ? true : false,
					hasContents = (typeof originalEntity.contentEl !== "undefined") ? true : false;
				DOM.giveAttributes(currentEl, originalEntity, isTypeOfText);
				var contents = DOM.iterateContent(originalEntity, hasContents);
				if (contents !== false && contents.length > 0) {
					for (var ia = 0; ia < contents.length; ia++) {
						currentEl.appendChild(contents[ia]);
					};
				}
				results.push(currentEl);
			};
			// return all iterations
			return results;
		} else {
			return false;
		};
	},
	make: function (target, key) {
		var targets = this.getElem(target);
		[].map.call(targets, function (element) {
			var toMake = DOM.registeredDOMarray[key],
				el = DOM.makeElem(toMake.elType),
				isTypeOfText = (DOM.textNodesArr.indexOf(toMake.elType) >= 0) ? true : false,
				hasContents = (typeof toMake.contentEl !== "undefined") ? true : false;
			DOM.giveAttributes(el, toMake, isTypeOfText);
			var contents = DOM.iterateContent(toMake, hasContents);
			if (contents !== false && contents.length > 0) {
				for (var i = 0; i < contents.length; i++) {
					el.appendChild(contents[i]);
				};
			}
			element.appendChild(el);
		});
	}
}
// export the module
module.exports = DOM
