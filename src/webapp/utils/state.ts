import { useEffect, useState } from "react";

interface Delegate<Args extends unknown[]> {
    (...args : Args) : void;
    functions : Array<(...args : Args) => void>;
    add(func : (...args : Args) => void) : void;
    remove(func : (...args : Args) => void) : void;
    clear() : void;
    invoke(...args : Args) : void;
}

export default function createDelegate<Args extends unknown[]>() : Delegate<Args> {
    const instance = ((...args : Args) => { instance.invoke(...args); }) as Delegate<Args>;
    instance.functions = [];
    instance.add = (func : (...args : Args) => void) : void => {
        instance.functions.push(func);
    };
    instance.remove = (func : (...args : Args) => void) : void => {
        const i = instance.functions.indexOf(func);
        if (i < 0)
            return;
        instance.functions.splice(i, 1);
    };
    instance.clear = () : void => {
        instance.functions.splice(0, instance.functions.length);
    };
    instance.invoke = (...args : Args) : void => {
        for (const func of instance.functions)
            func(...args);
    };
    return instance;
}

class GlobalState<T> {
    public state : T;
    public onStateChange = createDelegate<[state: T]>();

    constructor(initialState : T) {
        this.state = initialState;
    }

    setState(value : T) : void {
        this.state = value;
        this.onStateChange.invoke(value);
    }
}

export function createGlobalState<T>(initialState : T) : GlobalState<T> {
    return new GlobalState(initialState);
}

export function useGlobalState<T>(globalState : GlobalState<T>) : [T, (value : T) => void] {
    const [state, setState] = useState(globalState.state);
    useEffect(() : () => void => {
        globalState.onStateChange.add(setState);
        return () : void => {
            globalState.onStateChange.remove(setState);
        };
    }, []);
    return [state, (value : T) : void => {
        globalState.setState(value);
    }];
}
