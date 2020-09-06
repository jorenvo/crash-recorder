# coding: utf-8
from odoo import api, fields, models, SUPERUSER_ID, _
from base64 import b64encode

class RRWebRecording(models.Model):
    _name = "rrweb.recording"
    _description = "Recordings of user actions leading up to a crash"

    events = fields.Binary("Events", help="Raw rrweb json events", attachment=True)

    @api.model
    def save(self, vals):
        """This is a wrapper around create so we can base64 encode the sent
        events string. window.btoa isn't used client-side because it
        doesn't support UTF-8.
        """
        vals["events"] = b64encode(vals["events"].encode())
        return self.create(vals)
