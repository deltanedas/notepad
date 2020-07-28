/*
	Copyright (c) DeltaNedas 2020

	This program is free software: you can redistribute it and/or modify
	it under the terms of the GNU General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.

	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU General Public License for more details.

	You should have received a copy of the GNU General Public License
	along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

(() => {

const ui = require("ui-lib/library");

var notepad = null;

const build = () => {
	notepad = extendContent(FloatingDialog, "$nodepad", {
		save() {
			Core.settings.putSave("notepad-text", this._text);
		},

		setText(text) {this._text = text;},
		getText() {return this._text;}
	});
	notepad.text = Core.settings.get("notepad-text", "");
	this.global.notepad = notepad;

	const area = notepad.cont.addArea(notepad.text.replace(/\n/g, "\r"), cons(t => {
		notepad.text = t;
	})).grow().pad(20).get();
	ui.mobileAreaInput(area, t => {
		notepad.text = t;
	}, () => {
		return {
			title: "$notepad",
			text: notepad.text,
			// Max storable string, if you really need that
			maxLength: 65564
		};
	});

	notepad.addCloseButton();
	notepad.hidden(run(() => notepad.save()));
};

ui.addButton("notepad", "edit", () => notepad.show());
ui.addMenuButton("$notepad", "edit", () => notepad.show());

ui.onLoad(build);

})();
