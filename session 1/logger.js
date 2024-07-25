function log(mes) {
    console.log("this is message from logger => ", mes);
}
function log2(mes) {
    console.log("this is message 2 from logger => ", mes);
}

// module.exports = log;
module.exports = {
    log2,
    hamada : log
}


module.exports.hello = (name) => {
    console.log("hello ", name);
}

