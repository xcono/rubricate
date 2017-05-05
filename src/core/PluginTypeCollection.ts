import {PluginType} from './includes/interfaces';

export default class PluginTypeCollection {

    private items: any;
    public length: number = 0;

    constructor() {
        this.items = {};
    }

    add(pluginType: PluginType): void {
        this.items[pluginType.type] = pluginType;
        this.length += 1;
    }

    get(key:string) {

        if(this.contains(key)) {
            return this.items[key];
        }

        return false;
    }

    /**
     * Check if plugin type exist.
     * @param pluginType
     * @returns {boolean}
     */
    contains(pluginType: string) {
        return this.items.hasOwnProperty(pluginType);
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

    asArray() {

        let items = [];

        for(let item of this) {
            items.push(item);
        }

        return items;
    }
}