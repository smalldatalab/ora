#!/bin/bash

ember build && ssh smalldata "rm -rf /var/www/pulse/*" && scp -r dist/* smalldata:/var/www/pulse
