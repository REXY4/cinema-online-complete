export const idr = (num) =>{
    let j  = parseFloat(num).toLocaleString();
    return "Rp " + j.replace(/\,/g,'.');
}



