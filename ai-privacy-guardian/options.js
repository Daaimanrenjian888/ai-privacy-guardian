{\rtf1\ansi\ansicpg936\cocoartf2870
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 function renderLogs(logs) \{\
    const container = document.getElementById('logContainer');\
    if (!logs.length) \{\
        container.innerHTML = '<p>\uc0\u26242 \u26080 \u35760 \u24405 </p>';\
        return;\
    \}\
    let html = `\
        <table class="log-table">\
            <tr>\
                <th>\uc0\u26102 \u38388 </th>\
                <th>\uc0\u31449 \u28857 </th>\
                <th>\uc0\u25805 \u20316 </th>\
                <th>\uc0\u25509 \u21475 /\u38190 </th>\
                <th>\uc0\u25968 \u25454 \u25688 \u35201 </th>\
                <th>\uc0\u29992 \u25143 \u36873 \u25321 </th>\
                <th>\uc0\u26159 \u21542 \u25318 \u25130 </th>\
            </tr>\
    `;\
    logs.forEach(log => \{\
        html += `\
            <tr>\
                <td>$\{log.time\}</td>\
                <td>$\{log.site\}</td>\
                <td>$\{log.action\}</td>\
                <td>$\{log.url\}</td>\
                <td class="data-sample">$\{log.dataSample\}</td>\
                <td>$\{log.userChoice\}</td>\
                <td>$\{log.blocked ? '\uc0\u26159 ' : '\u21542 '\}</td>\
            </tr>\
        `;\
    \});\
    html += '</table>';\
    container.innerHTML = html;\
\}\
\
function loadLogs() \{\
    chrome.storage.local.get(\{ logs: [] \}, (result) => \{\
        renderLogs(result.logs);\
    \});\
\}\
\
document.getElementById('clearLogs').addEventListener('click', () => \{\
    chrome.storage.local.set(\{ logs: [] \}, () => \{\
        loadLogs();\
    \});\
\});\
\
loadLogs();}