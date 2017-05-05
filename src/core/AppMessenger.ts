import {streamMessageElement, streamMessageLineElement} from './includes/render'

export default class AppMessenger {

    private el: HTMLElement;
    private lines: HTMLElement[] = [];

    static INFO: string = 'info';
    static WARNING: string = 'warning';
    static ERROR: string = 'error';

    constructor(appElement: HTMLElement) {
        this.el = streamMessageElement(appElement);
    }

    private push(text: string, type: string = AppMessenger.INFO, delaySeconds: number = 5) {

        let line = streamMessageLineElement(text, type);
        let key = this.lines.push(line);
        this.el.appendChild(line);

        setTimeout(() => {
            line.parentNode.removeChild(line);
            delete this.lines[key];
        }, delaySeconds * 1000);
    }

    info(text: string, delaySeconds: number = 5) {
        this.push(text, AppMessenger.INFO, delaySeconds);
    }

    warning(text: string, delaySeconds: number = 5) {
        this.push(text, AppMessenger.WARNING, delaySeconds)
    }

    error(text: string, delaySeconds: number = 5) {
        this.push(text, AppMessenger.ERROR, delaySeconds)
    }
}