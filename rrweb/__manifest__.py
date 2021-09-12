# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.

{
    "name": "Record errors",
    "category": "Hidden",  # todo
    "description": """
Automatically record user actions leading to errors.
""",
    "version": "1.0",
    "depends": ["web"],
    "data": [
        "views/rrweb_views.xml",
        "views/rrweb_templates.xml",
        "security/ir.model.access.csv",
    ],
    "qweb": ["static/src/xml/rrweb_field.xml",],
}
