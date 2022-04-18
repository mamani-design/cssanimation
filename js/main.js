document.addEventListener('DOMContentLoaded', function(){
	
	
	const addClass = function(el, isIntersecting) {
		if(isIntersecting) {
			el.classList.add('show');
		}
	}
	
	const so = new ScrollObserver('.scroll-target', addClass);
	
});


class ScrollObserver {
	constructor(els, cb, options) {
		this.els = document.querySelectorAll(els);
		this.cb = cb;
		this.defaultOptions = {
			root: null,
			rootMargin: '0px',
			threshold: .3
		};
		this.options = Object.assign(this.defaultOptions, options);
		this._init();
	}
	
	_init() {
	const callback = function(entries, observer) {
		entries.forEach(entry => {
			if(entry.isIntersecting){
				this.cb(entry.target, true);//bind(this)に当たる部分
				observer.unobserve(entry.target);
			}
		})
	}
	
	this.io = new IntersectionObserver(callback.bind(this), this.options);
	this.els.forEach(el => this.io.observe(el));
	}
}


