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
