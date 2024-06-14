import event from "events";

const eventEmitter = new event.EventEmitter();

eventEmitter.on("add",(a,b)=>{
    console.log("Addition : "+(a+b));
});
eventEmitter.once("test",()=>{
    console.log("Test event caught");
})
eventEmitter.emit("add",20,10);
eventEmitter.emit("add",20,5);
eventEmitter.emit("test");
eventEmitter.emit("test");
eventEmitter.emit("test");