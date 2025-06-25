import { Symbol } from "../enums/symbol";


export class Cell {
    private _symbol: Symbol;

    constructor() {
        this._symbol = Symbol.EMPTY;
    }

    isEmpty(): boolean {
        return this._symbol === Symbol.EMPTY;
    }

    setSymbol(symbol: Symbol): void {
        if (!this.isEmpty()) throw new Error('Cell is already occupied');
        this._symbol = symbol;
    }
    getSymbol(): Symbol {
        return this._symbol;
    }
}