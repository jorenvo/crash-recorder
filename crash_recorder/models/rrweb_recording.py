# coding: utf-8
from odoo import api, fields, models, SUPERUSER_ID, _
from base64 import b64encode, b64decode
import logging
import zlib

_logger = logging.getLogger(__name__)


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

    @api.autovacuum
    def _gc_recordings(self):
        """ Avoid bloating the database with lots of recordings. """
        limit_date = fields.Datetime.subtract(fields.Datetime.now(), days=30)
        to_unlink = self.search([("create_date", "<", limit_date)])
        _logger.info(
            "Deleting %s crash recordings older than %s", len(to_unlink), limit_date
        )
        to_unlink.unlink()
