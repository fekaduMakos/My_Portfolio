@echo off
title Fekadu Markos Portfolio
echo Starting Portfolio Development Server...
cd /d "c:\wamp64\www\portfolio"
start http://localhost:3000
npm run dev
pause
