import Game from './app/modules/game/game.js';
import Controls from './app/components/controls/controls.js';
import  * as EVENTS  from './app/events/events.js';
import  * as CONSTANTS  from './app/constants/constants.js';

const app = (function () {
	let game = null;

	return {
		controls: null,
		init() {
			if (!this.controls) {
				this.controls = new Controls({});
			}

			(function (context) {
				document.getElementById(CONSTANTS.APP_INJECTION_ID).addEventListener(EVENTS.PLAY_EVENT, e => {
					context.play({
						width: context.controls.width,
						height: context.controls.height,
						rectDimension: context.controls.rectDimension,
						pattern: context.controls.pattern,
					});
				});
			})(this);

			return this;
		},

		play(props) {
			if (game) {
				game.exit();
			}
			game = new Game({
				id: 'fat_cat',
				rectStrokeWidth: 1,
				rectDimension: props && props.rectDimension || this.controls.rectDimension,
				width: props && props.width || this.controls.width,
				height: props && props.height || this.controls.height,
				pattern: props && props.pattern || this.controls.pattern,
			});
		},
	};
}());

app.init().play({});
