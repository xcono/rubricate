interface String {
    hash(): any;
}

String.prototype.hash = () => {

    let i:number;
    let chr:string;
    let hash:any = 0;

    if (this.length === 0) return hash;

    for (i = 0; i < this.length; i++) {
        chr   = this.charCodeAt(i);
        hash  = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }

    return hash.toString();
};