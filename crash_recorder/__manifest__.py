# coding: utf-8
# Copyright (c) 2021, Joren Van Onder <joren@jvo.sh>
# 
# This file is part of crash-recorder.
# 
# crash-recorder is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
# 
# crash-recorder is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
# 
# You should have received a copy of the GNU General Public License
# along with crash-recorder.  If not, see <https://www.gnu.org/licenses/>.
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
    "qweb": ["static/src/xml/rrweb_field.xml"],
    "license": "LGPL-3",
}
