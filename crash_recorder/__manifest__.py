# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.

{
    "name": "Crash Recorder",
    "category": "Tools",
    "description": """
Automatically record user actions leading to errors.
""",
    "version": "1.0",
    "depends": ["web"],
    "data": [
        "views/rrweb_recording_views.xml",
        "views/crash_recorder_templates.xml",
        "security/ir.model.access.csv",
    ],
    "qweb": ["static/src/xml/rrweb_field.xml",],
}
