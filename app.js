import Game from './app/modules/game/game.js';

const app = (function () {
	let width = 10;
	let height = 10;
	let rectDimension = 50;
	let game = null;

	return {
		init() {
			document.getElementById('input_columns').addEventListener('change', function () {
				width = parseInt(this.value, 10);
				width = width < 10 ? 10 : width;
				width = width > 20 ? 20 : width;
			});

			document.getElementById('input_rows').addEventListener('change', function () {
				height = parseInt(this.value, 10);
				height = height < 10 ? 10 : height;
				height = height > 20 ? 20 : height;
			});

			document.getElementById('input_cell_width').addEventListener('change', function () {
				rectDimension = parseInt(this.value, 10);
				rectDimension = rectDimension < 20 ? 20 : rectDimension;
				rectDimension = rectDimension > 100 ? 100 : rectDimension;
			});

			const that = this;
			document.getElementById('play_game').addEventListener('click', () => {
				that.play({
					width: width,
					height: height,
					rectDimension: rectDimension,
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
			});
		},
	};
}());

app.init().play();
