import Game from './app/modules/game/game.js';

const app = (function () {
	const maxWidth = 50;
	const maxHeight = 50;
	const maxDimension = 100;
	let width = 10;
	let height = 10;
	let rectDimension = 50;
	let pattern = null;
	let game = null;

	return {
		init() {
			document.addEventListener('DOMContentLoaded', () => {
				document.getElementById('input_columns').setAttribute('max', maxWidth);
				document.getElementById('input_rows').setAttribute('max', maxHeight);
				document.getElementById('input_cell_width').setAttribute('max', maxDimension);
			});

			document.getElementById('input_columns').addEventListener('change', function () {
				width = parseInt(this.value, 10);
				width = width < 10 ? 10 : width;
				width = width > maxWidth ? maxWidth : width;
			});

			document.getElementById('input_rows').addEventListener('change', function () {
				height = parseInt(this.value, 10);
				height = height < 10 ? 10 : height;
				height = height > maxHeight ? maxHeight : height;
			});

			document.getElementById('input_cell_width').addEventListener('change', function () {
				rectDimension = parseInt(this.value, 10);
				rectDimension = rectDimension < 20 ? 20 : rectDimension;
				rectDimension = rectDimension > maxDimension ? maxDimension : rectDimension;
			});

			document.getElementById('input_pattern').addEventListener('change', function () {
				pattern = this.value;
			});

			const that = this;
			document.getElementById('play_game').addEventListener('click', () => {
				that.play({
					width,
					height,
					rectDimension,
					pattern,
				});
			});
			return this;
		},

		play(props) {
			if (game) {
				game.exit();
			}
			game = new Game({
				id: 'fat_cat',
				rectStrokeWidth: 1,
				rectDimension: props && props.rectDimension || rectDimension,
				width: props && props.width || width,
				height: props && props.height || height,
				pattern: props && props.pattern,
			});
		},
	};
}());

app.init().play();
