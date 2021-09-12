// Copyright (c) 2021, Joren Van Onder <joren@jvo.sh>
//
// This file is part of crash-recorder.
//
// crash-recorder is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// crash-recorder is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with crash-recorder.  If not, see <https://www.gnu.org/licenses/>.
odoo.define('crash_recorder.rrweb_field', function (require) {
    var core = require('web.core');
    var basic_fields = require('web.basic_fields');
    var registry = require('web.field_registry');

    var _lt = core._lt;

    var RRWebPlayer = basic_fields.FieldBinaryFile.extend({
        description: _lt("rrweb recording player"),
        supportedFieldTypes: ['binary'],
        template: 'FieldRRWeb',
        events: {}, // TODO

        /**
         * @override
         */
        init: function () {
            this._super.apply(this, arguments);
            console.log("Hi from rrweb field!");
        },

        /**
         * @override
         */
        _render: function () {
            // debugger;
            console.log('rendering rrweb');
            setTimeout(() => { // TODO
                fetch(`/web/content/rrweb.recording/${this.recordData.id}/events`)
                    .then((response) => response.json())
                    .then((events) => {
                        new rrwebPlayer({
                            target: this.$el[0],
                            data: {
                                events: events.toSave,
                                autoPlay: true
                            }
                        });
                    });
            }, 2000);
            // this.$el.empty().append($("<span/>").addClass('fa fa-download'));
        }
    });

    registry.add('rrweb_player', RRWebPlayer);
});
