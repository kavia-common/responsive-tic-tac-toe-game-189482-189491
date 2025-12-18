#!/bin/bash
cd /home/kavia/workspace/code-generation/responsive-tic-tac-toe-game-189482-189491/frontend_app
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

