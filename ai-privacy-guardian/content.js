{\rtf1\ansi\ansicpg936\cocoartf2870
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 // content.js\
(function () \{\
    if (window.__aiPrivacyGuardInjected) return;\
    window.__aiPrivacyGuardInjected = true;\
\
    const originalFetch = window.fetch;\
    const originalXHROpen = XMLHttpRequest.prototype.open;\
    const originalXHRSend = XMLHttpRequest.prototype.send;\
    const originalGetItem = Storage.prototype.getItem;\
    const originalSetItem = Storage.prototype.setItem;\
\
    // ---------- \uc0\u25935 \u24863 \u35268 \u21017  ----------\
    function isSensitiveUrl(url) \{\
        const lower = String(url).toLowerCase();\
        const isApi = lower.includes('/api/') ||\
                      lower.includes('/backend-api/') ||\
                      lower.includes('/api/v') ||\
                      lower.includes('/chat/') ||\
                      lower.includes('/conversation') ||\
                      lower.includes('/history') ||\
                      lower.includes('/messages') ||\
                      lower.includes('/threads') ||\
                      lower.includes('/completion');\
        const hasSensitiveKeyword = lower.includes('conversation') ||\
                                    lower.includes('history') ||\
                                    lower.includes('messages') ||\
                                    lower.includes('thread') ||\
                                    lower.includes('session') ||\
                                    lower.includes('completion');\
        return isApi && hasSensitiveKeyword;\
    \}\
\
    function isSensitiveData(data) \{\
        if (!data) return false;\
        if (typeof data === 'string') \{\
            const lower = data.toLowerCase();\
            return lower.includes('messages') ||\
                   lower.includes('conversation_id') ||\
                   lower.includes('conversation') ||\
                   lower.includes('history') ||\
                   lower.includes('content') ||\
                   lower.includes('role');\
        \}\
        if (typeof data === 'object') \{\
            try \{\
                const str = JSON.stringify(data).toLowerCase();\
                return str.includes('messages') ||\
                       str.includes('conversation_id') ||\
                       str.includes('conversation') ||\
                       str.includes('history') ||\
                       str.includes('content') ||\
                       str.includes('role');\
            \} catch (e) \{\
                return false;\
            \}\
        \}\
        return false;\
    \}\
\
    function isSensitiveRequest(url, options, body) \{\
        const method = (options && options.method ? options.method.toUpperCase() : 'GET');\
        if (isSensitiveUrl(url)) return true;\
        if (method === 'POST' && isSensitiveData(body)) return true;\
        return false;\
    \}\
\
    // ---------- \uc0\u27169 \u24577 \u26694  ----------\
    function createModal(info) \{\
        return new Promise((resolve) => \{\
            const host = document.createElement('div');\
            host.style.position = 'fixed';\
            host.style.top = '0';\
            host.style.left = '0';\
            host.style.width = '100%';\
            host.style.height = '100%';\
            host.style.zIndex = '2147483647';\
            host.style.pointerEvents = 'auto';\
            document.documentElement.appendChild(host);\
\
            const shadow = host.attachShadow(\{ mode: 'open' \});\
            const style = document.createElement('style');\
            style.textContent = `\
                .overlay \{\
                    position: fixed;\
                    top: 0;\
                    left: 0;\
                    width: 100%;\
                    height: 100%;\
                    background: rgba(0,0,0,0.6);\
                    display: flex;\
                    justify-content: center;\
                    align-items: center;\
                    z-index: 2147483647;\
                \}\
                .modal \{\
                    background: white;\
                    padding: 20px;\
                    border-radius: 12px;\
                    max-width: 650px;\
                    width: 90%;\
                    box-shadow: 0 0 30px rgba(0,0,0,0.4);\
                    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;\
                    color: #333;\
                \}\
                .title \{\
                    font-size: 20px;\
                    font-weight: bold;\
                    margin-bottom: 12px;\
                \}\
                .info \{\
                    margin-bottom: 10px;\
                    font-size: 14px;\
                \}\
                .data-sample \{\
                    background: #f5f5f5;\
                    padding: 10px;\
                    border-radius: 6px;\
                    max-height: 200px;\
                    overflow-y: auto;\
                    font-size: 12px;\
                    word-break: break-all;\
                    white-space: pre-wrap;\
                \}\
                .buttons \{\
                    text-align: right;\
                    margin-top: 20px;\
                \}\
                button \{\
                    margin-left: 10px;\
                    padding: 8px 20px;\
                    border: none;\
                    border-radius: 6px;\
                    cursor: pointer;\
                    font-size: 14px;\
                    font-weight: 500;\
                \}\
                .allow \{\
                    background: #1890ff;\
                    color: white;\
                \}\
                .allow:hover \{ background: #40a9ff; \}\
                .deny \{\
                    background: #ff4d4f;\
                    color: white;\
                \}\
                .deny:hover \{ background: #ff7875; \}\
            `;\
\
            const overlay = document.createElement('div');\
            overlay.className = 'overlay';\
            overlay.innerHTML = `\
                <div class="modal">\
                    <div class="title">\uc0\u9888 \u65039  \u25968 \u25454 \u35775 \u38382 \u25552 \u37266 </div>\
                    <div class="info"><b>\uc0\u31449 \u28857 \u65306 </b>$\{info.site\}</div>\
                    <div class="info"><b>\uc0\u25805 \u20316 \u65306 </b>$\{info.action\}</div>\
                    <div class="info"><b>\uc0\u25509 \u21475 \u65306 </b>$\{info.url\}</div>\
                    <div class="info"><b>\uc0\u25968 \u25454 \u25688 \u35201 \u65306 </b></div>\
                    <div class="data-sample">$\{info.dataSample\}</div>\
                    <div class="buttons">\
                        <button class="allow" id="allowBtn">\uc0\u20801 \u35768 </button>\
                        <button class="deny" id="denyBtn">\uc0\u25298 \u32477 </button>\
                    </div>\
                </div>\
            `;\
            shadow.appendChild(style);\
            shadow.appendChild(overlay);\
\
            function cleanup(result) \{\
                host.remove();\
                resolve(result);\
            \}\
            shadow.getElementById('allowBtn').addEventListener('click', () => cleanup(true));\
            shadow.getElementById('denyBtn').addEventListener('click', () => cleanup(false));\
        \});\
    \}\
\
    // ---------- \uc0\u35760 \u24405 \u26085 \u24535  ----------\
    function logAction(site, action, url, dataSample, userChoice, blocked) \{\
        const entry = \{\
            time: new Date().toISOString(),\
            site,\
            action,\
            url,\
            dataSample: dataSample ? dataSample.substring(0, 500) : '',\
            userChoice: userChoice ? '\uc0\u20801 \u35768 ' : '\u25298 \u32477 ',\
            blocked\
        \};\
        chrome.storage.local.get(\{ logs: [] \}, (result) => \{\
            const logs = result.logs;\
            logs.unshift(entry);\
            if (logs.length > 200) logs.length = 200;\
            chrome.storage.local.set(\{ logs \});\
        \});\
    \}\
\
    // ---------- \uc0\u25318 \u25130  fetch ----------\
    window.fetch = function (...args) \{\
        const url = typeof args[0] === 'string' ? args[0] : (args[0]?.url || '');\
        const options = args[1] || \{\};\
        const body = options.body;\
\
        if (isSensitiveRequest(url, options, body)) \{\
            return new Promise(async (resolve, reject) => \{\
                const site = location.hostname;\
                const action = options.method ? options.method.toUpperCase() : 'GET';\
                const dataSample = typeof body === 'string' ? body : JSON.stringify(body);\
                const allowed = await createModal(\{\
                    site,\
                    action,\
                    url,\
                    dataSample: dataSample || '\uc0\u26080 \u35831 \u27714 \u20307 '\
                \});\
\
                if (allowed) \{\
                    try \{\
                        const response = await originalFetch.apply(this, args);\
                        logAction(site, action, url, dataSample, true, false);\
                        resolve(response);\
                    \} catch (e) \{\
                        logAction(site, action, url, dataSample, true, true);\
                        reject(e);\
                    \}\
                \} else \{\
                    logAction(site, action, url, dataSample, false, true);\
                    const mockResponse = new Response(\
                        JSON.stringify(\{ error: '\uc0\u29992 \u25143 \u31105 \u27490 \u35835 \u21462 \u35813 \u25968 \u25454 ' \}),\
                        \{\
                            status: 403,\
                            statusText: 'Forbidden',\
                            headers: \{ 'Content-Type': 'application/json' \}\
                        \}\
                    );\
                    resolve(mockResponse);\
                \}\
            \});\
        \}\
\
        return originalFetch.apply(this, args);\
    \};\
\
    // ---------- \uc0\u25318 \u25130  XMLHttpRequest\u65288 \u23454 \u39564 \u24615 \u65289  ----------\
    XMLHttpRequest.prototype.open = function (method, url, ...rest) \{\
        this.__aiPrivacyGuard = \{ method, url \};\
        return originalXHROpen.call(this, method, url, ...rest);\
    \};\
\
    XMLHttpRequest.prototype.send = function (body) \{\
        const xhr = this;\
        const info = xhr.__aiPrivacyGuard;\
        if (info && isSensitiveRequest(info.url, \{ method: info.method \}, body)) \{\
            const site = location.hostname;\
            const action = info.method;\
            const dataSample = typeof body === 'string' ? body : JSON.stringify(body);\
            createModal(\{\
                site,\
                action,\
                url: info.url,\
                dataSample: dataSample || '\uc0\u26080 \u35831 \u27714 \u20307 '\
            \}).then(allowed => \{\
                if (allowed) \{\
                    logAction(site, action, info.url, dataSample, true, false);\
                    originalXHRSend.call(xhr, body);\
                \} else \{\
                    logAction(site, action, info.url, dataSample, false, true);\
                    xhr.abort();\
                \}\
            \});\
            return;\
        \}\
        return originalXHRSend.call(xhr, body);\
    \};\
\
    // ---------- \uc0\u30417 \u27979  localStorage \u35775 \u38382 \u65288 \u20165 \u35760 \u24405 \u65289  ----------\
    Storage.prototype.getItem = function (key) \{\
        if (typeof key === 'string' &&\
            (key.toLowerCase().includes('chat') ||\
             key.toLowerCase().includes('conversation') ||\
             key.toLowerCase().includes('history'))) \{\
            const site = location.hostname;\
            const dataSample = `localStorage.getItem('$\{key\}')`;\
            logAction(site, 'localStorage\uc0\u35835 \u21462 ', `localStorage:$\{key\}`, dataSample, '\u30417 \u27979 ', false);\
        \}\
        return originalGetItem.call(this, key);\
    \};\
\
    Storage.prototype.setItem = function (key, value) \{\
        if (typeof key === 'string' &&\
            (key.toLowerCase().includes('chat') ||\
             key.toLowerCase().includes('conversation') ||\
             key.toLowerCase().includes('history'))) \{\
            const site = location.hostname;\
            const dataSample = `localStorage.setItem('$\{key\}',$\{String(value).substring(0, 200)\})`;\
            logAction(site, 'localStorage\uc0\u20889 \u20837 ', `localStorage:$\{key\}`, dataSample, '\u30417 \u27979 ', false);\
        \}\
        return originalSetItem.call(this, key, value);\
    \};\
\})();}