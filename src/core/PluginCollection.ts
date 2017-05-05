import {PluginType, AppFormValue, UploadedFile} from './includes/interfaces';

export default class PluginCollection {

    private items: any;
    public length: number = 0;

    constructor() {
        this.items = {};
    }

    add(plugin: PluginType): void {
        this.items[plugin.guid] = plugin;
        this.length += 1;
    }

    get(guid: string) {
        return this.contains(guid) ? this.items[guid] : false;
    }

    remove(guid: string): void {
        if(this.contains(guid)) {
            delete(this.items[guid]);
        }
    }

    /**
     * Check if plugin type exist.
     * @param guid string
     * @returns {boolean}
     */
    contains(guid: string) {
        return this.items.hasOwnProperty(guid);
    }

    /**
     * Implementation of iterator.
     * @returns {{next: (()=>{value: any, done: boolean})}}
     */
    [Symbol.iterator]() {

        let _items = this.items;
        let keys = Object.keys(_items);
        let index = -1;

        return {
            next: () => ({ value: _items[keys[++index]], done: keys.length <= index })
        };
    }

    serialize() {

        let values = <AppFormValue|any>[];

        for(let plugin of this) {

            let value = {
                guid: plugin.guid,
                type: plugin.constructor.type,
                values: plugin.getValues(),
                uploads: <UploadedFile|any>[],
                removed: plugin._removed || false,
                order: parseInt(plugin._el.getAttribute('data-order'))
            };

            if(plugin.getUploads) {
                for(let attachment of plugin.getUploads()) {
                    value.uploads.push(attachment);
                }
            }

            values.push(value);
        }

        values.sort((a:AppFormValue|any, b:AppFormValue|any) => {
            return a.order - b.order;
        });

        return values;
    }
}