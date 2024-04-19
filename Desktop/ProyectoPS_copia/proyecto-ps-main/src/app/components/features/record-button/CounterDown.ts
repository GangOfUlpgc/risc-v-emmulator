import { NextObserver, Subscribable, Unsubscribable } from "rxjs";

export class CounterDown implements Subscribable<any>, Unsubscribable{
    private seconds: number;
    private intervalId: NodeJS.Timeout | null;
    observers: NextObserver<any>[];

    constructor() {
        this.observers = []
        this.intervalId = null;
    }
    
    subscribe(observer: NextObserver<any>): Unsubscribable {
        this.observers.push(observer)
        return this
    }

    unsubscribe(): void {
        console.log("unsuscribed")
    }

    start(count: number) {
        if (count == 0) return
        this.seconds = count
        this.intervalId = setInterval(() => {
            this.seconds--;
            this.notify();
            if(this.seconds==0) this.stop()
        }, 1000);
    }

    stop() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }

    reboot() {
        this.seconds = 0;
    }

    notify(){
        this.observers.forEach((observer) =>{
            observer.next(this.seconds)
        })
    }
}