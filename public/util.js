var util = {
    localURL : window.location.origin,
    sendAjax : function(method, url, data, func, type) {
        
        var xhr = new XMLHttpRequest();
        xhr.open(method, this.localURL + url);
        if(type !== undefined) {
            // 타입이 많아지면 switch-case문으로 전환 고려.
            xhr.setRequestHeader("Content-Type", type);
        }

        if(data !== undefined) {
            data = JSON.stringify(data);
            xhr.send(data);
        } else {
            xhr.send();
        }

        xhr.addEventListener("load", func);
    }
}