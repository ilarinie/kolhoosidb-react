#!/bin/bash
chmod 700 ~/.ssh/
chmod 600 ~/.ssh/id_rsa
rm ~/.ssh/known_hosts

ssh -o "UserKnownHostsFile=/dev/null" -o "StrictHostKeyChecking=no" -t $USER@$IP<<EOF
    $DEPLOY_INTEGRATION
EOF