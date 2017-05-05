import * as plugins from './plugins'

window.addEventListener('rubricate__app_created', (e:CustomEvent) => {
    for(let type of Object.keys(plugins)) {
        e.detail.app.types.add((<any>plugins)[type]);
    }
});