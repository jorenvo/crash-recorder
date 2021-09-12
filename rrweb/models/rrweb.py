# coding: utf-8
from odoo import api, fields, models, SUPERUSER_ID, _
from base64 import b64encode, b64decode
import zlib


class RRWebRecording(models.Model):
    _name = "rrweb.recording"
    _description = "Recordings of user actions leading up to a crash"
    _rec_name = "create_date"
    _order = "create_date desc"

    events = fields.Binary(
        "Events", compute="_compute_events", inverse="_inverse_events", store=False
    )
    events_compressed = fields.Binary(
        "Compressed Events", help="Raw rrweb JSON events", attachment=True
    )
    error = fields.Text("Error", help="Error that occurred in this recording")

    @api.depends("events_compressed")
    def _compute_events(self):
        for recording in self:
            recording.events = b64encode(
                zlib.decompress(b64decode(recording.events_compressed))
            )

    def _inverse_events(self):
        """ A recording can be >3 MiB, so compress it. Compression ratio is ~10. """
        for recording in self:
            recording.events_compressed = b64encode(zlib.compress(recording.events))
