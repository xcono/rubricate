import App from './App';

/**
 * User function to run rubricate app.
 * @returns {App}
 */
(<any>window).Rubricate = (el: HTMLElement, options: any = {}) => {

    if(!options.hasOwnProperty('defaultData') || !options.defaultData) {
        options.defaultData = {};
    }

    return new App(el, options);
};
