import  * as EVENTS  from '../../events/events.js';
import  * as CONSTANTS  from '../../constants/constants.js';
/**
 * App controls
 */
class Controls {
	constructor() {
		this.maxWidth = 50;
		this.maxHeight = 50;
		this.maxDimension = 100;
		this.width = 10;
		this.height = 10;
		this.rectDimension = 50;
		this.pattern = null;


		if (Controls.instance) {
			console.warn('Cant create another instance');
			return Controls.instance;
		}
		this.set();
		this.attachListeners();
		Controls.instance = this;
	}

	set() {
		document.getElementById('app').innerHTML = this.get();
	}

	get() {
		return `
			<h1> X BOXES </h1>
			<h3 id="score"> SCORE: </h3>
			<div class="app_controls">
				<div class="control_container app_controls_columns">
					<span>Columns: </span>
					<input id="input_columns" TYPE="NUMBER" MIN="10" MAX="50" STEP="1" VALUE="10" SIZE="10">
				</div>
				<div class="control_container app_controls_rows">
					<span>Rows: </span>
					<input id="input_rows" TYPE="NUMBER" MIN="10" MAX="50" STEP="1" VALUE="10" SIZE="10">
				</div>
				<div class="control_container app_controls_cell_width">
					<span>Cell width: </span>
					<input id="input_cell_width" TYPE="NUMBER" MIN="20" MAX="100" STEP="1" VALUE="50" SIZE="10">
				</div>
				<div class="control_container app_controls_patterns">
					<span>Pattern: </span>
					<select id="input_pattern">
						<option value="PATTERN_1">Small</option>
						<option value="PATTERN_2" selected>Medium</option>
						<option value="PATTERN_3">Big</option>
					</select>
				</div>
			</div>
			<div class="play_controls">
				<button id="play_game" style="clear: both; display: inline-block"> NEW GAME </button>
			</div>`;
	}

	attachListeners() {
		(function(context) {
			document.addEventListener('DOMContentLoaded', () => {
				document.getElementById('input_columns').setAttribute('max', context.maxWidth);
				document.getElementById('input_rows').setAttribute('max', context.maxHeight);
				document.getElementById('input_cell_width').setAttribute('max', context.maxDimension);
			});

			document.getElementById('input_columns').addEventListener('change', function () {
				context.width = parseInt(this.value, 10);
				context.width = context.width < 10 ? 10 : context.width;
				context.width = context.width > context.maxWidth ? context.maxWidth : context.width;
			});

			document.getElementById('input_rows').addEventListener('change', function () {
				context.height = parseInt(this.value, 10);
				context.height = context.height < 10 ? 10 : context.height;
				context.height = context.height > context.maxHeight ? context.maxHeight : context.height;
			});

			document.getElementById('input_cell_width').addEventListener('change', function () {
				context.rectDimension = parseInt(this.value, 10);
				context.rectDimension = context.rectDimension < 20 ? 20 : context.rectDimension;
				context.rectDimension = context.rectDimension > context.maxDimension ? context.maxDimension : context.rectDimension;
			});

			document.getElementById('input_pattern').addEventListener('change', function () {
				context.pattern = this.value;
			});

			document.getElementById('play_game').addEventListener('click', () => {
				document.getElementById(CONSTANTS.APP_INJECTION_ID).dispatchEvent(new CustomEvent(EVENTS.PLAY_EVENT, { payload: { } }))
			});
		})(this);
	}
}

Controls.instance = null;

export default Controls;