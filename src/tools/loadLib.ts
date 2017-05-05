export default function loadLib(urls: Array<string>, callback: () => any) {

    let requestedCount = urls.length;
    let loadedCount = 0;

    for (let url of urls) {

        let hash = url.hash();

        if(!document.getElementById(hash)) {

            let el = <any>document.createElement('script');
            el.type = "text/javascript";
            el.id = hash;

            if (el.readyState) {  //IE
                el.onreadystatechange = () => {
                    if (el.readyState == "loaded" || el.readyState == "complete") {

                        el.onreadystatechange = null;

                        if (++loadedCount === requestedCount) {
                            callback();
                        }

                    }
                };
            } else {  //Others
                el.onload = () => {

                    if (++loadedCount === requestedCount) {
                        callback();
                    }
                };
            }

            el.src = url;
            document.getElementsByTagName("head")[0].appendChild(el);
        }
    }

}