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
                checkoutEveryNms: 60 * 1000, // checkout every minute
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