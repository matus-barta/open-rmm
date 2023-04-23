#!/bin/bash
if [ -f /var/run/reboot-required ]; then
    echo 'true'
else
    echo 'false'
fi