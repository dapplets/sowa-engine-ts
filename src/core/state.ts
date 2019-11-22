type TypedValue = [any, string]

// It stores incoming JSON data and statuses of transaction execution (?)
export class State {
    // May be here is setters which call _scheduleNextRun when it changes
    // KeyValue or Hashmap<key, any, parentKey>
    // txBuilder.status.something

    private _map = new Map<string, TypedValue>();
    private _updateHandlers: (() => void)[] = [];

    constructor(variablesTemplate?: { [variable: string]: string }, values?: any[]) {
        if (!variablesTemplate && !values) return
        if (!variablesTemplate || !values) throw "Variables template and Values are required together."

        const variables = Object.keys(variablesTemplate)
        const types = Object.values(variablesTemplate)
        
        if (variables.length !== values.length) throw "The number of variables and values must be equal."
        
        for (let i = 0; i < variables.length; i++) {
            const variable = variables[i],
                  type = types[i],
                  value = values[i]
        
            if (!this._getValidator(type)(value)) throw `Invalid type of ${variable}. Expected '${type}' type.`
            
            this._map.set(variable, [value, type])
        }
    }

    private _getValidator(type: string): (value: any) => boolean {
        // RFC 8610: Concise Data Definition Language (CDDL)
        switch (type) {
            case "int": return (v) => typeof v === "number"
            case "bstr":
            case "bytes": return (v) => { throw "TODO!" }
            case "tstr": 
            case "text": return (v) => typeof v === "string"
            case "bool": return (v) => typeof v === "boolean"
            default: return (v) => { throw "Incompatible CBOR type." }
        }
    }

    public get(key: string): TypedValue | undefined {
        //ToDo: Resolve aliases authomatically
        return this._map.get(key);
    }

    public set(key: string, value: any, type: string) {
        this._map.set(key, [value, type]);
        this._updateHandlers.forEach(callback => callback())
    }

    public onUpdate(callback: () => void) {
        this._updateHandlers.push(callback);
    }
}