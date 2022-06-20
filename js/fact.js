function fact(n) {
    if (n < 1) return 1;
    return n * fact(n - 1); 
}

function add (x, y) {
    return x + y;
}

function sub (x, y) {
    return x - y;
} 

module.exports = {fact, add, sub}
