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
odoo.define('crash_recorder.rrweb', function (require) {
    "use strict";

    var rpc = require("web.rpc");
    var CrashManager = require("web.CrashManager").CrashManager;

    CrashManager.include({
        init: function () {
            this._super.apply(this, arguments);
            this.rrwebBufferA = [];
            this.rrwebBufferB = [];
            this.rrwebWritingToBufferA = true;

            var self = this;
            rrweb.record({
                emit(event, isCheckout) {
                    if (isCheckout) {
                        if (self.rrwebWritingToBufferA) {
                            self.rrwebBufferB = [];
                        } else {
                            self.rrwebBufferA = [];
                        }

                        self.rrwebWritingToBufferA = !self.rrwebWritingToBufferA;
                    }

                    if (self.rrwebWritingToBufferA) {
                        self.rrwebBufferA.push(event);
                    } else {
                        self.rrwebBufferB.push(event);
                    }
                },
                checkoutEveryNms: 30 * 1000, // checkout every 30 seconds
            });
        },

        rrwebSaveEvents: function(traceback) {
            var toSave = [];

            if (self.rrwebWritingToBufferA) {
                toSave = this.rrwebBufferB.concat(this.rrwebBufferA);
            } else {
                toSave = this.rrwebBufferA.concat(this.rrwebBufferB);
            }

            rpc.query({
                model: "rrweb.recording",
                method: "create",
                args: [{events: JSON.stringify({toSave}), error: traceback}],
            });
        },

        /**
         * A delayed wrapper around rrwebSaveEvents to still capture
         * part of the error screen.
         */
        rrwebSaveEventsSoon: function(traceback) {
            setTimeout(() => this.rrwebSaveEvents(traceback), 3000);
        },

        // show_warning: function (error, options) {
        //     var res = this._super.apply(this, arguments);
        //     this.rrwebSaveEventsSoon();
        //     return res;
        // },

        show_error: function (error) {
            var res = this._super.apply(this, arguments);
            this.rrwebSaveEventsSoon(error.traceback);
            return res;
        },
    });
});
