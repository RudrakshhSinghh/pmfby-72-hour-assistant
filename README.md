\# PMFBY Saathi — 72-Hour Crop Damage Reporting Assistant



An offline-first prototype designed to help farmers report crop damage within the 72-hour PMFBY reporting window.



\## Problem



Crop damage reports can be affected by procedural issues such as missing the reporting window or difficulties submitting information in areas with poor connectivity.



The idea behind PMFBY Saathi is to make the reporting process proactive:



\- Start a 72-hour countdown immediately after damage is reported

\- Capture damage evidence through a photo

\- Capture the farmer's GPS location

\- Allow the report workflow to continue while offline

\- Synchronize the report when connectivity is restored



\## Current Prototype



This version focuses on the core farmer-side reporting workflow.



\### Features



\- Crop damage reporting

\- 72-hour countdown timer

\- Damage photo upload and preview

\- GPS location capture

\- Online/offline mode simulation

\- Report ID generation

\- Pending/submitted report states

\- Simulated report synchronization



\## Demo Flow



1\. Click \*\*Report Crop Damage\*\*

2\. The 72-hour countdown starts

3\. Capture the current location

4\. Upload a crop damage photograph

5\. Switch to simulated offline mode

6\. Restore the network

7\. Submit the pending report

8\. The prototype shows the report as submitted



\## Tech Stack



\- React

\- Vite

\- JavaScript

\- Browser Geolocation API

\- Browser File Upload API

\- Git \& GitHub



\## Project Structure



```text

pmfby-72-hour-assistant/

└── frontend/

&#x20;   ├── src/

&#x20;   │   ├── App.jsx

&#x20;   │   ├── App.css

&#x20;   │   ├── index.css

&#x20;   │   └── main.jsx

&#x20;   ├── public/

&#x20;   ├── package.json

&#x20;   └── vite.config.js

